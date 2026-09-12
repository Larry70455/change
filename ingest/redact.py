"""
Scrub identifiers out of parsed messages and replace people with role labels.

Two passes:
  1. Pattern scrub  -- phone numbers, emails, URLs, street addresses, card and
     account numbers wherever they appear in message *text*. Stripping metadata
     is not enough; numbers get typed into message bodies constantly.
  2. Name substitution -- every contact name from the archive is replaced with
     the role you assigned it, including inside other people's message text, so
     "tell Sarah I'm late" does not leak a name the alias was hiding.

On first run this writes data/private/roles.json with one row per contact and
stops. Fill in the `role` fields, then run again.

    python3 ingest/redact.py            # pass 1: emit roles.json
    <edit data/private/roles.json>
    python3 ingest/redact.py            # pass 2: write redacted.jsonl

Read the limits in docs/what-redaction-cannot-do.md before treating the output
as anonymous. It is not.
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRIV = os.path.join(HERE, "data", "private")
SRC = os.path.join(PRIV, "messages.jsonl")
ROLES = os.path.join(PRIV, "roles.json")
OUT = os.path.join(PRIV, "redacted.jsonl")

# Ordered: card and SSN shapes must match before the generic phone pattern
# gets a chance to eat part of them.
PATTERNS = [
    ("[card]", re.compile(r"\b(?:\d[ -]*?){13,16}\b")),
    ("[ssn]", re.compile(r"\b\d{3}-\d{2}-\d{4}\b")),
    ("[email]", re.compile(r"\b[\w.+-]+@[\w-]+\.[\w.]{2,}\b")),
    ("[link]", re.compile(r"https?://\S+|\bwww\.\S+", re.I)),
    ("[phone]", re.compile(
        r"(?<!\w)(?:\+?1[ .-]?)?(?:\(\d{3}\)|\d{3})[ .-]?\d{3}[ .-]?\d{4}(?!\w)")),
    ("[address]", re.compile(
        r"\b\d{1,6}\s+(?:[NSEW]\.?\s+)?(?:[A-Z][\w'-]*\s+){0,3}"
        r"(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Ln|Lane|Dr|Drive|Ct|Court|"
        r"Cir|Circle|Way|Pl|Place|Pkwy|Parkway|Ter|Terrace|Hwy|Highway)\b\.?"
        r"(?:\s+(?:Apt|Unit|Ste|Suite|#)\s*[\w-]+|\s+[a-z0-9]{1,3}\b)?", re.I)),
    ("[zip]", re.compile(r"\b\d{5}-\d{4}\b")),
]


def scrub(text):
    """Returns (clean_text, {tag: hits}). Order matters; see PATTERNS."""
    if not text:
        return text, {}
    hits = {}
    for tag, rx in PATTERNS:
        text, n = rx.subn(tag, text)
        if n:
            hits[tag] = hits.get(tag, 0) + n
    return text, hits


def name_variants(name):
    """'Sarah M. Clarke' -> the full string, 'Sarah', 'Clarke'. Longest first."""
    out = {name}
    parts = [p.strip(".,") for p in name.split() if len(p.strip(".,")) > 2]
    out.update(parts)
    return sorted(out, key=len, reverse=True)


def build_name_map(roles):
    """Compile one regex per known name variant -> its role label."""
    subs = []
    for alias, rec in roles.items():
        role = rec.get("role") or alias
        nm = rec.get("name")
        if not nm or nm in ("-", "null", "(Unknown)"):
            continue
        for variant in name_variants(nm):
            subs.append((re.compile(r"\b" + re.escape(variant) + r"\b", re.I), role))
    # Longest patterns first so full names win over bare first names.
    subs.sort(key=lambda s: -len(s[0].pattern))
    return subs


# Words that start sentences or are ordinary nouns -- not evidence of a name.
COMMON = set("""
a an and are as at be but by can did do for from get go had has have he her him his
how i if in is it its me my no not of on or our out she so that the their them then
there they this to too was we were what when where who will with you your yes ok okay
monday tuesday wednesday thursday friday saturday sunday january february march april
may june july august september october november december im ill ive id dont cant wont
thats hes shes theyre youre well just like know think going come back now today
tomorrow yesterday please thanks thank sorry love call text home work school
""".split())

NAMEISH = re.compile(r"\b[A-Z][a-z]{2,}\b")


def residual_names(text, known_roles):
    """Capitalized words the substitution pass did not account for.

    These are candidates, not certainties -- a place name and a person's name
    look identical here. The point is to hand back a review list rather than
    let a missed surname ride into a published file unnoticed.
    """
    if not text:
        return []
    role_words = set()
    for role in known_roles:
        role_words.update(w.lower().strip("'\u2019s") for w in role.split())
    out = []
    for m in NAMEISH.finditer(text):
        w = m.group()
        if w.lower() in COMMON or w.lower() in role_words:
            continue
        out.append(w)
    return out


def bootstrap_roles():
    contacts_path = os.path.join(PRIV, "contacts.json")
    if not os.path.exists(contacts_path):
        sys.exit("no contacts.json -- run sms_ingest.py first")

    with open(contacts_path, encoding="utf-8") as fh:
        contacts = json.load(fh)

    roles = {}
    for _num, rec in contacts.items():
        roles[rec["alias"]] = {
            "name": rec.get("name"),
            "sent": rec.get("sent", 0),
            "received": rec.get("received", 0),
            "first": rec.get("first"),
            "last": rec.get("last"),
            "role": "",
            "include": False,
        }

    with open(ROLES, "w", encoding="utf-8") as fh:
        json.dump(roles, fh, indent=2)

    print(f"wrote {ROLES} -- {len(roles)} contacts\n")
    print("Fill in for each contact you want in the narrative:")
    print('  "role":    what they are called in the text, e.g. "the kids\' mother",')
    print('             "my brother", "my attorney". This replaces the name everywhere.')
    print('  "include": true to carry their messages through; false drops them entirely.')
    print("\nEverything stays excluded until you set include -- default is off.")
    print("Then re-run: python3 ingest/redact.py")


def main():
    if not os.path.exists(SRC):
        sys.exit("no messages.jsonl -- run sms_ingest.py first")

    if not os.path.exists(ROLES):
        bootstrap_roles()
        return

    with open(ROLES, encoding="utf-8") as fh:
        roles = json.load(fh)

    included = {a for a, r in roles.items() if r.get("include")}
    if not included:
        sys.exit(f"nothing marked include:true in {ROLES} -- nothing to redact")

    name_subs = build_name_map(roles)

    kept = dropped = 0
    tally = {}
    residual = {}
    role_labels = [r.get("role") or a for a, r in roles.items() if r.get("include")]
    with open(SRC, encoding="utf-8") as src, open(OUT, "w", encoding="utf-8") as out:
        for line in src:
            msg = json.loads(line)
            if msg["alias"] not in included:
                dropped += 1
                continue

            text, hits = scrub(msg.get("text"))
            if text:
                for rx, role in name_subs:
                    text = rx.sub(role, text)
            for tag, n in hits.items():
                tally[tag] = tally.get(tag, 0) + n

            leftovers = residual_names(text, role_labels)
            for w in leftovers:
                residual[w] = residual.get(w, 0) + 1

            role = roles[msg["alias"]].get("role") or msg["alias"]
            out.write(json.dumps({
                "id": msg["id"],
                "when": msg["when"],
                "direction": msg["direction"],
                "who": "me" if msg["direction"] == "sent" else role,
                "with": role,
                "text": text,
                "scrubbed": hits or None,
                "review": leftovers or None,
            }, ensure_ascii=False) + "\n")
            kept += 1

    print(f"{kept:,} messages kept, {dropped:,} dropped (contact not marked include)")
    if tally:
        print("scrubbed from message text: " +
              ", ".join(f"{n} {tag}" for tag, n in sorted(tally.items())))
    else:
        print("no identifier patterns found in the kept text")
    print(f"-> {OUT}")

    if residual:
        ranked = sorted(residual.items(), key=lambda kv: -kv[1])
        print(f"\n{len(ranked)} capitalized words survived and need your eyes.")
        print("Place names and proper nouns look identical to surnames here:")
        for word, n in ranked[:30]:
            print(f"  {n:>5}x  {word}")
        if len(ranked) > 30:
            print(f"  ... and {len(ranked) - 30} more")
        print("\nAdd any that are people to roles.json as their own entry, or edit")
        print("the text by hand. Re-run to confirm they are gone.")

    print("\nThis output is pseudonymous, not anonymous. "
          "See docs/what-redaction-cannot-do.md")


if __name__ == "__main__":
    main()
