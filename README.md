# change

Working repo for an account built out of a personal data export.

Right now it is an **ingest layer and a private timeline viewer**. It is not a
website and nothing in it is published.

## Layout

```
ingest/takeout_ingest.py   Takeout -> normalized event stream
ingest/sms_ingest.py       multi-GB SMS Backup & Restore XML -> messages (streaming)
ingest/redact.py           strip identifiers, swap names for role labels
ingest/correlate.py        join messages + places into one day-by-day chronology
ingest/build_viewer.py     event stream -> a local, self-contained HTML timeline
docs/getting-the-rest.md   what the Takeout export is missing, and how to get it
docs/what-redaction-cannot-do.md   read before treating output as anonymous
data/private/              all generated output — gitignored, never committed
```

## Run

```
# locations
python3 ingest/takeout_ingest.py path/to/Takeout -o data/private/events.json

# messages — handles multi-GB files; base64 attachments are never loaded
python3 ingest/sms_ingest.py sms.xml

# assign roles, then scrub
python3 ingest/redact.py                 # writes roles.json, then stops
$EDITOR data/private/roles.json          # set role + include for each contact
python3 ingest/redact.py                 # writes redacted.jsonl

# cross-reference
python3 ingest/correlate.py --gaps
python3 ingest/correlate.py --from 2019-01 --to 2019-06 -v

# local timeline
python3 ingest/build_viewer.py && open data/private/timeline.html
```

No dependencies, no network calls, no server. Measured: 3.2 GB archive parsed in
37s, with all 3.2 GB of inline attachment data discarded unread.

## The raw archive never gets committed

A 2 GB SMS export cannot go in git anyway — GitHub rejects any file over 100 MB,
and Git LFS free tier is 1 GB. But the reason not to is that the raw file is
thousands of other people's private messages, and git history is permanent.

Raw archives are **input**. They stay on your disk. What gets committed is what
survives `redact.py` and your own review of it — nothing reaches a public repo
by default, because `include` defaults to false for every contact.

## What the current export holds

76 events, 2016–2026. Fifty Google Maps reviews are the substance; the rest is
labeled places, commute endpoints, traffic taps and listing edits. There is no
mail, no texts, no documents and no location history in it — see
`docs/getting-the-rest.md`.

## Before any of this becomes public

Three things are unresolved, and they are design questions, not details:

1. **Other people's words.** A message archive is mostly other people writing to
   you privately. In a custody matter that means the children's mother and
   probably the children. `redact.py` is the real step, but removing phone
   numbers is not anonymization — see `docs/what-redaction-cannot-do.md`.

2. **A narrative frame is not a legal shield.** Calling a first-person account a
   "story" does not make it inadmissible. A self-authored confession is ordinarily
   an admission by a party opponent, and the fiction label is not what decides that.
   If the goal is to avoid legal exposure, the person to ask is a family-law
   attorney in your state, before publishing, not after.

3. **The children are findable.** A fundraiser naming a custody case, tied to a
   home address in a town of this size, is permanently searchable by their
   classmates and by them.

None of that argues against writing the account. It argues for deciding who it is
for before it goes anywhere.
