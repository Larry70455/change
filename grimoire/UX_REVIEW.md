# UX/UI review — The Great Work (web, offline, PSP)

Reviewed November 22, 2026 against release `great-work-deck-df77e3cb66` (web) and PSP Build 20.
Tested in Chromium at 2560×1080, 1440×900, 1280×720, 390×844 and 844×390, plus a scripted
PSP frame loop with the native renderer stubbed. Rules and engine are unchanged; `tests/verify.mjs` passes.

## Changed in this pass

### Web and offline (same HTML)

| Issue | Fix |
| --- | --- |
| Locked cards are turned sideways and zoomed 1.4×, so the printed tier triangles and divider lines still showed. | Zoom raised to 2.25×. Only the center illustration shows, cropped inside the triangles on all 90 faces (they share one layout). |
| On wide screens the table stuck to the top-left, the Shelf and hand panels stretched across empty space, and the field panels grew tall with nothing in them. | Columns now size to their cards and the whole table centers horizontally and vertically. Fields and side panels align to the top of the table. |
| The start screen stretched to the full monitor width. | Capped at 1080 px and centered. |
| The game menu and fullscreen controls were at 15% opacity, so players couldn't find Rules or the log. | Raised to 75%, and 100% on hover or focus. |
| You ended a turn with a bare arrow icon. | Replaced with a labeled green **End turn** button. The Practice tip now says "Tap End turn". |
| Shelf, draw pile and hand had no labels. | Added captions: "Shelf", "Draw pile", "Your hand · N", "Take one card · Shelf or draw pile" during the free draw, and "Choose a card to discard" when discarding. |
| Nothing showed that the AI was taking its turn. | The rival header reads "Thinking…" during the AI's turn, and "Their turn" for a human rival. |
| Element and tier badges were sized to the window, so they covered small cards in phone landscape. | Badges now scale with each card (container query). |
| A card's plays listed Set Ward before Summon. | Plays are sorted by usefulness, and the top suggestion is highlighted. |
| The "unused Marks" and threat confirmations opened in a 960 px dialog. | Narrowed to 460 px. |
| Playable hand cards were hard to tell apart. | Usable cards get a gold glow. |
| The Practice tip blended into the page. | Styled as a centered callout. |

### PSP

| Issue | Fix |
| --- | --- |
| The board's bottom bar was blank during a normal turn, so the controls weren't shown anywhere outside the pause guide. | The bar now shows **✕ Play  □ Inspect  △ Options** on your turn. The AI's turn shows "Thinking...". Script size is 65,389 of 85,966 bytes. |

The PSP can't use the locked-card crop. The native `art()` call only supports its built-in crop modes, and the C source isn't in the handoff.

## AI opponent (shared engine, web and PSP)

AI-vs-AI test runs found two weaknesses in the AI.

1. **It missed breaks it could have made.** In 15 of 100 games the losing AI could have broken the winning line within three plays and didn't. Every one of those rivals had a face-down Ward. The first Hex is blocked and only the second flips the card, so the planner saw no gain after the first Hex, dropped that line, and spent its Marks elsewhere. A new `breakLine` search now runs only when a rival would win at the end of the turn. It looks for the shortest run of Hexes, Replaces and Mark restores that breaks every winning line, and it checks at most 20 positions in a step. That is cheap enough for the PSP.
2. **It handed rivals Locks.** Hexing a rival's upright card to reversed lets them Bless it next turn into a permanent Lock. Locks decide most games: 85% of wins had all four cards Locked. The AI now judges a rival's board after up to two Blesses, which matches the two + Marks they refresh each turn.

Results over 400 games, alternating seats: **the new AI beats the old one 82% of the time.** Avoidable losses went from 15 per 100 to 0. Raising the Lock weight or changing the risk weight made it weaker, so those stay as they were. Because Guided Practice uses the same AI, it is tougher there too. `tests/verify.mjs` still confirms the web and PSP engines match.

## Recommended next steps (not done)

1. **Explain the Hex flip on screen.** The banner says it happened. A small arrow animation on the flipped card would show the direction.
2. **Ask before discarding a Mystery.** Discarding one to pay a Mark sometimes changes the payment. Show which card goes before it's confirmed.
3. **Show the deck count when it runs low.** Under 10 cards, the draw pile should warn that a deck-out will decide the round.
4. **Make the hand bigger in phone landscape.** Cards are about 50 px wide there. Consider a hand drawer that scrolls horizontally.
5. **PSP: put a "Hold △ for moves" hint on the first turn of Guided Practice.** It needs a run in PPSSPP to check placement.

## Not verified
- I only ran PSP changes through a Node frame loop with stubbed native calls (20,000 random frames, no errors). Check them in PPSSPP or on hardware.
- Nothing was deployed to Cloudflare. Stage with `python3 web/cloudflare/deploy.py --stage` when you want a release. The art prefix doesn't change.
