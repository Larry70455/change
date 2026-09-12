# change

Working repo for an account built out of a personal data export.

Right now it is an **ingest layer and a private timeline viewer**. It is not a
website and nothing in it is published.

## Layout

```
ingest/takeout_ingest.py   Takeout -> one normalized event stream
ingest/build_viewer.py     event stream -> a local, self-contained HTML timeline
docs/getting-the-rest.md   what the current export is missing, and how to get it
data/private/              generated output — gitignored, never committed
```

## Run

```
python3 ingest/takeout_ingest.py path/to/Takeout -o data/private/events.json
python3 ingest/build_viewer.py
open data/private/timeline.html
```

No dependencies, no network calls, no server.

## What the current export holds

76 events, 2016–2026. Fifty Google Maps reviews are the substance; the rest is
labeled places, commute endpoints, traffic taps and listing edits. There is no
mail, no texts, no documents and no location history in it — see
`docs/getting-the-rest.md`.

## Before any of this becomes public

Three things are unresolved, and they are design questions, not details:

1. **Other people's words.** A mail export is mostly other people writing to you.
   In a custody matter that means the children's mother and probably the children.
   They cannot consent and did not choose to be published. Any public build needs
   a redaction pass that is a real step, not an intention.

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
