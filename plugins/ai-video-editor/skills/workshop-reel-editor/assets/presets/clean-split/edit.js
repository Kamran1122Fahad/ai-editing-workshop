// STARTER (style clean-split): flat warm grey stage, white UI cards, graphics in the top half and the face in the
// bottom half, cut EXACTLY half/half with a plain straight edge (no curve, no shadow, no rounded corners).
// Captions: 2-3 word chunks, mono uppercase, white on a dark box, hard cuts, on the seam.
// Replace the demo sections with the real plan. Full worked edit: examples/chatgpt-business/edit.js.
// Safe area: graphics x 60-1020, y 230-930 in SPLIT; nothing important below y 1540; right edge x>960 free in y 1100-1750.
//
//  time      layout  on screen
//  0.0-4.0   SPLIT   demo: a window card, a question types out
//  4.0-6.0   FULL    demo: full face, a wall card slides in sideways
//  6.0-      SPLIT   demo: three rows pop in one by one
const W = 1080
reel({
  name: 'reel',
  duration: META.duration,
  face: { frames: META.faceFrames, focus: { x: 540, y: 820 }, headHeight: 490 }, // set focus from probe.sh's contact sheet
  theme: { accent: '#10A37F', ink: '#1C1B19' },
  seamShadow: 0, // plain straight seam
  capShow: { dy: 0, dyOut: 0, sc: 1, blur: 0, sin: { f: 30, z: 1 }, sout: { f: 30, z: 1 } }, // hard-cut captions
  captionY: { SPLIT: 928, FULL: 1440, PUNCH: 1440, CIRCLE: 1430, OFF: 330 },
  layouts: {
    // exactly half / half; fy moves the face inside its half: whole head visible with a little room above the hair
    SPLIT: { x: 0, y: 960, w: W, h: 960, r: 0, s: 1, fx: 540, fy: 400 },
    // face hidden below the frame: full-screen graphics (intro, big scenes)
    OFF: { x: 0, y: 2010, w: W, h: 960, r: 0, s: 1, fx: 540, fy: 400 },
    // face in a circle top right (for a full-screen article / screenshot underneath, use layerUnder)
    CIRCLE: { x: 620, y: 250, w: 400, h: 400, r: 200, s: 0.5, fx: 200, fy: 222 },
  },
})
const INK = '#1C1B19', MUTED = '#77746E', LINE = '#E6E4DF', GREEN = '#10A37F', RED = '#E5484D', BLUE = '#3B6FF5'
const SHADOW = 'box-shadow:0 1px 0 rgba(0,0,0,0.04),0 18px 40px -18px rgba(40,36,30,0.28)'
const box = (parent, css, html) => mk('div', `background:#fff;color:${INK};border-radius:22px;${SHADOW};${css}`, parent, html, 'abs')
// a white app window with the engine's traffic-light dots()
const win = (parent, { x = 60, y = 250, w = 960, h = 640, title = '' } = {}) => {
  const c = box(parent, `left:${x}px;top:${y}px;width:${w}px;height:${h}px;overflow:hidden`, '')
  mk('div', `left:0;top:0;width:${w}px;height:58px;border-bottom:1.5px solid ${LINE}`, c, null, 'abs')
  mk('div', 'left:24px;top:22px', c, dots(), 'abs')
  mk('div', `left:0;top:0;width:${w}px;line-height:58px;text-align:center;font-size:21px;color:${MUTED}`, c, title, 'abs mono url')
  return c
}
const POP = { dy: 18, sc: 0.85, blur: 2, sin: SPR.pop, cue: 'pop', gain: 0.7 }
// typewriter with a blinking caret, a pure function of t
const typed = (el, txt, t0, t1) => on((t) => {
  const n = Math.round(clamp((t - t0) / (t1 - t0)) * txt.length)
  const caret = t > t0 - 0.4 && t < t1 + 0.3 && Math.floor(t * 2.2) % 2 === 0 ? `<span style="display:inline-block;width:3px;height:1em;vertical-align:-0.12em;background:${INK}"></span>` : ''
  el.innerHTML = txt.slice(0, n) + caret
})
// horizontal slide-in (a variation on the vertical rises): springs in from dx, leaves to the right
const slide = (el, tin, tout, dx = -140, k = null) => {
  on((t) => {
    const a = clamp(S(t - tin, 3.2, 0.82), 0, 1.12), b = tout == null ? 0 : clamp(S(t - tout, 5, 1))
    const op = clamp(clamp((t - tin) / 0.12) - b)
    el.style.opacity = op.toFixed(3)
    el.style.visibility = op < 0.003 ? 'hidden' : 'visible'
    el.style.transform = `translateX(${(dx * (1 - a) + 80 * b).toFixed(1)}px)`
  })
  if (k) cue(tin + 0.05, k, 0.6)
}

faceAt([
  [-1, 'SPLIT'],
  [4.0, 'FULL'],
  [6.0, 'SPLIT'],
])

// ---------- 1 window + typed question (SPLIT) ----------
const L1 = layer('window')
const w1 = win(L1, { y: 260, h: 600, title: 'chat.example.com' })
const q1 = mk('div', `left:40px;top:110px;width:880px;font-size:44px;font-weight:700;line-height:56px`, w1, '', 'abs disp')
typed(q1, 'Your question types out here', 0.4, 2.2)
at(w1, -0.2, 4.0, { dy: 40, sc: 0.96, sin: SPR.enter, cue: 'whoosh', gain: 0.5 })

// ---------- 2 wall card (FULL) ----------
const L2 = layer('wall')
const c2 = box(L2, 'left:90px;top:300px;width:900px;padding:34px 40px;box-sizing:border-box', `<div class="mono" style="font-size:24px;color:${MUTED}">KEY POINT</div><div class="disp" style="font-size:66px;font-weight:800;line-height:76px">One idea per card</div>`)
slide(c2, 4.1, 5.9, -160, 'whoosh')

// ---------- 3 rows pop in (SPLIT) ----------
const L3 = layer('rows')
const rows = ['First', 'Second', 'Third'].map((s, i) => box(L3, `left:90px;top:${300 + i * 150}px;width:900px;height:120px;display:flex;align-items:center;padding:0 36px;box-sizing:border-box;font-size:44px;font-weight:700`, `<span class="disp">${s}</span>`))
stagger(rows, 6.1, 0.4, 9.0, POP)

// ---------- captions: [start, end, 'text'] in source seconds; *word* = keyword ----------
captions([
  [0.2, 1.4, 'replace these'],
  [1.4, 2.6, 'with the *transcript*'],
])
