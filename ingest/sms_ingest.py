"""
Stream an SMS Backup & Restore XML archive into a local, queryable form.

Built for multi-gigabyte files. Uses iterparse and clears each element as it
goes, so memory stays flat whether the archive is 20 MB or 20 GB. Most of the
bulk in these files is base64-encoded MMS image data -- that is dropped on
sight and never enters the output.

Nothing here is publishable as-is. Every message except your own outgoing text
is someone else's words. Output lands in data/private/ (gitignored); use
ingest/select.py to pull specific messages forward for publication.

Usage:
    python3 ingest/sms_ingest.py sms.xml                 # parse + report
    python3 ingest/sms_ingest.py sms.xml --scan          # count only, no write
"""

import argparse
import hashlib
import json
import os
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from xml.etree import ElementTree as ET

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRIV = os.path.join(HERE, "data", "private")

# SMS Backup & Restore type codes.
SMS_IN, SMS_OUT = "1", "2"
MMS_IN, MMS_OUT = "1", "2"

# PDU address roles inside <addrs>. On a sent MMS the `address` attribute is the
# recipient, not you -- these codes are the only reliable way to tell who is who.
ADDR_FROM, ADDR_TO, ADDR_CC = "137", "151", "130"

# Anything at or above this is an inline attachment blob, not a message.
BLOB_ATTRS = ("data", "_data")


def norm_number(raw):
    """+1 (405) 555-0134 and 4055550134 are the same person. Make them one key."""
    if not raw:
        return "unknown"
    digits = re.sub(r"\D", "", raw)
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    return digits or "unknown"


def pseudonym(number, salt):
    """Stable per-archive alias. The mapping stays local and is never committed."""
    if number == "unknown":
        return "unknown"
    h = hashlib.sha256((salt + number).encode()).hexdigest()
    return "p" + h[:8]


def to_iso(ms):
    try:
        return datetime.fromtimestamp(int(ms) / 1000, timezone.utc).isoformat()
    except (TypeError, ValueError, OSError, OverflowError):
        return None


def mms_text(elem):
    """MMS bodies hide in <part ct="text/plain" text="...">; the rest is image data."""
    chunks = []
    for part in elem.iter("part"):
        if part.get("ct") == "text/plain":
            txt = part.get("text")
            if txt and txt != "null":
                chunks.append(txt)
    return "\n".join(chunks) if chunks else None


def mms_parties(elem, outgoing):
    """Resolve (counterparty, self) for an MMS from its <addr> roles.

    Sent:     FROM is you, TO is the counterparty.
    Received: FROM is the counterparty, TO is you.
    Group threads list several TOs; the first stable one keys the thread.
    Falls back to the `address` attribute, which may be a ~-separated list.
    """
    senders, recipients = [], []
    for a in elem.iter("addr"):
        num = norm_number(a.get("address"))
        if num == "unknown":
            continue
        role = a.get("type")
        if role == ADDR_FROM:
            senders.append(num)
        elif role in (ADDR_TO, ADDR_CC):
            recipients.append(num)

    if outgoing:
        counterparty = recipients[0] if recipients else None
        me = senders[0] if senders else None
    else:
        counterparty = senders[0] if senders else None
        me = recipients[0] if recipients else None

    if counterparty is None:
        raw = (elem.get("address") or "").split("~")
        picks = [norm_number(r) for r in raw if norm_number(r) != "unknown"]
        counterparty = picks[0] if picks else "unknown"

    return counterparty, me


def parse(path, salt, scan_only=False):
    stats = {
        "sms": 0, "mms": 0, "sent": 0, "received": 0,
        "attachments": 0, "bytes_skipped": 0, "undated": 0,
    }
    per_contact = defaultdict(lambda: {"sent": 0, "received": 0, "first": None, "last": None})
    per_month = Counter()
    messages = []

    out_path = os.path.join(PRIV, "messages.jsonl")
    if not scan_only:
        os.makedirs(PRIV, exist_ok=True)
    sink = open(out_path, "w", encoding="utf-8") if not scan_only else None

    # Self numbers are learned as we go: the address on a sent MMS is us.
    own_numbers = set()

    try:
        for _event, elem in ET.iterparse(path, events=("end",)):
            tag = elem.tag
            if tag not in ("sms", "mms"):
                # Tally and discard attachment blobs without ever holding them.
                if tag == "part":
                    for attr in BLOB_ATTRS:
                        blob = elem.get(attr)
                        if blob:
                            stats["attachments"] += 1
                            stats["bytes_skipped"] += len(blob)
                            break
                    elem.clear()
                continue

            if tag == "sms":
                kind = "sms"
                direction = "sent" if elem.get("type") == SMS_OUT else "received"
                counterparty = norm_number(elem.get("address"))
                body = elem.get("body")
                if body == "null":
                    body = None
                when = to_iso(elem.get("date"))
                contact_name = elem.get("contact_name")
            else:
                kind = "mms"
                box = elem.get("msg_box")
                direction = "sent" if box == MMS_OUT else "received"
                counterparty, me = mms_parties(elem, direction == "sent")
                if me:
                    own_numbers.add(me)
                body = mms_text(elem)
                when = to_iso(elem.get("date"))
                contact_name = elem.get("contact_name")

            stats[kind] += 1
            stats[direction] += 1
            if not when:
                stats["undated"] += 1

            if contact_name in ("(Unknown)", "null"):
                contact_name = None

            alias = pseudonym(counterparty, salt)
            rec = per_contact[counterparty]
            rec[direction] += 1
            rec["name"] = rec.get("name") or contact_name
            rec["alias"] = alias
            if when:
                if rec["first"] is None or when < rec["first"]:
                    rec["first"] = when
                if rec["last"] is None or when > rec["last"]:
                    rec["last"] = when
                per_month[when[:7]] += 1

            if sink:
                messages.append(1)
                sink.write(json.dumps({
                    "id": len(messages),
                    "kind": kind,
                    "when": when,
                    "direction": direction,
                    "contact": counterparty,
                    "alias": alias,
                    "name": contact_name,
                    "text": body,
                    "chars": len(body) if body else 0,
                }, ensure_ascii=False) + "\n")

            elem.clear()
    except ET.ParseError as exc:
        print(f"\n! XML parse error at/near message {stats['sms'] + stats['mms']}: {exc}",
              file=sys.stderr)
        print("! partial results below; the archive may be truncated", file=sys.stderr)
    finally:
        if sink:
            sink.close()

    return stats, per_contact, per_month, out_path


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("xml", help="SMS Backup & Restore .xml archive")
    ap.add_argument("--scan", action="store_true", help="count only, write nothing")
    ap.add_argument("--top", type=int, default=25, help="contacts to show (default 25)")
    args = ap.parse_args()

    if not os.path.exists(args.xml):
        sys.exit(f"no such file: {args.xml}")

    size = os.path.getsize(args.xml)
    print(f"streaming {args.xml} ({size / 1e9:.2f} GB)\n")

    # Salt is per-archive and lives only in the private folder.
    salt_path = os.path.join(PRIV, ".salt")
    os.makedirs(PRIV, exist_ok=True)
    if os.path.exists(salt_path):
        salt = open(salt_path).read().strip()
    else:
        salt = hashlib.sha256(os.urandom(32)).hexdigest()[:32]
        with open(salt_path, "w") as fh:
            fh.write(salt)

    stats, per_contact, per_month, out_path = parse(args.xml, salt, args.scan)

    total = stats["sms"] + stats["mms"]
    print(f"{total:,} messages  ({stats['sms']:,} SMS, {stats['mms']:,} MMS)")
    print(f"{stats['sent']:,} sent, {stats['received']:,} received")
    print(f"{stats['attachments']:,} attachments skipped "
          f"({stats['bytes_skipped'] / 1e9:.2f} GB of base64 never loaded)")
    print(f"{len(per_contact):,} distinct numbers")
    if stats["undated"]:
        print(f"{stats['undated']:,} undated")

    if per_month:
        months = sorted(per_month)
        print(f"span {months[0]} .. {months[-1]}")

    print(f"\ntop {args.top} by volume:")
    ranked = sorted(per_contact.items(),
                    key=lambda kv: -(kv[1]["sent"] + kv[1]["received"]))
    print(f"  {'alias':<11}{'name':<22}{'sent':>8}{'recv':>8}  span")
    for _num, rec in ranked[:args.top]:
        span = ""
        if rec["first"] and rec["last"]:
            span = f"{rec['first'][:7]}..{rec['last'][:7]}"
        print(f"  {rec['alias']:<11}{(rec.get('name') or '-')[:20]:<22}"
              f"{rec['sent']:>8,}{rec['received']:>8,}  {span}")

    if not args.scan:
        # The number->alias map is the re-identification key. Local only.
        map_path = os.path.join(PRIV, "contacts.json")
        with open(map_path, "w", encoding="utf-8") as fh:
            json.dump({num: rec for num, rec in ranked}, fh, indent=2)
        print(f"\nmessages -> {out_path}")
        print(f"contact map -> {map_path}  (re-identification key; never commit)")
        print(f"\n{stats['received']:,} of these are other people's words. "
              f"Nothing is publishable until it goes through ingest/select.py.")


if __name__ == "__main__":
    main()
