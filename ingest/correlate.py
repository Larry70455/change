"""
Join redacted messages against the Maps timeline into one narrative stream.

This is the cross-reference step: for any day, what was said and where you
were, side by side. Correlation is by calendar day -- Maps reviews carry a
timestamp but describe a visit of unknown length, so anything finer would be
inventing precision the source data does not have.

    python3 ingest/correlate.py                  # full stream
    python3 ingest/correlate.py --from 2019-01   # window it
    python3 ingest/correlate.py --gaps           # months with messages, no location
    python3 ingest/correlate.py -o data/private/narrative.json

Output is a chronology, not a story. What it is good for is catching the places
where your memory and the record disagree -- those are the parts worth writing
carefully, and the parts an opposing filing will go at first.
"""

import argparse
import json
import os
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRIV = os.path.join(HERE, "data", "private")
MSGS = os.path.join(PRIV, "redacted.jsonl")
EVENTS = os.path.join(PRIV, "events.json")


def load_messages():
    if not os.path.exists(MSGS):
        return []
    out = []
    with open(MSGS, encoding="utf-8") as fh:
        for line in fh:
            m = json.loads(line)
            if m.get("when"):
                out.append(m)
    return out


def load_places():
    if not os.path.exists(EVENTS):
        return []
    with open(EVENTS, encoding="utf-8") as fh:
        blob = json.load(fh)
    # Anchors and commute rows have no date and cannot be placed on a timeline.
    return [e for e in blob.get("events", []) if e.get("when")]


def pad(bound, end):
    """A YYYY-MM bound must cover the whole month, not stop at its first day."""
    if not bound:
        return None
    return (bound + "-31") if (end and len(bound) == 7) else bound


def build(messages, places, lo=None, hi=None):
    lo, hi = pad(lo, False), pad(hi, True)
    days = defaultdict(lambda: {"messages": [], "places": []})

    for m in messages:
        days[m["when"][:10]]["messages"].append(m)
    for p in places:
        days[p["when"][:10]]["places"].append(p)

    out = []
    for day in sorted(days):
        if lo and day < lo:
            continue
        if hi and day > hi:
            continue
        rec = days[day]
        msgs = sorted(rec["messages"], key=lambda m: m["when"])
        counterparties = sorted({m["with"] for m in msgs})
        out.append({
            "date": day,
            "message_count": len(msgs),
            "with": counterparties,
            "places": [
                {"name": p.get("title"), "address": p.get("address"), "kind": p["kind"]}
                for p in rec["places"]
            ],
            "messages": [
                {"t": m["when"][11:16], "who": m["who"], "text": m.get("text")}
                for m in msgs
            ],
        })
    return out


def render(days, verbose=False):
    for d in days:
        head = d["date"]
        if d["message_count"]:
            head += f"  ·  {d['message_count']} msg with {', '.join(d['with'])}"
        print(f"\n{head}")
        for p in d["places"]:
            loc = p["name"] or "?"
            if p["address"]:
                loc += f" — {p['address']}"
            print(f"    [{p['kind']}] {loc}")
        if verbose:
            for m in d["messages"]:
                text = (m["text"] or "").replace("\n", " ")
                print(f"    {m['t']} {m['who']}: {text[:110]}")


def report_gaps(days):
    """Months carrying messages but no location fix, and the reverse."""
    months = defaultdict(lambda: {"msg": 0, "place": 0})
    for d in days:
        mo = d["date"][:7]
        months[mo]["msg"] += d["message_count"]
        months[mo]["place"] += len(d["places"])

    print(f"{'month':<10}{'messages':>10}{'places':>9}   coverage")
    for mo in sorted(months):
        r = months[mo]
        if r["msg"] and not r["place"]:
            note = "messages only — no location record"
        elif r["place"] and not r["msg"]:
            note = "location only — no messages"
        else:
            note = "both"
        print(f"{mo:<10}{r['msg']:>10}{r['place']:>9}   {note}")


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--from", dest="lo", help="earliest date, YYYY-MM or YYYY-MM-DD")
    ap.add_argument("--to", dest="hi", help="latest date, YYYY-MM or YYYY-MM-DD")
    ap.add_argument("--gaps", action="store_true", help="coverage by month")
    ap.add_argument("--verbose", "-v", action="store_true", help="print message text")
    ap.add_argument("-o", "--out", help="also write JSON here")
    args = ap.parse_args()

    messages, places = load_messages(), load_places()
    if not messages and not places:
        sys.exit("nothing to correlate -- run sms_ingest.py + redact.py, "
                 "and takeout_ingest.py")

    days = build(messages, places, args.lo, args.hi)

    print(f"{len(messages):,} messages, {len(places):,} dated places, "
          f"{len(days):,} days on the timeline")
    if not messages:
        print("(no messages yet -- this is the Maps record alone)")

    if args.gaps:
        print()
        report_gaps(days)
    else:
        render(days, args.verbose)

    if args.out:
        with open(args.out, "w", encoding="utf-8") as fh:
            json.dump({"days": days}, fh, indent=2)
        print(f"\n-> {args.out}")


if __name__ == "__main__":
    main()
