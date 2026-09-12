# The export you sent is Maps-only

You described "text emails, docs, gps." None of those are in this archive.
Here is what the 216K zip actually contained:

| Folder | Files | What it is |
|---|---|---|
| `Maps (your places)/Reviews.json` | 1 | **50 reviews, 2016-09-25 → 2025-04-24** — the only real substance |
| `Maps/My labeled places` | 1 | Home (street address, Norman OK) + Work (coords) |
| `Maps/Commute routes` | 1 | 2 route endpoints + a weekday commute pattern |
| `Maps/Traffic incident reports` | 13 | "police / confirm" taps, timestamped |
| `Maps/Suggested edits` | 9 | business-listing corrections |
| `Maps/Answers to automated questions` | 393 | "does this place have parking" — noise |
| everything else | — | settings, EV profile, vehicle profile |

No Gmail. No Drive. No Chat. No Location History. No photos.

## Re-requesting the export

At [takeout.google.com](https://takeout.google.com), **Deselect all**, then pick:

- **Mail** — ships as one `.mbox`. This is the big one, and usually multi-GB.
- **Drive** — pick "Google Docs → .docx" or "→ PDF" under *Multiple formats*.
- **Chat** — Google Chat only.
- **Location History (Timeline)** — may not appear; see below.
- **Photos** — carries GPS + timestamps in EXIF, often the best location record.

Choose **.zip** and a **50GB** split so you get one file instead of fifty.
Mail alone can take Google hours to a day or two to build.

## Two things Takeout will not give you

**SMS/MMS texts are not Google data.** They live on the phone. To export:

- *Android* — [SMS Backup & Restore](https://synctech.com.au/sms-backup-restore/)
  writes an XML file with every message, timestamped. That is the format you want.
- *iPhone* — texts are in the encrypted iTunes/Finder backup. `imessage-exporter`
  (open source) reads them out of it. iCloud does not export them.

**Location History moved on-device.** Google migrated Timeline off the cloud
around 2024. If it is not in Takeout, get it from the phone:
`Google Maps → your photo → Your Timeline → ⋯ → Location & privacy settings → Export Timeline data`.
That writes a JSON to the phone, which you mail to yourself.

## When you have them

Drop the new `Takeout/` next to this repo and re-run:

```
python3 ingest/takeout_ingest.py path/to/Takeout -o data/private/events.json
```

The mail and timeline parsers are already written. They switch on the moment
those folders exist — nothing to change.
