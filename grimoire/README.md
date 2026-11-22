# Grimoire and The Great Work engineering handoff

Snapshot from November 22, 2026. The reference web release is `great-work-deck-df77e3cb66` at [grimoire.schrimpf.xyz](https://grimoire.schrimpf.xyz/great-work/#game). The PSP reference is **Build 20**. Both use the same 90-card deck and game rules. The web build also includes the Grimoire reading, deck, saved readings, and Sky views.

## Start here

Give the receiving agent this folder and the GitHub repository and branch you want it to work in. This is a verified source snapshot. It carries no Git history or credentials. Compare the target branch and the active Cloudflare version to the snapshot before merging changes.

> Read this handoff and run the checks below. Compare the live Cloudflare Worker and the target GitHub branch to the included baseline. Use the web source for deck and shared rules changes, sync those changes to PSP, and keep each platform's controls. Build a PSP ZIP and stage the web version for review. Deploy only when I ask for a live release.

| Path | What it contains |
| --- | --- |
| `web/index.html` | Exact published HTML, CSS, and JavaScript. The Great Work logic starts at `createGreatWork`, followed by the browser UI. |
| `web/assets/` | Current 90 card faces and corrected back under `fronts-92-marks/`. |
| `web/cloudflare/` | Exact active Worker modules, deployment and binding details, and a helper for staging and deploying updates. |
| `psp/game.js` | Editable deck, shared rules engine, PSP renderer calls, controller navigation, menus, AI and hot-seat flow. |
| `psp/reference/` | The shipped Build 20 ZIP. Its EBOOT supplies the native PSP/QuickJS runtime and stock textures. It includes the original component license notices. |
| `psp/pack.py`, `psp/art/` | Repack the EBOOT with an edited script, and optionally rebuild textures or the icon atlas. |
| `shared/` | Current deck snapshot, element SVG paths, tier triangle geometry, and scripts to sync PSP and rebuild standalone web HTML. |
| `offline/Grimoire_The_Great_Work.html` | Self-contained web copy with the current 90-card deck and back embedded. Gameplay works offline. Live data lookups may need the hosted site. |
| `tests/verify.mjs`, `SHA256SUMS` | Cross-version deck and gameplay checks, plus a checksum manifest for this handoff. |

## Run and edit

Use Node.js 20 or newer and Python 3.10 or newer. The ordinary checks and PSP script repack use the standard libraries.

```sh
node tests/verify.mjs
python3 -m http.server 8000 --directory web
```

Open `http://localhost:8000/#game`. The static server serves game HTML and artwork. Cloudflare Worker routing and the `/api/` endpoints require the deployed Worker or a Worker test environment with bindings. For a no-server preview, open the HTML in `offline/` directly. The bundled previews carry artwork for the current deck. Older saved readings may reference legacy images served by the existing production Worker.

1. Edit browser presentation and input in `web/index.html`. Key functions include `render`, `cardOverlays`, `startCardDrag`, `requestFinish`, and `toggleFullscreen`.
2. Edit the web `const DECK =` array or `createGreatWork` for shared changes. Stable card IDs carry through game logic, artwork references, and saved readings. Keep the legacy deck definitions available for old readings.
3. Run `node shared/sync-psp.mjs --write` to update the core and deck in `psp/game.js` and refresh `shared/deck.current.json`. The PSP layer begins at `const game=createGreatWork(DECK);`.
4. Run `node shared/make-offline.mjs` to regenerate the inline-art web copy after a web change. This uses assets in `web/assets/`.
5. Rerun the checks and rebuild the PSP package if its code or assets changed.

## Rules and interaction to preserve

- The 90 cards comprise 46 Modest, 24 Major, 14 Mystery, four Master, and two Mythic. Universal and Return are Mythics with the same reading on both faces.
- A round deals five cards per player with three visible on the Shelf. Two to four seats are supported. Two spare counters complete the fourth player's Marks. These versions run locally with AI or shared-device play.
- Players start their turns with two reusable plus Marks and two reusable minus Marks. A drawn Mystery can pay its printed sign by discard. Restoring a spent reusable Mark costs one hand card the first time in a turn and two the second time.
- Summoning costs three, two, or one Mark by tier. The price includes a plus for upright or a minus for reversed. Mythics play free in either orientation. Locked slots accept matching replacements of equal or higher tier. Mythics may also replace a card on their own field.
- Hex spends one minus to flip an unlocked rival card in either direction, leaving it unlocked. A face-down Ward can block and is discarded when used. Bless spends one plus to turn an owned reversed card upright and lock it. Locked cards count upright.
- The rival wins if its four elements still face the same way when the active player ends actions. Human players acknowledge this threat at the start of their turn and confirm again if it remains when ending. Both editions also warn about unused reusable Marks. After the win check, take one free draw and discard down to seven if needed.
- Present one entry per move and facing. Default to the suggested payment. Alternate payments remain available on the web via **Payment** and on PSP via **Triangle**. Confirm discarding a Mystery when required. PSP controller actions use the directional pad, Cross to act, Square to inspect, Triangle for options, L/R to switch board areas, and Start to pause.
- Web drag and drop covers hand, Shelf, deck, Wards, and sacrifice. A sticky Hex banner and a red target badge make the pending or landed Hex visible. Fullscreen uses the native API where available and a viewport-filling layout elsewhere. Preserve scaling at desktop, mobile portrait, and mobile landscape sizes.
- Element badge upright orientation matches the printed face. Rotate it with the card. The tier badges use one, two, or three equal-size triangles, with Master forming a larger triangle. Rotate the mark 180° to indicate reversed cards. A padlock identifies Locked, and a separate arrow supplies orientation for Mythics.

## Cloudflare release workflow

The bound Worker is `grimoire`, and `web/cloudflare/deployment.json` records the account, domain, namespace, last deployment ID, and Worker version. The production snapshot was **71945b35-9839-4780-bff6-c01958230bf1** at 100 percent. Verify this again before an update. Account and namespace IDs are resource identifiers. Supply access separately through the Cloudflare connection or an environment token.

- `worker.mjs` serves the HTML from ordered gzip segments in `GREAT_WORK_RELEASES` and sets `x-grimoire-release`. `release.mjs` pins the HTML keys and current art prefix. Both `/` and `/great-work/` serve the same HTML. The current artwork routes into the same KV namespace. Older artwork and other static routes use the existing `ASSETS` binding. `legacy.mjs` also handles the city and nature data routes.
- To prepare a release with the connector, put the changed HTML in new versioned gzip keys and verify the stored bytes. Create a version with the new `release.mjs`, the other Worker modules, the same compatibility settings and bindings, and `keep_assets: true`. Check the currently deployed version again before routing traffic.
- The included `deploy.py` does the same via API. It defaults to a local plan. Use a scoped `CLOUDFLARE_API_TOKEN` in the environment for deployment operations. Keep the existing static assets attached. A normal HTML update reuses the art prefix. Use `--publish-art` for a changed current 90-card art set; it uploads 91 WebPs with per-image SHA-256 metadata into a separate versioned prefix. If artwork was already updated by another release, supply its active prefix with `--art-release`.
- Stage first. Deploy the staged version explicitly. Retain the prior version for rollback. If Cloudflare has moved since this snapshot, compare upstream modules and bindings before passing a different `--expected-version`.

```sh
python3 web/cloudflare/deploy.py
python3 web/cloudflare/deploy.py --stage --message "Describe the change"
python3 web/cloudflare/deploy.py --deploy STAGED_VERSION_ID --message "Describe the change"
curl -fsSI https://grimoire.schrimpf.xyz/
curl -fsSI https://grimoire.schrimpf.xyz/great-work/
```

Check the release header, an artwork URL, and a practice game after deployment. Rollback uses the previous version ID with the same `--deploy` command and the **current** live ID as `--expected-version`. Do not upload the whole archive as a new Cloudflare project. It contains source, standalone artifacts, and PSP builds that do not belong in the public Worker assets.

## PSP build workflow

```sh
node --check psp/game.js
python3 psp/pack.py --out psp/build/The_Great_Work_PSP.zip
```

Extract the output so the file lands at `PSP/GAME/GreatWork/EBOOT.PBP` on the device. For PPSSPP, unzip the game and open the EBOOT. Test Guided Practice, target reversal, Ward, alternate payment, a turn warning, and a hot-seat handoff. Check `great-work.log` beside the EBOOT for script errors.

The native PSP renderer is available in this handoff as a built MIPS ELF inside the PBP. The original native C/C++ project and its toolchain recipe were unavailable. `pack.py` targets **the exact bundled Build 20** and validates the expected layout before changing it. The native layer provides `box`, `glass`, `ink`, `highlight`, `icon`, `table`, `art`, `tile`, `diagnostic`, and `systemResetDialog`. It invokes `globalThis.frame(buttons, lx, ly, forceDraw)`. Keep the script within the existing 85,966-byte slot and the deck at 90 cards. Build 20 uses about 65 KB of script space.

- For card art changes, install Pillow and repack with `--artwork`. The current WebPs become 256×349 baseline JPEGs indexed by `tex`, and texture 90 is the back. The renderer uses a fixed JPEG region and a 92-entry offset table.
- To edit the badge art, use `psp/art/icon-atlas.png` and pack it with `--atlas PATH`. The 128×128 atlas is packed as RGBA4444 with 18-pixel cells. IDs 0–3 are upright elements, 35–38 reversed elements, 30–32 upright triangles, and 39–41 reversed triangles. If you change shared glyph geometry, `psp/art/generate-icons.mjs` regenerates those cells using Sharp. The remaining cells include control icons, special tiers, and the orientation/lock symbols.

## What was verified

- The web source and release hash matched the served production page. The local snapshot carries all 90 current card faces and the corrected back. The latest online UI was tested in Chromium at desktop and mobile sizes.
- Build 20 booted and rendered in PPSSPP. The PSP package can be rebuilt from the supplied reference with an EBOOT byte-identical to the shipped one using the provided script, and also after regenerating the included textures or icon atlas. Physical PSP hardware was unavailable.
- The local test covers shared deck and rule parity, Hex with and without Ward, Bless, winning alignment, the four-player Mark supply, and a seeded web/PSP AI game. The included Cloudflare helper was checked locally; this handoff does not publish any changes.
