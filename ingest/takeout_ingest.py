"""
Normalize a Google Takeout export into a single chronological event stream.

Everything it emits stays local. Nothing here uploads, publishes, or posts.

Currently implemented: Maps (reviews, labeled places, commute routes,
traffic reports, Q&A). Gmail / Drive / Chat / Location History parsers are
stubbed at the bottom -- they activate as soon as those folders appear in an
export, so re-running this on a fuller Takeout picks them up with no changes.

Usage:
    python3 ingest/takeout_ingest.py <path-to-Takeout-dir> -o data/private/events.json
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone

# ---------------------------------------------------------------- utilities


def _iso(ts):
    """Coerce assorted Takeout timestamp spellings into a sortable ISO date."""
    if ts is None:
        return None
    if isinstance(ts, (int, float)) or (isinstance(ts, str) and ts.isdigit()):
        n = int(ts)
        # Takeout mixes seconds, millis and micros depending on the product.
        if n > 1e14:
            n //= 1_000_000
        elif n > 1e11:
            n //= 1000
        try:
            return datetime.fromtimestamp(n, timezone.utc).isoformat()
        except (ValueError, OSError, OverflowError):
            return None
    return str(ts)


def _load(path):
    try:
        with open(path, encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"  ! skipped {os.path.basename(path)}: {exc}", file=sys.stderr)
        return None


def _event(kind, when, title, **extra):
    ev = {"kind": kind, "when": when, "title": title}
    ev.update({k: v for k, v in extra.items() if v not in (None, "", [], {})})
    return ev


# ------------------------------------------------------------------- Maps


def parse_reviews(root):
    """Reviews are the richest Maps signal: a dated, geocoded, first-person trace."""
    events = []
    for sub in ("Maps (your places)", "Maps"):
        path = os.path.join(root, sub, "Reviews.json")
        if not os.path.exists(path):
            continue
        blob = _load(path)
        if not blob:
            continue
        for feat in blob.get("features", []):
            props = feat.get("properties", {}) or {}
            loc = props.get("location") or {}
            coords = (feat.get("geometry") or {}).get("coordinates") or []
            events.append(
                _event(
                    "review",
                    _iso(props.get("date")),
                    loc.get("name") or "(place no longer listed)",
                    address=loc.get("address"),
                    lat=coords[1] if len(coords) == 2 else None,
                    lon=coords[0] if len(coords) == 2 else None,
                    stars=props.get("five_star_rating_published"),
                    text=props.get("review_text_published") or props.get("Comment"),
                    source="Maps/Reviews.json",
                )
            )
    return events


def parse_labeled_places(root):
    """Home/Work labels -- anchors for the map, and the most sensitive rows here."""
    path = os.path.join(root, "Maps", "My labeled places", "Labeled places.json")
    blob = _load(path) if os.path.exists(path) else None
    if not blob:
        return []
    out = []
    for feat in blob.get("features", []):
        props = feat.get("properties", {}) or {}
        coords = (feat.get("geometry") or {}).get("coordinates") or []
        out.append(
            _event(
                "anchor",
                None,
                props.get("name") or "Labeled place",
                address=props.get("address"),
                lat=coords[1] if len(coords) == 2 else None,
                lon=coords[0] if len(coords) == 2 else None,
                sensitive=True,
                source="Maps/My labeled places",
            )
        )
    return out


def parse_commute(root):
    path = os.path.join(root, "Maps", "Commute routes")
    if not os.path.isdir(path):
        return []
    out = []
    for name in sorted(os.listdir(path)):
        blob = _load(os.path.join(path, name))
        if not blob:
            continue
        for trip in blob.get("trips", []):
            for visit in trip.get("place_visit", []):
                ll = ((visit.get("place") or {}).get("lat_lng")) or {}
                if not ll:
                    continue
                out.append(
                    _event(
                        "commute",
                        None,
                        trip.get("id") or "route",
                        lat=ll.get("latitude"),
                        lon=ll.get("longitude"),
                        sensitive=True,
                        source="Maps/Commute routes",
                    )
                )
    return out


def parse_traffic(root):
    """Dated only by filename, but they place him on a road at a known minute."""
    path = os.path.join(root, "Maps", "Traffic incident reports and votes")
    if not os.path.isdir(path):
        return []
    out = []
    for name in sorted(os.listdir(path)):
        blob = _load(os.path.join(path, name))
        if not blob:
            continue
        stem = os.path.splitext(name)[0]
        out.append(
            _event(
                "traffic",
                _iso(stem) if stem.isdigit() else None,
                f"{blob.get('contributionType', '?')} / {blob.get('disruptionType', '?')}",
                source="Maps/Traffic incident reports",
            )
        )
    return out


def parse_suggested_edits(root):
    path = os.path.join(root, "Maps", "Suggested edits to business establishments")
    if not os.path.isdir(path):
        return []
    out = []
    for name in sorted(os.listdir(path)):
        blob = _load(os.path.join(path, name))
        if not blob:
            continue
        stem = os.path.splitext(name)[0]
        out.append(
            _event(
                "map_edit",
                _iso(stem) if stem.isdigit() else None,
                json.dumps(blob)[:120],
                source="Maps/Suggested edits",
            )
        )
    return out


# ----------------------------------------- parsers that wait for a fuller export


def parse_mail(root):
    """Gmail ships as a single .mbox. Third-party voices live here -- see docs/."""
    mbox = None
    for base, _dirs, files in os.walk(os.path.join(root, "Mail")):
        for fn in files:
            if fn.endswith(".mbox"):
                mbox = os.path.join(base, fn)
                break
    if not mbox:
        return []

    import mailbox
    from email.utils import parsedate_to_datetime

    out = []
    for msg in mailbox.mbox(mbox):
        try:
            when = parsedate_to_datetime(msg.get("Date")).isoformat()
        except (TypeError, ValueError):
            when = None
        out.append(
            _event(
                "email",
                when,
                msg.get("Subject") or "(no subject)",
                sender=msg.get("From"),
                to=msg.get("To"),
                third_party=True,
                sensitive=True,
                source="Mail",
            )
        )
    return out


def parse_location_history(root):
    """Timeline export. Note: Google moved this on-device -- see docs/getting-the-rest.md."""
    out = []
    for folder in ("Location History", "Location History (Timeline)", "Semantic Location History"):
        base = os.path.join(root, folder)
        if not os.path.isdir(base):
            continue
        for dirpath, _dirs, files in os.walk(base):
            for fn in files:
                if not fn.endswith(".json"):
                    continue
                blob = _load(os.path.join(dirpath, fn))
                if not isinstance(blob, dict):
                    continue
                for obj in blob.get("timelineObjects", []):
                    visit = obj.get("placeVisit")
                    if not visit:
                        continue
                    loc = visit.get("location", {})
                    dur = visit.get("duration", {})
                    out.append(
                        _event(
                            "visit",
                            _iso(dur.get("startTimestampMs") or dur.get("startTimestamp")),
                            loc.get("name") or loc.get("address") or "(unnamed place)",
                            address=loc.get("address"),
                            lat=(loc.get("latitudeE7") or 0) / 1e7 or None,
                            lon=(loc.get("longitudeE7") or 0) / 1e7 or None,
                            sensitive=True,
                            source=folder,
                        )
                    )
    return out


PARSERS = (
    parse_reviews,
    parse_labeled_places,
    parse_commute,
    parse_traffic,
    parse_suggested_edits,
    parse_mail,
    parse_location_history,
)


def build(root):
    events = []
    for fn in PARSERS:
        found = fn(root)
        if found:
            print(f"  {fn.__name__:28s} {len(found):5d}")
        events.extend(found)
    # Undated events sort to the end rather than crashing the comparison.
    events.sort(key=lambda e: (e["when"] is None, e["when"] or ""))
    return events


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("takeout", help="path to the extracted Takeout directory")
    ap.add_argument("-o", "--out", default="data/private/events.json")
    args = ap.parse_args()

    if not os.path.isdir(args.takeout):
        sys.exit(f"not a directory: {args.takeout}")

    print(f"reading {args.takeout}")
    events = build(args.takeout)

    dated = [e for e in events if e["when"]]
    summary = {
        "generated": datetime.now(timezone.utc).isoformat(),
        "source": os.path.abspath(args.takeout),
        "count": len(events),
        "first": dated[0]["when"] if dated else None,
        "last": dated[-1]["when"] if dated else None,
        "sensitive": sum(1 for e in events if e.get("sensitive")),
        "third_party": sum(1 for e in events if e.get("third_party")),
    }

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump({"summary": summary, "events": events}, fh, indent=2)

    print(f"\n{summary['count']} events -> {args.out}")
    if dated:
        print(f"span {summary['first'][:10]} .. {summary['last'][:10]}")
    print(f"{summary['sensitive']} flagged sensitive, {summary['third_party']} contain other people's words")


if __name__ == "__main__":
    main()
