"""
Render data/private/events.json into a single self-contained local HTML file.

The JSON is inlined so the page opens straight off disk with no server and no
network. The output is private working material: it lands in data/private/,
which is gitignored. Nothing here publishes anything.

Usage:
    python3 ingest/build_viewer.py
"""

import html
import json
import os

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(HERE, "data", "private", "events.json")
OUT = os.path.join(HERE, "data", "private", "timeline.html")

PAGE = """<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Archive timeline (private)</title>
<style>
  :root {
    --bg: #12100e; --panel: #1b1815; --line: #2e2925;
    --ink: #ece7e1; --dim: #8d837a; --accent: #c98a4b; --warn: #c4564a;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink);
         font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, sans-serif; }
  header { padding: 28px 20px 20px; border-bottom: 1px solid var(--line); }
  h1 { margin: 0 0 6px; font-size: 20px; font-weight: 600; letter-spacing: -.01em; }
  .sub { color: var(--dim); font-size: 13px; }
  .flag { display: inline-block; margin-top: 12px; padding: 8px 12px;
          border: 1px solid var(--warn); border-left-width: 3px;
          border-radius: 3px; color: #e8b3ad; font-size: 12.5px; max-width: 60ch; }
  .wrap { max-width: 860px; margin: 0 auto; padding: 0 20px 80px; }
  .bar { display: flex; flex-wrap: wrap; gap: 6px; padding: 16px 0 20px; }
  button { background: var(--panel); color: var(--dim); border: 1px solid var(--line);
           border-radius: 999px; padding: 5px 13px; font-size: 12.5px; cursor: pointer; }
  button[aria-pressed="true"] { color: var(--bg); background: var(--accent);
                                border-color: var(--accent); font-weight: 600; }
  .yr { margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 1px solid var(--line);
        font-size: 13px; letter-spacing: .09em; text-transform: uppercase; color: var(--accent); }
  .ev { display: grid; grid-template-columns: 84px 1fr; gap: 14px;
        padding: 11px 0; border-bottom: 1px solid #201c19; }
  .d { color: var(--dim); font-size: 12px; font-variant-numeric: tabular-nums; padding-top: 2px; }
  .t { font-weight: 500; }
  .m { color: var(--dim); font-size: 12.5px; margin-top: 2px; }
  .q { margin-top: 6px; padding-left: 11px; border-left: 2px solid var(--line);
       color: #c3bab1; font-size: 13.5px; }
  .tag { display: inline-block; margin-left: 7px; padding: 1px 7px; border-radius: 3px;
         background: #2a2420; color: var(--dim); font-size: 10.5px;
         text-transform: uppercase; letter-spacing: .06em; vertical-align: 1px; }
  .tag.s { background: #3a2320; color: #e0a49c; }
  @media (max-width: 560px) { .ev { grid-template-columns: 1fr; gap: 2px; } }
</style>

<header>
  <div class="wrap" style="padding-bottom:0">
    <h1>Archive timeline</h1>
    <div class="sub" id="sub"></div>
    <div class="flag">Private working file. It sits in a gitignored folder and is not
      published anywhere. It contains a home address and commute endpoints — treat it
      the way you would treat the paper version.</div>
  </div>
</header>

<div class="wrap">
  <div class="bar" id="bar"></div>
  <div id="list"></div>
</div>

<script id="payload" type="application/json">__DATA__</script>
<script>
  const DATA = JSON.parse(document.getElementById('payload').textContent);
  const events = DATA.events, S = DATA.summary;
  const LABEL = { review:'review', anchor:'place', commute:'commute', traffic:'traffic',
                  map_edit:'map edit', email:'email', visit:'visit' };

  document.getElementById('sub').textContent =
    S.count + ' events · ' + (S.first||'').slice(0,10) + ' to ' + (S.last||'').slice(0,10)
    + ' · generated ' + S.generated.slice(0,10);

  const kinds = [...new Set(events.map(e => e.kind))].sort();
  let active = new Set(kinds);

  const bar = document.getElementById('bar');
  const mk = (label, on, fn) => {
    const b = document.createElement('button');
    b.textContent = label; b.setAttribute('aria-pressed', on); b.onclick = fn;
    bar.appendChild(b); return b;
  };
  mk('all', true, () => { active = new Set(kinds); render(); });
  kinds.forEach(k => mk(LABEL[k] || k, true, () => {
    active.has(k) ? active.delete(k) : active.add(k); render();
  }));

  function render() {
    [...bar.children].forEach((b, i) => {
      if (i === 0) b.setAttribute('aria-pressed', active.size === kinds.length);
      else b.setAttribute('aria-pressed', active.has(kinds[i - 1]));
    });

    const list = document.getElementById('list');
    list.textContent = '';
    let year = null;

    events.filter(e => active.has(e.kind)).forEach(e => {
      const y = e.when ? e.when.slice(0, 4) : 'undated';
      if (y !== year) {
        year = y;
        const h = document.createElement('div');
        h.className = 'yr'; h.textContent = y;
        list.appendChild(h);
      }

      const row = document.createElement('div');
      row.className = 'ev';

      const d = document.createElement('div');
      d.className = 'd';
      d.textContent = e.when ? e.when.slice(0, 10).slice(5) : '—';
      row.appendChild(d);

      const body = document.createElement('div');
      const t = document.createElement('div');
      t.className = 't';
      t.textContent = e.title;

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = LABEL[e.kind] || e.kind;
      t.appendChild(tag);

      if (e.sensitive) {
        const s = document.createElement('span');
        s.className = 'tag s'; s.textContent = 'sensitive';
        t.appendChild(s);
      }
      body.appendChild(t);

      const bits = [];
      if (e.stars) bits.push('★'.repeat(e.stars));
      if (e.address) bits.push(e.address);
      if (e.sender) bits.push(e.sender);
      if (bits.length) {
        const m = document.createElement('div');
        m.className = 'm'; m.textContent = bits.join(' · ');
        body.appendChild(m);
      }

      if (e.text) {
        const q = document.createElement('div');
        q.className = 'q'; q.textContent = e.text;
        body.appendChild(q);
      }

      row.appendChild(body);
      list.appendChild(row);
    });
  }
  render();
</script>
"""


def main():
    if not os.path.exists(SRC):
        raise SystemExit(f"no {SRC} -- run takeout_ingest.py first")

    with open(SRC, encoding="utf-8") as fh:
        data = json.load(fh)

    # </script> inside any string value would close the block early.
    payload = json.dumps(data).replace("</", "<\\/")
    page = PAGE.replace("__DATA__", payload)

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(page)

    print(f"{data['summary']['count']} events -> {OUT}")
    print("open it straight off disk; it needs no server and makes no network calls")


if __name__ == "__main__":
    main()
