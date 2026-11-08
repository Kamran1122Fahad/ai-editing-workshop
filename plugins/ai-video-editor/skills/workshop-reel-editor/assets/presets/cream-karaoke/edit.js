// STARTER (style cream-karaoke): cream stage, black headline card, pixel titles, graphics on top and the face below
// (rounded seam, face sits LOW so the whole head and some wall above it show). Captions: white rounded box, Poppins
// Bold, karaoke (upcoming words grey, spoken words turn black), centered on the seam.
// The intro opens on the full face and morphs into the split. Full worked edit: examples/claude-jobs/edit.js.
//
//  time      layout  on screen
//  0.0-1.0   FULL    full face (the A-roll) first
//  1.0-5.0   SPLIT   demo: headline card drops in, three chips pop
//  5.0-      FULL    demo: full-face beat with a wall card
reel({
  name: 'reel',
  duration: META.duration,
  face: { frames: META.faceFrames, focus: { x: 540, y: 900 }, headHeight: 560 }, // set focus from probe.sh's contact sheet
  theme: { accent: '#2D6BFF', ink: '#15151A' },
  captionY: { SPLIT: 880, FULL: 1480, HOOK: 1480, PUNCH: 1480, PIP: 1470 },
  // seam a bit higher and the face lower, so the whole head and some wall above it show
  layouts: { SPLIT: { x: 0, y: 920, w: 1080, h: 1050, r: 56, s: 1, fx: 540, fy: 500 } },
})
const INK = '#15151A', BLUE = '#2D6BFF', CYAN = '#1AA3FF', CREAM = '#F6F1E7', GREEN = '#1FB86A', RED = '#F0453A', YEL = '#FFD23F'
const PIX = "font-family:'Silkscreen',monospace"

faceAt([
  [-1, 'FULL'],
  [0.98, 'SPLIT'],
  [5.0, 'FULL'],
])

// ---------- 1 headline (SPLIT) ----------
const L1 = layer('headline')
const head = mk('div', `left:70px;top:250px;width:940px;padding:30px 40px 34px;box-sizing:border-box;border-radius:36px;background:${INK};color:#fff;text-align:center;box-shadow:0 30px 80px -24px rgba(0,0,0,0.45)`, L1, null, 'abs')
mk('div', 'font-size:54px;font-weight:800;line-height:64px', head, 'The big hook line', 'disp')
mk('div', `font-size:76px;font-weight:900;line-height:90px;color:${YEL};letter-spacing:-1px`, head, 'THE NUMBER', 'disp')
at(head, 1.0, 5.0, { dy: -80, sc: 1.06, sin: SPR.slam, cue: 'thunk', cueDelay: 0.2 })
at(mk('div', `left:0;top:620px;width:1080px;text-align:center;${PIX};font-size:44px;color:${BLUE}`, L1, 'PIXEL TITLE', 'abs'), 1.3, 5.0, { dy: 30, sin: SPR.pop, cue: 'tick' })
const row = mk('div', 'left:0;top:720px;width:1080px;display:flex;justify-content:center;gap:16px', L1, null, 'abs')
stagger(['One', 'Two', 'Three'].map((s) => chip(row, s)), 2.0, 0.4, 5.0, { dy: 30, sc: 0.5, rot: -6, sin: SPR.pop, cue: 'pop' })

// ---------- 2 wall card (FULL) ----------
const L2 = layer('wall')
at(wallCard(L2, `<div class="disp" style="font-size:66px;font-weight:850;line-height:76px">A full-face beat</div>`, { y: 240 }), 5.1, 8.0, { dy: 40, sin: SPR.pop, cue: 'pop' })

// ---------- captions: [start, end, 'text'] in source seconds; 2-4 words per chunk, as spoken ----------
captions([
  [0.2, 1.4, 'replace these'],
  [1.4, 2.6, 'with the transcript'],
])

// karaoke: each chunk's words turn from grey to black as they are spoken. Word times are spread over the chunk by
// word length (keep chunks 2-4 words, under ~1.3s). Must come AFTER captions().
for (const c of CAPS) {
  const words = c.txt.replace(/\*/g, '').split(/\s+/)
  const total = words.reduce((n, w) => n + w.length + 1, 0)
  let acc = 0
  c.el.innerHTML = '<span>' + words.map((w) => { const k = c.a + (c.b - c.a) * (acc / total) * 0.92; acc += w.length + 1; return `<b data-k="${k.toFixed(3)}">${w}</b>` }).join(' ') + '</span>'
  c.words = [...c.el.querySelectorAll('b')]
}
on((t) => { for (const c of CAPS) if (t > c.a - 0.3 && t < c.b + 0.4) c.words.forEach((b) => b.classList.toggle('on', t >= +b.dataset.k)) })
