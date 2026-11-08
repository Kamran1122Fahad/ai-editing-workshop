// ChatGPT Business: 44s Urdu/Hindi talking head. "ChatGPT ne Google ko khatam kar diya": businesses will be able to
// register on ChatGPT (leak), Google lost $500B in market value, claim early, follow for the how-to.
//
// Direction (from the references):
//  - text reference: flat warm light-grey stage, graphics on top / face below, white UI cards with soft shadows,
//    captions = 2-3 words, mono uppercase, white on a dark box, hard cuts, sitting on the seam
//  - voice note: the split is exactly half / half with a straight, plain edge (no curve, no shadow); every graphic
//    stays inside the platform safe area
//  - animation reference: a real article fills the frame, the face in a circle top right, red marker sweeps over
//    the words as they are spoken, gentle scroll
//  Safe area used: graphics x 60-1020, y 230-930 in split (face below the seam); nothing important below y 1540.
//
//  time        layout  on screen                                              lands on
//  0.0-2.4     SPLIT   ChatGPT vs Google cards; Google crossed out             khatam 1.40
//  2.48-5.0    SPLIT   concept window: register your business form            business 3.86, register 4.22
//  5.06-14.5   SPLIT   chat: customer types the shoes-in-Lahore question,     search 6.88, joote 8.54
//                      answer shows YOUR business: address/products/website   address 10.98, products 11.82, website 12.32
// 14.58-20.2   FULL    wall card: same as registering on Google               Google 15.5, search 18.28
// 20.24-24.4   SPLIT   trend chart: AI up, Google use down                    growth 21.52, kam 23.72
// 24.5-29.4    CIRCLE  NBC News article, marker on Alphabet / $500 billion    Google 25.18, 500 26.98
// 29.54-33.3   SPLIT   status card: not launched yet / leak: coming soon      nahi 30.36, leak 31.36, jald 32.52
// 33.46-36.9   SPLIT   claim first: your business gets claimed + advantage    claim 34.78, faida 35.56
// 37.0-41.5   SPLIT   "how to register" guide card, when it launches         update 38.46, register 40.68
// 41.6-44.14   SPLIT   1 Like / 2 Follow Talha Reviews card                   like 42.10, follow 43.42

const H = 1920, W = 1080
reel({
  name: 'chatgpt_business',
  duration: META.duration,
  face: { frames: META.faceFrames, focus: { x: 640, y: 830 }, headHeight: 490 },
  theme: { accent: '#10A37F', ink: '#1C1B19' },
  seamShadow: 0, // plain straight seam (voice note)
  capShow: { dy: 0, dyOut: 0, sc: 1, blur: 0, sin: { f: 30, z: 1 }, sout: { f: 30, z: 1 } }, // hard cuts like the text reference
  captionY: { SPLIT: 928, FULL: 1440, PUNCH: 1440, CIRCLE: 1430, OFF: 330, ARENA: 330 },
  layouts: {
    // exactly half / half, straight edge, whole head visible with a little room above the hair
    SPLIT: { x: 0, y: 960, w: W, h: 960, r: 0, s: 1, fx: 640, fy: 400 },
    // animation reference: face in a circle at the top right (inside the safe area)
    // intro: no face on screen, the graphics own the full frame; the face slides up into SPLIT at 2.4
    OFF: { x: 0, y: 2010, w: W, h: 960, r: 0, s: 1, fx: 640, fy: 400 },
    ARENA: { x: 0, y: 2010, w: W, h: 960, r: 0, s: 1, fx: 640, fy: 400 }, // mid-video fight: full-screen graphics
    CIRCLE: { x: 620, y: 250, w: 400, h: 400, r: 200, s: 0.5, fx: 200, fy: 222 },
  },
})
const INK = '#1C1B19', MUTED = '#77746E', LINE = '#E6E4DF', GREEN = '#10A37F', RED = '#E5484D', BLUE = '#3B6FF5'
const SHADOW = 'box-shadow:0 1px 0 rgba(0,0,0,0.04),0 18px 40px -18px rgba(40,36,30,0.28)'
const box = (parent, css, html) => mk('div', `background:#fff;color:${INK};border-radius:22px;${SHADOW};${css}`, parent, html, 'abs')
// dots(): the engine's window traffic lights
const win = (parent, { x = 60, y = 250, w = 960, h = 640, title = '' } = {}) => {
  const c = box(parent, `left:${x}px;top:${y}px;width:${w}px;height:${h}px;overflow:hidden`, '')
  mk('div', `left:0;top:0;width:${w}px;height:58px;border-bottom:1.5px solid ${LINE}`, c, null, 'abs')
  mk('div', 'left:24px;top:22px', c, dots(), 'abs')
  mk('div', `left:0;top:0;width:${w}px;line-height:58px;text-align:center;font-size:21px;color:${MUTED}`, c, title, 'abs mono url')
  return c
}
const GOOGLE = '<span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">g</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span>'
const SOFT = { dy: 26, sc: 0.97, blur: 3 }
const POP = { dy: 18, sc: 0.85, blur: 2, sin: SPR.pop, cue: 'pop', gain: 0.7 }
const typed = (el, txt, t0, t1) => on((t) => {
  const n = Math.round(clamp((t - t0) / (t1 - t0)) * txt.length)
  const caret = t > t0 - 0.4 && t < t1 + 0.3 && Math.floor(t * 2.2) % 2 === 0 ? `<span style="display:inline-block;width:3px;height:1em;vertical-align:-0.12em;background:${INK}"></span>` : ''
  el.innerHTML = txt.slice(0, n) + caret
})

// horizontal slide-in (variation from the vertical rises): springs in from dx, leaves to the right
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
  [-1, 'OFF'],
  [2.36, 'SPLIT', SPR.morph],
  [14.52, 'FULL'],
  [20.16, 'ARENA'],
  [24.44, 'CIRCLE'],
  [29.46, 'SPLIT'],
])

// ---------- shared: logos, easing ----------
const OPENAI = `M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z` // official OpenAI mark (Simple Icons)
const KNOT = (sz, col = '#fff') => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24"><path d="${OPENAI}" fill="${col}"/></svg>`
const easeIn = (x) => x * x * x, easeOut = (x) => 1 - Math.pow(1 - x, 3)
const PIX = "font-family:'Silkscreen',monospace"

// ---------- the Colosseum fight (ROUND 1 intro, ROUND 2 mid video) ----------
// One arena world (1200x2000, painted once on canvases from a seeded RNG, so every frame is a pure function of t):
// sky + sun, curved tiers of arcades and ~5,000 spectators, podium with banners and a gate, raked sand, wall shadow,
// light shafts, haze. The robots are the user's reference characters cut out of their image (assets/bots).
// A camera (scale / focus / tilt) pushes in slowly, punches in on every hit and zooms on the K.O.
const WW = 1200, WH = 2000, WX = -60, WY = -40 // world size and where it sits on the stage
const FEET = 1300, GX0 = 250, CX0 = 900         // world: floor line under the fighters, their resting x
const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
const curveY = (x, base, c) => base - c * Math.pow((x - WW / 2) / (WW / 2), 2)
const DPR = 1.4
const mkCanvas = (parent) => {
  const c = mk('canvas', `left:0;top:0;width:${WW}px;height:${WH}px`, parent, null, 'abs')
  c.width = WW * DPR; c.height = WH * DPR
  const ctx = c.getContext('2d'); ctx.scale(DPR, DPR)
  return [c, ctx]
}
const BANDS = { attic: [392, 452, 118], crowdA: [452, 640, 128], arcade: [640, 716, 140], crowdB: [716, 912, 150], podium: [912, 1018, 160], wall: [1018, 1046, 164] }
function bandPath(ctx, [y0, y1, c]) {
  ctx.beginPath(); ctx.moveTo(0, curveY(0, y0, c))
  for (let x = 0; x <= WW; x += 20) ctx.lineTo(x, curveY(x, y0, c))
  for (let x = WW; x >= 0; x -= 20) ctx.lineTo(x, curveY(x, y1, c))
  ctx.closePath()
}
function paintArena(ctx) {
  const R = rng(11)
  // sky and sun
  let g = ctx.createLinearGradient(0, 0, 0, 760); g.addColorStop(0, '#F6DDB7'); g.addColorStop(1, '#E7B07A')
  ctx.fillStyle = g; ctx.fillRect(0, 0, WW, 800)
  g = ctx.createRadialGradient(980, 180, 0, 980, 180, 620); g.addColorStop(0, 'rgba(255,244,214,0.95)'); g.addColorStop(1, 'rgba(255,244,214,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, WW, 900)
  // velarium poles on the rim
  ctx.strokeStyle = '#8A5A3C'; ctx.lineWidth = 4
  for (let x = 30; x < WW; x += 86) { const y = curveY(x, 392, 118); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 46); ctx.stroke() }
  // attic: stone with small windows
  bandPath(ctx, BANDS.attic); ctx.fillStyle = '#D8B184'; ctx.fill()
  ctx.fillStyle = '#6E4330'
  for (let x = 20; x < WW; x += 54) { const y = curveY(x, 410, 118); ctx.fillRect(x, y, 18, 24) }
  // arcade: arches and columns
  bandPath(ctx, BANDS.arcade); ctx.fillStyle = '#CFA678'; ctx.fill()
  for (let x = 10; x < WW; x += 64) {
    const y = curveY(x + 20, 652, 140)
    ctx.fillStyle = '#5B3424'; ctx.beginPath(); ctx.moveTo(x + 6, y + 56); ctx.lineTo(x + 6, y + 22); ctx.arc(x + 26, y + 22, 20, Math.PI, 0); ctx.lineTo(x + 46, y + 56); ctx.fill()
    ctx.fillStyle = '#E2C29A'; ctx.fillRect(x + 50, y - 6, 8, 66)
  }
  // podium: stone, red banners with gold trim, central gate
  bandPath(ctx, BANDS.podium); g = ctx.createLinearGradient(0, 900, 0, 1020); g.addColorStop(0, '#C99D70'); g.addColorStop(1, '#B4875D'); ctx.fillStyle = g; ctx.fill()
  for (let x = 70; x < WW; x += 190) {
    const y = curveY(x + 30, 920, 160)
    ctx.fillStyle = '#B5352B'; ctx.fillRect(x, y, 62, 84)
    ctx.beginPath(); ctx.moveTo(x, y + 84); ctx.lineTo(x + 31, y + 100); ctx.lineTo(x + 62, y + 84); ctx.fill()
    ctx.fillStyle = '#E8B84A'; ctx.fillRect(x, y, 62, 6); ctx.fillRect(x + 27, y + 30, 8, 30)
  }
  ctx.fillStyle = '#3E2318'; ctx.beginPath(); const gy = curveY(600, 930, 160); ctx.moveTo(548, gy + 92); ctx.lineTo(548, gy + 30); ctx.arc(600, gy + 30, 52, Math.PI, 0); ctx.lineTo(652, gy + 92); ctx.fill()
  bandPath(ctx, BANDS.wall); ctx.fillStyle = '#9C6E48'; ctx.fill()
  // sand floor: lit centre, darker edges, raked rings, speckles
  ctx.save(); ctx.beginPath(); ctx.moveTo(0, curveY(0, 1046, 164)); for (let x = 0; x <= WW; x += 20) ctx.lineTo(x, curveY(x, 1046, 164)); ctx.lineTo(WW, WH); ctx.lineTo(0, WH); ctx.closePath(); ctx.clip()
  g = ctx.createLinearGradient(0, 900, 0, WH); g.addColorStop(0, '#DDAE74'); g.addColorStop(0.35, '#EDC690'); g.addColorStop(1, '#D29C61'); ctx.fillStyle = g; ctx.fillRect(0, 800, WW, WH)
  g = ctx.createRadialGradient(640, 1330, 40, 640, 1330, 700); g.addColorStop(0, 'rgba(255,236,196,0.55)'); g.addColorStop(1, 'rgba(255,236,196,0)'); ctx.fillStyle = g; ctx.fillRect(0, 800, WW, WH)
  ctx.strokeStyle = 'rgba(150,95,45,0.13)'; ctx.lineWidth = 3
  for (let r = 1; r < 9; r++) { ctx.beginPath(); ctx.ellipse(600, 1330, 120 * r, 34 * r, 0, 0, 2 * Math.PI); ctx.stroke() }
  for (let i = 0; i < 7000; i++) { const x = R() * WW, y = 1000 + R() * 1000; ctx.fillStyle = R() < 0.5 ? 'rgba(160,105,55,0.25)' : 'rgba(255,240,210,0.35)'; ctx.fillRect(x, y, 2 + R() * 2, 2) }
  // wall shadow on the sand, deeper on the left (sun from the right)
  g = ctx.createLinearGradient(0, 1040, 0, 1180); g.addColorStop(0, 'rgba(70,35,12,0.42)'); g.addColorStop(1, 'rgba(70,35,12,0)'); ctx.fillStyle = g; ctx.fillRect(0, 900, WW, 300)
  ctx.restore()
  // shade over the left of the stands, light shafts from the right, haze on the far tiers
  g = ctx.createLinearGradient(0, 0, 760, 0); g.addColorStop(0, 'rgba(60,28,12,0.38)'); g.addColorStop(1, 'rgba(60,28,12,0)'); ctx.fillStyle = g; ctx.fillRect(0, 330, WW, 720)
}
// spectators: one seeded population drawn three ways (idle A, idle B, cheering)
function paintCrowd(ctx, mode) {
  const R = rng(42)
  const tunic = ['#F1E6D2', '#B5352B', '#D9A441', '#7A4E8C', '#3E6BA8', '#E9D7B0', '#8C3B2A', '#4F7A4A', '#FFFFFF']
  const skin = ['#F1C9A0', '#D9A47A', '#B87C55', '#8D5A3B', '#E8B990']
  for (const [key, size] of [['crowdA', 5.2], ['crowdB', 7.2]]) {
    const [y0, y1, c] = BANDS[key], sp = size * 2.3
    for (let y = y0 - c; y < y1; y += sp) for (let x = -10; x < WW + 10; x += sp * 0.82) {
      const jx = x + (R() - 0.5) * sp * 0.5, jy = y + (R() - 0.5) * sp * 0.4
      const top = curveY(jx, y0, c), bot = curveY(jx, y1, c)
      const r1 = R(), r2 = R(), r3 = R(), r4 = R()
      if (jy < top + size || jy > bot - size) continue
      const bobY = mode === 'B' && r3 < 0.35 ? -1.6 : mode === 'C' ? -2.2 - r3 * 2 : 0
      ctx.fillStyle = tunic[Math.floor(r1 * tunic.length)]
      ctx.fillRect(jx - size * 0.9, jy + bobY, size * 1.8, size * 1.6)
      ctx.fillStyle = skin[Math.floor(r2 * skin.length)]
      ctx.beginPath(); ctx.arc(jx, jy - size * 0.55 + bobY, size * 0.72, 0, 2 * Math.PI); ctx.fill()
      if (mode === 'C' && r4 < 0.55) { ctx.fillRect(jx - size * 1.1, jy - size * 1.9 + bobY, size * 0.45, size * 1.4); ctx.fillRect(jx + size * 0.65, jy - size * 1.9 + bobY, size * 0.45, size * 1.4) }
    }
    // tier shade + haze on the far tier
    ctx.save(); bandPath(ctx, BANDS[key]); ctx.clip()
    const g = ctx.createLinearGradient(0, y0 - c, 0, y1); g.addColorStop(0, key === 'crowdA' ? 'rgba(245,214,170,0.32)' : 'rgba(245,214,170,0.12)'); g.addColorStop(1, 'rgba(60,30,12,0.18)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, WW, 1100)
    ctx.restore()
  }
}

const LF = layer('fight')
const world = mk('div', `left:${WX}px;top:${WY}px;width:${WW}px;height:${WH}px`, LF, null, 'abs')
const [cvBg, ctxBg] = mkCanvas(world); paintArena(ctxBg)
const crowdCv = ['A', 'B', 'C'].map((m) => { const [c, x] = mkCanvas(world); paintCrowd(x, m); world.insertBefore(c, cvBg.nextSibling); return c })
const shafts = mk('div', `left:0;top:0;width:${WW}px;height:${WH}px;pointer-events:none;background:
  linear-gradient(115deg, transparent 38%, rgba(255,240,205,0.16) 41%, transparent 47%),
  linear-gradient(115deg, transparent 52%, rgba(255,240,205,0.12) 55%, transparent 60%),
  linear-gradient(115deg, transparent 64%, rgba(255,240,205,0.10) 67%, transparent 73%);mix-blend-mode:screen`, world, null, 'abs')
// fighters: shadows, sprites, effects
const shadow = () => mk('div', 'left:0;top:0;width:300px;height:56px;border-radius:50%;background:radial-gradient(closest-side, rgba(70,35,12,0.45), rgba(70,35,12,0));transform-origin:150px 28px', world, null, 'abs')
const shG = shadow(), shC = shadow()
const SPRITE = { g: { src: 'assets/bots/google.png', w: 885, h: 621, ax: 270 }, c: { src: 'assets/bots/chatgpt.png', w: 643, h: 557, ax: 400 } }
const SC = 0.56
const sprite = (k) => {
  const s = SPRITE[k]
  const el = mk('div', `left:0;top:0;width:${s.w * SC}px;height:${s.h * SC}px;transform-origin:${s.ax * SC}px ${s.h * SC}px;filter:drop-shadow(0 10px 0 rgba(0,0,0,0.12))`, world, null, 'abs')
  img(s.src, `left:0;top:0;width:${s.w * SC}px;height:${s.h * SC}px;image-rendering:pixelated`, el, 'abs')
  el.s = s
  return el
}
const BG = sprite('g'), BC = sprite('c')
const flashG = mk('div', 'left:0;top:0;width:0;height:0', world, null, 'abs') // placeholder for ordering
const sparks = Array.from({ length: 14 }, (_, i) => mk('div', `left:0;top:0;width:16px;height:16px;background:${i % 3 ? '#FFE27A' : '#FFFFFF'};box-shadow:0 0 0 3px #1C1C1C`, world, null, 'abs'))
const ringFx = mk('div', 'left:0;top:0;width:200px;height:200px;border-radius:100px;border:10px solid #fff;box-sizing:border-box', world, null, 'abs')
const dust = Array.from({ length: 10 }, () => mk('div', 'left:0;top:0;width:70px;height:70px;border-radius:35px;background:rgba(236,205,160,0.75)', world, null, 'abs'))
const motes = Array.from({ length: 26 }, (_, i) => mk('div', `left:0;top:0;width:${3 + (i % 3)}px;height:${3 + (i % 3)}px;border-radius:3px;background:rgba(255,246,222,0.85)`, world, null, 'abs'))
const vignette = mk('div', `left:0;top:0;width:${W}px;height:${H}px;background:radial-gradient(120% 80% at 55% 55%, transparent 55%, rgba(40,18,6,0.45) 100%)`, LF, null, 'abs')
const koTxt = mk('div', `left:0;top:560px;width:${W}px;text-align:center;${PIX};font-size:170px;line-height:180px;color:#FFD23F;text-shadow:0 0 0 #000, 10px 10px 0 #1C1C1C, -4px -4px 0 #B5352B`, LF, 'K.O.', 'abs')

// the two fights. hits: [time, kind] with kind clash (blocked by the shield), hit, ko. flex: [time, who]
const SCENES = [
  { tIn: -1, tOut: 2.3, flex: [[0.02, 'c'], [0.9, 'g']], hits: [[1.4, 'ko']], push: [1.0, 1.07] },
  { tIn: 20.16, tOut: 24.36, flex: [], hits: [[21.24, 'clash'], [22.66, 'hit'], [23.72, 'ko']], push: [1.0, 1.06] },
]
const sceneAt = (t) => SCENES.find((s) => t > s.tIn - 0.05 && t < s.tOut + 0.25)
const CONTACT = { x: GX0 + 290, y: FEET - 190 }
function poseAt(t, sc) {
  const hits = sc.hits, ko = hits.find(([, k]) => k === 'ko')?.[0]
  let cx = CX0, cy = FEET, crot = 0, csq = 1, gx = GX0, gy = FEET, grot = 0, gflash = 0, gop = 1
  for (const [k, kind] of hits) {
    const lift = kind === 'ko' ? 260 : 70
    if (t > k - 0.34 && t <= k - 0.18) { const p = smooth((t - k + 0.34) / 0.16); cx += 30 * p; csq = 1 - 0.12 * p }
    else if (t > k - 0.18 && t <= k) { const p = easeIn((t - k + 0.18) / 0.18); cx = lerp(CX0 + 30, CONTACT.x + 150, p); cy = FEET - lift * Math.sin(Math.PI * Math.min(1, p * 0.85 + 0.15)); crot = -18 * p; csq = 1.08 }
    else if (t > k && t <= k + 0.5 && kind !== 'ko') { const p = easeOut((t - k) / 0.5); cx = lerp(CONTACT.x + 150 + (kind === 'clash' ? 40 : 0), CX0, p); cy = FEET - 60 * Math.sin(Math.PI * p); crot = -18 * (1 - p) }
    else if (t > k && kind === 'ko') { const p = easeOut(clamp((t - k) / 0.55)); cx = lerp(CONTACT.x + 150, CX0 - 220, p); cy = FEET - 40 * Math.sin(Math.PI * p); crot = -18 * (1 - p) }
    // Google's reaction
    if (t > k) {
      const tau = t - k
      if (kind === 'clash') { gx -= 34 * pulse(tau, 3); grot -= 6 * pulse(tau, 3); gflash = Math.max(gflash, tau < 0.08 ? 0.6 : 0) }
      if (kind === 'hit') { gx -= 90 * pulse(tau, 2.2); grot -= 16 * pulse(tau, 2.2); gflash = Math.max(gflash, tau < 0.1 ? 1 : 0) }
      if (kind === 'ko') {
        const p = clamp(tau / 0.9)
        gx -= 760 * easeOut(p); gy -= 420 * Math.sin(Math.PI * Math.min(p * 1.1, 1)); grot -= 540 * easeOut(p)
        gflash = tau < 0.1 ? 1 : 0; gop = 1 - clamp((tau - 0.6) / 0.3)
      }
    }
  }
  // victory hops after the K.O.
  if (ko != null && t > ko + 0.55) { const v = t - ko - 0.55; cy -= 46 * Math.abs(Math.sin(v * 7)); crot = 6 * Math.sin(v * 7) }
  // idle bob + flexes on their names
  const idle = (ph) => 7 * Math.abs(Math.sin(t * 5 + ph))
  const fx = (who) => sc.flex.filter(([, w]) => w === who).reduce((v, [k]) => v + pulse(t - k, 3), 0)
  return { cx, cy: cy - idle(0.6), crot, csq, cs: 1 + 0.14 * fx('c'), gx, gy: gy - (gop < 1 || grot < -60 ? 0 : idle(0)), grot, gflash, gop, gs: 1 + 0.14 * fx('g') }
}
function camAt(t, sc) {
  const span = clamp((t - Math.max(sc.tIn, 0)) / (sc.tOut - Math.max(sc.tIn, 0)))
  let s = lerp(sc.push[0], sc.push[1], smooth(span)), rot = 0, fx = WW / 2, fy = 1180
  for (const [k, kind] of sc.hits) {
    const p = pulse(t - k, kind === 'ko' ? 1.6 : 2.4)
    s += (kind === 'ko' ? 0.16 : 0.08) * p; rot += (kind === 'clash' ? 1.2 : -1.6) * p
    fx = lerp(fx, CONTACT.x + 60, clamp(p * 1.4)); fy = lerp(fy, CONTACT.y + 60, clamp(p * 1.4))
  }
  const ko = sc.hits.find(([, k]) => k === 'ko')?.[0]
  if (ko != null && t > ko + 0.4) { const z = smooth(clamp((t - ko - 0.4) / 0.8)); s += 0.14 * z; fx = lerp(fx, CX0 - 160, z); fy = lerp(fy, FEET - 240, z) }
  return { s, rot, fx, fy }
}
on((t) => {
  const sc = sceneAt(t)
  const vis = sc ? clamp((t - sc.tIn) / 0.22) * (1 - clamp((t - sc.tOut) / 0.2)) : 0
  LF.style.opacity = vis.toFixed(3); LF.style.visibility = vis < 0.003 ? 'hidden' : 'visible'
  koTxt.style.opacity = 0
  if (!sc || vis < 0.003) return
  const P = poseAt(t, sc), C = camAt(t, sc)
  world.style.transformOrigin = `${C.fx.toFixed(1)}px ${C.fy.toFixed(1)}px`
  world.style.transform = `scale(${C.s.toFixed(4)}) rotate(${C.rot.toFixed(2)}deg)`
  // crowd: idle shimmer, cheering after every hit
  const cheer = sc.hits.some(([k]) => t > k && t < k + 0.9) || (sc.hits.some(([k, kind]) => kind === 'ko' && t > k))
  const idleB = Math.floor(t * 5) % 2 === 1
  crowdCv[0].style.opacity = !cheer && !idleB ? 1 : 0
  crowdCv[1].style.opacity = !cheer && idleB ? 1 : 0
  crowdCv[2].style.opacity = cheer ? 1 : 0
  if (cheer) crowdCv[2].style.transform = `translateY(${(-2 * Math.abs(Math.sin(t * 9))).toFixed(1)}px)`
  // fighters
  const place = (el, x, y, rot, s, sq = 1) => { const a = el.s; el.style.transform = `translate(${(x - a.ax * SC).toFixed(1)}px, ${(y - a.h * SC).toFixed(1)}px) rotate(${rot.toFixed(1)}deg) scale(${(s / Math.sqrt(sq)).toFixed(4)}, ${(s * sq).toFixed(4)})` }
  place(BG, P.gx, P.gy, P.grot, P.gs); place(BC, P.cx, P.cy, P.crot, P.cs, P.csq)
  BG.style.opacity = P.gop.toFixed(3)
  BG.style.filter = P.gflash ? `brightness(${(1 + 1.6 * P.gflash).toFixed(2)}) saturate(0.4) drop-shadow(0 10px 0 rgba(0,0,0,0.12))` : 'drop-shadow(0 10px 0 rgba(0,0,0,0.12))'
  const shad = (el, x, y) => { const up = clamp((FEET - y) / 300); el.style.transform = `translate(${(x - 150).toFixed(1)}px, ${(FEET - 26).toFixed(1)}px) scale(${(1 - 0.5 * up).toFixed(3)})`; el.style.opacity = (1 - 0.6 * up).toFixed(3) }
  shad(shG, P.gx + 20, P.gy); shad(shC, P.cx - 10, P.cy); shG.style.opacity = (parseFloat(shG.style.opacity) * P.gop).toFixed(3)
  // impact effects
  const last = sc.hits.filter(([k]) => t >= k).pop()
  const tau = last ? t - last[0] : -1, big = last && last[1] === 'ko' ? 1.5 : 1
  sparks.forEach((sp, i) => {
    const p = tau / 0.5, a = (i / sparks.length) * 2 * Math.PI + 0.3
    sp.style.visibility = tau >= 0 && p < 1 ? 'visible' : 'hidden'
    if (tau < 0 || p >= 1) return
    const r = (30 + 190 * easeOut(p)) * big
    sp.style.transform = `translate(${(CONTACT.x + r * Math.cos(a) - 8).toFixed(1)}px, ${(CONTACT.y + r * Math.sin(a) - 8).toFixed(1)}px) rotate(${(p * 200).toFixed(0)}deg) scale(${(1.4 - p).toFixed(3)})`
  })
  const rp = tau / 0.4
  ringFx.style.opacity = tau >= 0 && rp < 1 ? (0.9 * (1 - rp)).toFixed(3) : 0
  ringFx.style.transform = `translate(${CONTACT.x - 100}px, ${CONTACT.y - 100}px) scale(${(0.3 + 2.2 * easeOut(clamp(rp)) * big).toFixed(3)})`
  // dust: kicked up at take-off and landing of every leap
  dust.forEach((d, i) => {
    const hit = sc.hits[i % sc.hits.length], k = hit[0] + (i < 5 ? -0.18 : 0.45), x0 = i < 5 ? CX0 + 30 : (hit[1] === 'ko' ? CX0 - 220 : CX0)
    const p = (t - k) / 0.7
    d.style.visibility = p > 0 && p < 1 ? 'visible' : 'hidden'
    if (p <= 0 || p >= 1) return
    const dir = (i % 5) - 2
    d.style.opacity = (0.8 * (1 - p)).toFixed(3)
    d.style.transform = `translate(${(x0 + dir * 50 * easeOut(p) - 35).toFixed(1)}px, ${(FEET - 40 - 40 * easeOut(p)).toFixed(1)}px) scale(${(0.5 + 1.1 * easeOut(p)).toFixed(3)})`
  })
  // drifting motes in the light
  motes.forEach((m, i) => {
    const sx = (i * 137) % WW, sy = 500 + ((i * 251) % 1100)
    m.style.transform = `translate(${((sx + t * (10 + (i % 5) * 4)) % WW).toFixed(1)}px, ${(sy - ((t * (8 + (i % 4) * 3)) % 200)).toFixed(1)}px)`
    m.style.opacity = (0.3 + 0.5 * Math.abs(Math.sin(t * 1.3 + i))).toFixed(3)
  })
  // K.O. slam
  const ko = sc.hits.find(([, k]) => k === 'ko')?.[0]
  if (ko != null && t > ko + 0.12) {
    const kv = clamp(S(t - ko - 0.12, 4, 0.5), 0, 1.3)
    koTxt.style.opacity = 1
    koTxt.style.transform = `scale(${(2.4 - 1.4 * kv).toFixed(3)}) rotate(-5deg)`
  }
})
for (const sc of SCENES) sc.hits.forEach(([k, kind]) => {
  cue(k - 0.2, 'whoosh', 0.6); cue(k, kind === 'ko' ? 'stamp' : 'thunk', 1); shake(k, kind === 'ko' ? 18 : 9, 8)
  if (kind === 'ko') cue(k + 0.15, 'success', 0.6)
})

// ---------- 0 hook ROUND 1: "ChatGPT ne Google ko khatam kar diya" (full screen, no face) ----------
// both fighters on screen at frame 0 (thumbnail); ChatGPT flexes on "ChatGPT" (0.0), Google on "Google" (0.9),
// ChatGPT's jump-slash on "khatam" (1.40) = K.O.; the arena fades as the face slides up into the split (2.36)
const L0 = layer('hook')
const hud0 = mk('div', `left:60px;top:240px;width:960px;height:70px`, L0, null, 'abs')
const hpBar = (x, right, inner) => {
  const b = mk('div', `left:${x}px;top:14px;width:370px;height:42px;background:#1C1C1C;padding:5px;box-sizing:border-box;border:3px solid #fff;box-shadow:0 6px 0 rgba(0,0,0,0.25)`, hud0, null, 'abs')
  return mk('div', `width:100%;height:100%;background:${inner};transform-origin:${right ? '100%' : '0'} 50%`, b)
}
const hpG = hpBar(64, false, 'linear-gradient(90deg,#4285F4 0 25%,#EA4335 25% 50%,#FBBC05 50% 75%,#34A853 75%)')
const hpC = hpBar(526, true, '#10A37F')
mk('div', `left:0;top:4px;width:58px;height:58px;border-radius:12px;background:#fff;display:grid;place-items:center;font-size:40px;font-weight:900;border:3px solid #1C1C1C;box-sizing:border-box`, hud0, `<span class="disp" style="background:conic-gradient(#EA4335 0 25%,#FBBC05 0 50%,#34A853 0 75%,#4285F4 0);-webkit-background-clip:text;color:transparent">G</span>`, 'abs')
mk('div', `right:0;top:4px;width:58px;height:58px;border-radius:12px;background:#10A37F;display:grid;place-items:center;border:3px solid #1C1C1C;box-sizing:border-box`, hud0, KNOT(36), 'abs')
mk('div', `left:440px;top:12px;width:80px;text-align:center;${PIX};font-size:26px;line-height:28px;color:#fff;text-shadow:3px 3px 0 #1C1C1C`, hud0, 'ROUND<br>1', 'abs')
on((t) => {
  hpG.style.transform = `scaleX(${(1 - clamp((t - 1.42) / 0.3)).toFixed(3)})`
  hud0.style.opacity = (1 - clamp((t - 2.2) / 0.2)).toFixed(3)
})

// ---------- 1 register your business (concept) ----------
const L1 = layer('register')
const w1 = win(L1, { y: 250, h: 640, title: 'ChatGPT · Business' })
mk('div', `left:40px;top:92px;font-size:22px;color:${MUTED}`, w1, 'concept', 'abs mono')
mk('div', `left:40px;top:126px;font-size:60px;font-weight:800;letter-spacing:-1.5px`, w1, 'Register your business', 'abs disp')
const FIELDS = [['Business name', 3.86], ['Address', 4.0], ['Products', 4.12], ['Website', 4.24]]
const rows1 = FIELDS.map(([f], i) => mk('div', `left:40px;top:${222 + i * 82}px;width:880px;height:68px;border:1.5px solid ${LINE};border-radius:14px;display:flex;align-items:center;padding:0 24px;box-sizing:border-box;font-size:32px;color:${MUTED}`, w1, f, 'abs'))
const btn1 = mk('div', `left:40px;top:558px;height:60px;padding:0 32px;border-radius:30px;background:${INK};color:#fff;font-size:30px;font-weight:700;line-height:60px`, w1, 'Register', 'abs')
FIELDS.forEach(([, k], i) => at(rows1[i], k, 5.0, { dy: 16, sc: 1, blur: 0, cue: 'tick', gain: 0.5 }))
at(btn1, 4.3, 5.0, { dy: 10, sc: 0.9, blur: 0 })
on((t) => {
  const done = t > 4.62
  btn1.style.background = done ? GREEN : INK
  btn1.innerHTML = done ? 'Registered ✓' : 'Register'
  btn1.style.transform = `scale(${(1 - 0.06 * pulse(t - 4.58, 6)).toFixed(3)})`
})
cue(4.6, 'click'); cue(4.66, 'success', 0.5)
at(w1, 2.44, 5.0, { dy: 0, sc: 0.25, blur: 6, sin: SPR.morph, dyOut: -260 })

// ---------- 2-3 chat: customer asks, your business shows up ----------
const L2 = layer('chat')
const w2 = win(L2, { y: 250, h: 660, title: 'ChatGPT' })
const inner = mk('div', 'left:0;top:58px;width:960px;height:602px', w2, null, 'abs')
const Q = 'Lahore mein achhe joote kahan se milte hain?'
const bubble = mk('div', `right:36px;top:34px;max-width:760px;padding:22px 30px;border-radius:30px;background:#F1F0ED;font-size:38px;line-height:50px;font-weight:500`, inner, '', 'abs')
const input = mk('div', `left:36px;top:510px;width:888px;height:68px;border:1.5px solid ${LINE};border-radius:34px;display:flex;align-items:center;padding:0 28px;box-sizing:border-box;font-size:30px;color:${MUTED}`, inner, 'Ask anything', 'abs')
typed(bubble, Q, 6.85, 9.5)
const hello = mk('div', `left:0;top:220px;width:960px;text-align:center;font-size:46px;font-weight:700;color:${INK}`, inner, 'What can I help with?', 'abs disp')
on((t) => {
  bubble.style.visibility = t > 6.7 ? 'visible' : 'hidden'
  input.style.opacity = t < 9.7 ? 1 : 0
  inner.style.transform = `translateY(${(-14 * clamp(S(t - 9.9, 2.4, 1))).toFixed(1)}px)`
  hello.style.opacity = (1 - clamp((t - 6.7) / 0.2)).toFixed(3)
})
cue(7.0, 'key', 0.5); cue(7.6, 'key', 0.5); cue(8.2, 'key', 0.5); cue(8.8, 'key', 0.5); cue(9.4, 'key', 0.5)
// the answer: your business
const ans = mk('div', `left:36px;top:205px;width:888px`, inner, null, 'abs')
mk('div', `font-size:30px;color:${MUTED};margin-bottom:16px`, ans, 'Here is a store near you:')
const biz = mk('div', `border:1.5px solid ${LINE};border-radius:20px;padding:22px 26px;box-sizing:border-box`, ans)
mk('div', `display:flex;align-items:center;gap:16px`, biz, `<div class="emoji" style="font-size:46px">👟</div><div class="disp" style="font-size:40px;font-weight:800">Your Shoe Store</div><div class="mono" style="margin-left:auto;font-size:19px;padding:7px 14px;border-radius:10px;background:${GREEN};color:#fff">your business</div>`)
biz.style.position = 'relative'
const map = mk('div', `right:24px;top:92px;width:220px;height:176px;border-radius:16px;overflow:hidden;background:#E8EFE4`, biz,
  `<svg width="220" height="176" viewBox="0 0 220 176"><g stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"><path d="M-10 60 L230 40"/><path d="M-10 130 L230 150"/><path d="M70 -10 L90 190"/><path d="M160 -10 L140 190"/></g><rect x="100" y="70" width="34" height="34" rx="6" fill="#CFE3C6"/></svg>`, 'abs')
const pin = mk('div', 'left:92px;top:40px;width:36px;height:48px', map, `<svg width="36" height="48" viewBox="0 0 36 48"><path d="M18 46 C18 46 2 28 2 17 A16 16 0 0 1 34 17 C34 28 18 46 18 46Z" fill="${RED}"/><circle cx="18" cy="17" r="6" fill="#fff"/></svg>`, 'abs')
const pinShadow = mk('div', 'left:98px;top:84px;width:24px;height:8px;border-radius:50%;background:rgba(0,0,0,0.25)', map, null, 'abs')
on((t) => {
  const k = 10.98, d = clamp(S(t - k, 3.4, 0.45), 0, 1.25)
  pin.style.transform = `translateY(${(-120 * (1 - d)).toFixed(1)}px)`
  pin.style.opacity = t > k ? 1 : 0
  pinShadow.style.opacity = t > k ? (0.3 + 0.7 * clamp(d)).toFixed(3) : 0
  pinShadow.style.transform = `scale(${(0.4 + 0.6 * clamp(d)).toFixed(3)})`
})
at(map, 10.6, 14.5, { dy: 0, sc: 0.85, blur: 0, sin: SPR.pop })
cue(11.08, 'thunk', 0.5)
const ROWS = [['📍', 'Address', 'Gulberg, Lahore', 10.98], ['🛍️', 'Products', '👟 👞 🥿', 11.82], ['🌐', 'Website', 'yourstore.pk', 12.32]]
ROWS.forEach(([e, k, v, tk]) => {
  const r = mk('div', `display:flex;align-items:center;gap:18px;margin-top:22px;font-size:34px`, biz, `<span class="emoji" style="font-size:34px;width:44px">${e}</span><span style="font-weight:700;width:190px">${k}</span><span style="color:${MUTED}">${v}</span>`)
  at(r, tk - 0.06, 14.5, { dy: 14, sc: 1, blur: 2, cue: 'tick', gain: 0.6 })
})
at(ans, 10.2, 14.5, { dy: 30, sc: 0.98, blur: 3, cue: 'pop', gain: 0.6 })
at(w2, 5.0, 14.5, { dy: 420, sc: 1, blur: 4, sin: SPR.morph, cue: 'whoosh', gain: 0.4 })

// ---------- 4 full face: just like Google ----------
const L4 = layer('like-google')
// explained as an equation: ChatGPT listing = what Google listings were
const c4 = box(L4, `left:60px;top:236px;width:960px;height:170px;display:flex;align-items:center;justify-content:center;gap:34px`, '')
const eqA = mk('div', 'display:flex;align-items:center;gap:16px', c4, `<span style="width:84px;height:84px;border-radius:42px;background:#0D0D0D;display:grid;place-items:center">${KNOT(48)}</span><span class="disp" style="font-size:50px;font-weight:800">ChatGPT</span>`)
const eqB = mk('div', `font-size:70px;font-weight:300;color:${MUTED}`, c4, '=', 'disp')
const eqC = mk('div', 'display:flex;align-items:center;gap:12px', c4, `<span class="disp" style="font-size:56px;font-weight:800;letter-spacing:-1.5px">${GOOGLE}</span><span class="emoji" style="font-size:46px">📍</span>`)
at(c4, 14.6, 20.18, { dy: -30, sc: 0.95, blur: 3, sin: SPR.morph })
at(eqA, 14.62, 20.18, { dy: 0, sc: 0.6, blur: 0, sin: SPR.pop, cue: 'pop', gain: 0.6 })
at(eqB, 15.2, 20.18, { dy: 0, sc: 0.3, blur: 0, sin: SPR.pop, cue: 'tick', gain: 0.6 })
at(eqC, 15.48, 20.18, { dy: 0, sc: 0.6, blur: 0, sin: SPR.pop, cue: 'pop', gain: 0.6 })
const c4b = box(L4, `left:60px;top:422px;height:62px;padding:0 26px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600`, `<span class="emoji">🔍</span> people found you in search`)
at(c4b, 18.24, 20.18, POP)

// ---------- 5 ROUND 2: AI growth vs Google use (the Colosseum fight above, a live comparison graph below) ----------
// The fight runs in the shared arena (SCENES[1]): shield clash on "growth" (21.24), hit on "Google ko use" (22.66),
// K.O. on "kam" (23.72). The graph is a glass UI strip under the fighters: the ChatGPT line climbs from 21.2,
// Google's line falls from 22.6 and bottoms out on the K.O.; each line ends in its team badge.
const L5 = layer('graph')
const GP = { x: 60, y: 1338, w: 960, h: 190 }
const gpanel = mk('div', `left:${GP.x}px;top:${GP.y}px;width:${GP.w}px;height:${GP.h}px;border-radius:26px;background:rgba(18,16,15,0.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,0.14),0 20px 50px -20px rgba(0,0,0,0.6)`, L5, null, 'abs')
mk('div', `left:30px;top:18px;font-size:19px;color:rgba(255,255,255,0.7)`, gpanel, 'Usage trend · AI vs Google', 'abs mono')
mk('div', `right:26px;top:16px;${PIX};font-size:16px;line-height:26px;padding:0 10px;background:${RED};color:#fff`, gpanel, 'ROUND 2', 'abs')
const GW = 730, GH = 104, GXo = 40, GYo = 62
const AIq = `M0 ${GH} C 260 ${GH - 4}, 430 ${GH - 30}, 560 ${GH - 62} S 720 6, ${GW} 4`
const GOq = `M0 6 C 240 8, 420 22, 540 48 S 700 ${GH - 6}, ${GW} ${GH - 2}`
mk('div', `left:${GXo}px;top:${GYo}px;width:${GW}px;height:${GH}px`, gpanel,
  `<svg width="${GW}" height="${GH}" viewBox="0 0 ${GW} ${GH}" style="overflow:visible">
    ${[0, 1, 2].map((i) => `<line x1="0" x2="${GW}" y1="${i * GH / 2}" y2="${i * GH / 2}" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-dasharray="4 8"/>`).join('')}
    <path class="ln go" d="${GOq}" fill="none" stroke="#4285F4" stroke-width="7" stroke-linecap="round" pathLength="1" stroke-dasharray="1" style="filter:drop-shadow(0 0 8px rgba(66,133,244,0.7))"/>
    <path class="ln ai" d="${AIq}" fill="none" stroke="#19C37D" stroke-width="7" stroke-linecap="round" pathLength="1" stroke-dasharray="1" style="filter:drop-shadow(0 0 8px rgba(25,195,125,0.7))"/>
  </svg>`, 'abs')
const badge = (html, bg) => mk('div', `left:0;top:0;width:52px;height:52px;border-radius:26px;background:${bg};display:grid;place-items:center;border:3px solid #fff;box-sizing:border-box;box-shadow:0 6px 16px rgba(0,0,0,0.35)`, gpanel, html, 'abs')
const bAI = badge(KNOT(30), '#10A37F')
const bGO = badge(`<span class="disp" style="font-size:30px;font-weight:900;background:conic-gradient(#EA4335 0 25%,#FBBC05 0 50%,#34A853 0 75%,#4285F4 0);-webkit-background-clip:text;color:transparent">G</span>`, '#fff')
const deltas = [mk('div', `right:26px;top:66px;font-size:24px;font-weight:800;color:#19C37D`, gpanel, '▲ AI', 'abs disp'), mk('div', `right:26px;top:130px;font-size:24px;font-weight:800;color:#6FA0FF`, gpanel, '▼ Google', 'abs disp')]
on((t) => {
  const qa = clamp(S(t - 21.2, 0.85, 1)), qg = smooth(clamp((t - 22.6) / 1.15))
  for (const [cls, q, b] of [['ai', qa, bAI], ['go', qg, bGO]]) {
    const p = gpanel.querySelector('.' + cls)
    p.style.strokeDashoffset = (1 - q).toFixed(4)
    const pt = p.getPointAtLength(p.getTotalLength() * q)
    b.style.transform = `translate(${(GXo + pt.x - 26).toFixed(1)}px, ${(GYo + pt.y - 26).toFixed(1)}px)`
  }
  bAI.style.opacity = t > 21.15 ? 1 : 0
  bGO.style.opacity = 1
  deltas[0].style.opacity = clamp((t - 22.0) / 0.2); deltas[1].style.opacity = clamp((t - 23.75) / 0.2)
})
at(gpanel, 20.4, 24.36, { dy: 60, sc: 0.96, blur: 4, sin: SPR.morph, cue: 'pop', gain: 0.5 })

// ---------- 6 article (animation reference): NBC News, marker on the words ----------
const L6 = layerUnder('article') // drawn behind the face, so the face circle sits on top (animation reference)
const artWrap = mk('div', 'left:40px;top:340px;width:1000px;height:1700px', L6, null, 'abs')
const art = mk('div', 'left:0;top:0;width:1080px;height:3148px;transform-origin:0 0;border-radius:20px', artWrap, null, 'abs')
const artImg = img('assets/shots/nbc_article.jpg', 'left:0;top:0;width:1080px;height:3148px;border-radius:20px', art, 'abs')
const mark = (x, y, w, h, k, dur) => {
  const m = mk('div', `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:6px;background:rgba(229,72,77,0.42);mix-blend-mode:multiply;transform-origin:0 50%`, art, null, 'abs')
  on((t) => { m.style.transform = `scaleX(${clamp((t - k) / dur).toFixed(4)})`; m.style.visibility = t > k ? 'visible' : 'hidden' })
  cue(k + 0.05, 'scratch', 0.5)
}
mark(44, 396, 692, 60, 25.18, 0.45) // "Google-parent Alphabet"
mark(44, 554, 338, 60, 26.98, 0.55) // "$500 billion"
on((t) => {
  const sc = 0.926, scroll = 50 * smooth(clamp((t - 24.6) / 4.6))
  art.style.transform = `translateY(${(-scroll).toFixed(1)}px) scale(${sc})`
})
art.style.boxShadow = '0 18px 50px -20px rgba(40,36,30,0.35)'
art.style.borderRadius = '20px'
at(artWrap, 24.48, 29.44, { dy: 80, sc: 1, blur: 4, cue: 'whoosh', gain: 0.4 })
const credit = mk('div', `left:60px;top:250px;font-size:20px;color:${MUTED}`, L6, 'Source: NBC News · Oct 29, 2026', 'abs mono')
at(credit, 24.6, 29.44, { dy: 0, sc: 1, blur: 0 })

// ---------- 7 not launched yet / leak: coming soon ----------
const L7 = layer('status')
const c7 = box(L7, 'left:60px;top:400px;width:960px;padding:36px 44px 40px;box-sizing:border-box', '')
mk('div', `font-size:24px;color:${MUTED}`, c7, 'ChatGPT business listings', 'mono')
const st1 = mk('div', `display:flex;align-items:center;justify-content:space-between;margin-top:28px;padding:26px 0;border-top:1.5px solid ${LINE}`, c7,
  `<span class="disp" style="font-size:52px;font-weight:800">Launched?</span><span style="display:flex;align-items:center;gap:18px"><span class="no" style="font-size:34px;font-weight:700;color:${RED}">Not yet</span><span class="tg" style="position:relative;width:118px;height:64px;border-radius:32px;background:#DCDAD5"><span class="kn" style="position:absolute;left:6px;top:6px;width:52px;height:52px;border-radius:26px;background:#fff;box-shadow:0 3px 8px rgba(0,0,0,0.2)"></span></span></span>`)
const st2 = mk('div', `padding:26px 0 6px;border-top:1.5px solid ${LINE}`, c7,
  `<div style="display:flex;align-items:center;justify-content:space-between"><span class="disp" style="font-size:52px;font-weight:800">Leak says</span><span style="font-size:34px;font-weight:700;color:#8A5A00">coming soon <span class="emoji">⏳</span></span></div>
   <div style="margin-top:22px;height:18px;border-radius:9px;background:#F1F0ED;overflow:hidden"><div class="bar" style="width:100%;height:100%;border-radius:9px;background:#F5B700;transform-origin:0 50%"></div></div>`)
on((t) => {
  // the switch tries to turn on (30.36 "nahi") and snaps back off
  const tryOn = pulse(t - 30.2, 3.2)
  st1.querySelector('.kn').style.transform = `translateX(${(40 * tryOn).toFixed(1)}px)`
  const no = st1.querySelector('.no')
  no.style.opacity = clamp((t - 30.36) / 0.12)
  no.style.transform = `translateX(${(6 * Math.sin((t - 30.36) * 50) * clamp(1 - (t - 30.36) / 0.3) * (t > 30.36 ? 1 : 0)).toFixed(1)}px)`
  st2.querySelector('.bar').style.transform = `scaleX(${(0.72 * clamp(S(t - 31.5, 0.8, 1))).toFixed(4)})`
})
cue(30.22, 'click', 0.6); cue(30.4, 'tick')
at(st2, 31.3, 33.32, { dy: 18, sc: 1, blur: 2, cue: 'pop', gain: 0.6 })
slide(c7, 29.5, 33.3, -1100, 'swish')

// ---------- 8 claim first, get the benefit ----------
const L8 = layer('claim')
const c8 = box(L8, 'left:60px;top:320px;width:960px;padding:30px 36px 34px;box-sizing:border-box', '')
mk('div', `font-size:24px;color:${MUTED};margin-bottom:10px`, c8, 'Who claims first?', 'mono')
const BIZ = [['Your Business', true], ['Store #2', false], ['Store #3', false]]
const rows8 = BIZ.map(([n, me], i) => {
  const r = mk('div', `display:flex;align-items:center;gap:20px;padding:24px 0;border-top:${i ? `1.5px solid ${LINE}` : 'none'}`, c8,
    `<span style="width:56px;height:56px;border-radius:14px;background:${me ? '#E7F6F1' : '#F1F0ED'};display:grid;place-items:center;font-size:26px;font-weight:800;color:${me ? GREEN : MUTED}">${i + 1}</span>
     <span class="disp" style="font-size:46px;font-weight:${me ? 800 : 600};color:${me ? INK : MUTED}">${n}</span>
     <span class="b" style="margin-left:auto;font-size:28px;font-weight:700;padding:10px 22px;border-radius:24px;${me ? `background:${INK};color:#fff` : `background:#F1F0ED;color:${MUTED}`}">${me ? 'Claim' : 'not claimed'}</span>`)
  r.me = me
  return r
})
on((t) => {
  const b = rows8[0].querySelector('.b'), done = t > 34.8
  b.innerHTML = done ? 'Claimed ✓' : 'Claim'
  b.style.background = done ? GREEN : INK
  b.style.transform = `scale(${(1 - 0.07 * pulse(t - 34.76, 6)).toFixed(3)})`
})
cue(34.78, 'click'); cue(34.84, 'success', 0.5)
const win8 = mk('div', `left:60px;top:${320 + 450}px;height:84px;padding:0 30px;border-radius:40px;background:${GREEN};color:#fff;display:flex;align-items:center;gap:14px;font-size:34px;font-weight:800;${SHADOW}`, L8, '<span class="emoji">🏆</span> First to claim gets the benefit', 'abs disp')
at(win8, 35.5, 36.9, POP)
at(c8, 33.44, 36.9, { dy: 0, sc: 0.96, blur: 0, sin: SPR.morph })
rows8.forEach((r, i) => slide(r, 33.5 + 0.1 * i, null, -90, i ? null : 'tick'))
const cursor = mk('div', 'left:0;top:0;width:44px;height:54px', L8, `<svg width="44" height="54" viewBox="0 0 22 27"><path d="M1 1 L1 21 L6 16 L9.5 24 L13 22.5 L9.5 15 L16 15 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`, 'abs')
on((t) => {
  const a = smooth(clamp((t - 34.2) / 0.5)), b = smooth(clamp((t - 35.2) / 0.4))
  const x = lerp(lerp(760, 900, a), 1080, b), y = lerp(lerp(880, 440, a), 900, b)
  const press = 1 - 0.18 * pulse(t - 34.76, 6)
  cursor.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${press.toFixed(3)})`
  cursor.style.opacity = t > 34.15 && t < 35.6 ? clamp((t - 34.15) / 0.1) : 0
})

// ---------- 9 how-to when it launches ----------
const L9 = layer('howto')
const c9 = box(L9, 'left:60px;top:330px;width:960px;height:470px;padding:36px 40px 40px;box-sizing:border-box', `
  <div class="mono" style="font-size:24px;color:${MUTED}">The day it launches <span class="emoji">🚀</span></div>`)
const title9 = mk('div', 'font-size:64px;font-weight:800;letter-spacing:-1.5px;line-height:74px;margin-top:14px;min-height:148px', c9, '', 'disp')
typed(title9, 'How to register your business on ChatGPT', 37.1, 38.5)
cue(37.2, 'key', 0.4); cue(37.6, 'key', 0.4); cue(38.0, 'key', 0.4); cue(38.4, 'key', 0.4)
const track9 = mk('div', `left:40px;top:330px;width:880px;height:90px`, c9, `<svg width="880" height="90" viewBox="0 0 880 90"><line x1="60" y1="30" x2="820" y2="30" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/><line class="ln" x1="60" y1="30" x2="820" y2="30" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1"/></svg>`, 'abs')
const nodes9 = [0, 1, 2].map((i) => mk('div', `left:${60 + i * 380 - 26}px;top:4px;width:52px;height:52px;border-radius:26px;background:#fff;border:5px solid ${LINE};box-sizing:border-box;display:grid;place-items:center;font-size:22px;font-weight:800;color:${MUTED}`, track9, String(i + 1), 'abs mono'))
;[0, 1, 2].forEach((i) => mk('div', `left:${60 + i * 380 - 60}px;top:64px;width:120px;text-align:center;font-size:20px;color:${MUTED}`, track9, `Step ${i + 1}`, 'abs mono'))
on((t) => {
  const p = clamp((t - 39.9) / 1.1)
  track9.querySelector('.ln').style.strokeDashoffset = (1 - p).toFixed(4)
  nodes9.forEach((n, i) => {
    const lit = p >= i / 2 - 0.001 && t > 39.9
    n.style.borderColor = lit ? GREEN : LINE
    n.style.background = lit ? GREEN : '#fff'
    n.style.color = lit ? '#fff' : MUTED
  })
})
;[39.92, 40.47, 41.02].forEach((k) => cue(k, 'tick', 0.6))
at(c9, 37.0, 41.56, { dy: 0, sc: 0.9, blur: 4, sin: SPR.morph, cue: 'pop', gain: 0.5 })

// ---------- 10 CTA: the real talhareviews.ai profile + Like / Follow ----------
// profile screenshot (1179x490) slides in; ring pulses on the logo on "Talha Reviews" (42.7); heart bursts on
// "like" (42.12); Follow is tapped to Following on "follow" (43.42)
const L10 = layer('cta')
const PW = 960, PH = Math.round(490 * PW / 1179)
const prof = mk('div', `left:60px;top:300px;width:${PW}px;height:${PH}px;border-radius:28px;overflow:hidden;background:#0D1117;box-shadow:0 26px 60px -24px rgba(0,0,0,0.55)`, L10, null, 'abs')
img('assets/shots/profile.png', `left:0;top:0;width:${PW}px;height:${PH}px`, prof, 'abs')
const pring = mk('div', `left:${60 + 178 * PW / 1179 - 128}px;top:${300 + 330 * PW / 1179 - 128}px;width:256px;height:256px;border-radius:128px;border:6px solid #3897F0;box-sizing:border-box`, L10, null, 'abs')
on((t) => {
  const p = clamp((t - 42.7) / 0.7)
  pring.style.opacity = t > 42.7 && p < 1 ? (0.9 * (1 - p)).toFixed(3) : 0
  pring.style.transform = `scale(${(1 + 0.25 * easeOut(p)).toFixed(3)})`
})
slide(prof, 41.58, null, 1100, 'swish')
const btnRow = mk('div', `left:60px;top:${300 + PH + 26}px;width:${PW}px;height:84px;display:flex;gap:18px`, L10, null, 'abs')
const likeBtn = mk('div', `width:300px;height:84px;border-radius:20px;background:#fff;display:flex;align-items:center;justify-content:center;gap:14px;font-size:34px;font-weight:800;color:${INK};${SHADOW}`, btnRow, '<span class="heart emoji" style="display:inline-block;font-size:40px">🤍</span><span class="disp">Like</span>')
const folBtn = mk('div', `flex:1;height:84px;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;${SHADOW}`, btnRow, '', 'disp')
at(btnRow, 41.75, null, { dy: 40, sc: 0.96, blur: 2, sin: SPR.morph, cue: 'pop', gain: 0.5 })
on((t) => {
  const liked = t > 42.12, h = likeBtn.querySelector('.heart')
  h.textContent = liked ? '❤️' : '🤍'
  h.style.transform = `scale(${(1 + 0.45 * pulse(t - 42.12, 4)).toFixed(3)})`
  likeBtn.style.transform = `scale(${(1 - 0.05 * pulse(t - 42.08, 6)).toFixed(3)})`
  const f = t > 43.44
  folBtn.textContent = f ? 'Following ✓' : 'Follow'
  folBtn.style.background = f ? '#EFEFEF' : '#3897F0'
  folBtn.style.color = f ? INK : '#fff'
  folBtn.style.transform = `scale(${(1 - 0.05 * pulse(t - 43.4, 6)).toFixed(3)})`
})
cue(42.12, 'pop'); cue(42.72, 'tick', 0.6); cue(43.42, 'click'); cue(43.48, 'success', 0.5)
const HX = 60 + 150 - 50, HY = 300 + PH + 26 + 42
const hearts = Array.from({ length: 8 }, () => mk('div', 'left:0;top:0;font-size:30px', L10, '❤️', 'abs emoji'))
on((t) => hearts.forEach((h, i) => {
  const p = (t - 42.14) / 0.7, a = (i / 8) * 2 * Math.PI - Math.PI / 2
  h.style.visibility = p > 0 && p < 1 ? 'visible' : 'hidden'
  if (p <= 0 || p >= 1) return
  const r = 30 + 100 * easeOut(p)
  h.style.opacity = (1 - p).toFixed(3)
  h.style.transform = `translate(${(HX + r * Math.cos(a) - 15).toFixed(1)}px, ${(HY + r * Math.sin(a) - 15).toFixed(1)}px) scale(${(1 - 0.4 * p).toFixed(3)})`
}))
// a finger-tap cursor on Follow
const tap = mk('div', 'left:0;top:0;width:44px;height:54px', L10, `<svg width="44" height="54" viewBox="0 0 22 27"><path d="M1 1 L1 21 L6 16 L9.5 24 L13 22.5 L9.5 15 L16 15 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`, 'abs')
on((t) => {
  const a = smooth(clamp((t - 43.0) / 0.4))
  const x = lerp(900, 700, a), y = lerp(900, HY - 6, a)
  tap.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(1 - 0.18 * pulse(t - 43.42, 6)).toFixed(3)})`
  tap.style.opacity = t > 42.95 ? clamp((t - 42.95) / 0.1) : 0
})

// ---------- captions: Roman Urdu, 2-3 words, mono uppercase on the seam ----------
captions([
  [0.0, 0.72, 'ChatGPT ne'],
  [0.72, 1.4, 'Google ko'],
  [1.4, 2.4, 'khatam kar diya'],
  [2.48, 3.48, 'ab aap ChatGPT'],
  [3.48, 4.22, 'mein apna business'],
  [4.22, 5.02, 'register kar sakenge'],
  [5.06, 5.76, 'matlab agar koi'],
  [5.76, 6.76, 'customer ChatGPT pe'],
  [6.76, 7.6, 'search karta hai'],
  [7.6, 8.54, 'ke Lahore mein'],
  [8.54, 9.16, 'achhe joote'],
  [9.16, 9.84, 'kahan se milte hain'],
  [9.84, 10.7, 'to usko aapka'],
  [10.7, 11.48, 'business address'],
  [11.48, 12.32, 'aapke products'],
  [12.32, 13.04, 'aur website'],
  [13.04, 13.84, 'wahan ChatGPT mein'],
  [13.84, 14.58, 'nazar aayenge'],
  [14.58, 15.5, 'same waise hi jaise'],
  [15.5, 16.3, 'Google mein apna'],
  [16.3, 17.46, 'business register karte the'],
  [17.56, 18.28, 'aur Google pe'],
  [18.28, 18.94, 'search karne pe'],
  [18.94, 20.0, 'logon ko nazar aata tha'],
  [20.24, 20.9, 'aur AI ki'],
  [20.9, 21.8, 'isi fast growth'],
  [21.8, 22.66, 'ki wajah se logon ne'],
  [22.66, 23.38, 'Google ko use'],
  [23.38, 24.4, 'karna hi kam kar diya'],
  [24.5, 25.5, 'jiski wajah se Google ko'],
  [25.66, 26.74, 'is saal share market mein'],
  [26.74, 28.42, '500 billion dollars'],
  [28.42, 29.3, 'ka nuqsaan hua hai'],
  [29.54, 30.08, 'abhi ye feature'],
  [30.08, 30.98, 'launch nahi hua'],
  [31.1, 31.72, 'lekin leak ke'],
  [31.72, 32.52, 'mutabiq bohat'],
  [32.52, 33.3, 'jald aane wala hai'],
  [33.46, 33.88, 'aur jo log'],
  [33.88, 34.4, 'pehle apna'],
  [34.4, 35.4, 'business claim karenge'],
  [35.56, 36.5, 'faida bhi unhi ko milega'],
  [37.0, 37.86, 'aur agar aap chahte hain'],
  [37.86, 38.42, 'ke jaise hi'],
  [38.42, 38.98, 'ye update aaye'],
  [39.0, 39.74, 'main aapko bataun'],
  [39.74, 40.34, 'ke kis tarah'],
  [40.34, 41.5, 'apna business register karna hai'],
  [41.6, 42.1, 'to video ko'],
  [42.1, 42.7, 'like karke'],
  [42.7, 43.42, 'Talha Reviews ko'],
  [43.42, 44.14, 'follow kar lo'],
])
