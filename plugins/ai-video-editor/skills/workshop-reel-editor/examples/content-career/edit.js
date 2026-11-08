// Content Career: 37s Urdu/English talking head (16:9 source). "Can you really make a reliable career out of
// content?" Don't go for videos only; you need backing. The Junejo model: main business, then create, then
// monetize. It's a long road, not as convenient as it looks.
//
// Direction: same system as the previous reels (flat warm grey stage, white cards, pixel 2D characters with thick
// outlines, mono uppercase captions on a dark box, springy entrances, camera moves). New cast for this topic: a pixel
// creator (glasses, wavy hair, goatee, hoodie) with jointed arms and legs, play-tiles, a bridge, buildings, coins.
// The footage stays 16:9 and is NEVER cropped: it is shown whole (1920x1080 frames scaled to fit) in layouts that
// move around it: FOOT (footage under the graphics), TOP (footage on top), CARD (inset card), OFF (full-screen scenes).
// Safe area: graphics x 60-1020, y 230-1520; captions never below 1460.
//
//  time        layout  scene                                                        lands on
//  0.0-3.6     FOOT    creator on a wobbly tower of video tiles, "?" on career     career 2.38
//  3.6-6.6     TOP     tangled path from START to the flag: a tricky question      tricky 5.09
//  6.6-14.2    OFF     bridge: one plank labelled ONLY VIDEOS over a gap to the     never 8.89, wise 9.99,
//                      CAREER castle; it wobbles, warning, then cracks              only 11.59, career 13.83
// 14.2-16.4    FOOT    the same bridge shrinks into a card; pillars rise: BACKING   backing 15.71
// 16.4-23.5    CARD    businesses rise and settle on a CONTENT foundation          businesses 19.33, content 23.19
// 23.5-31.0    OFF     the Junejo model: walk from 1 main business, 2 create,      business 26.27, create 27.15,
//                      to 3 monetize (coins rain)                                   monetize 30.41
// 31.0-34.8    OFF     a long road to the horizon, camera pulls back              long road 33.13
// 34.8-36.8    FOOT    creator pushing a boulder uphill                           convenient 35.73

const W = 1080, H = 1920
const FW = 1920, FH = 1080 // source frame
const fit = (x, y, w) => { const s = w / FW; return { x, y, w, h: Math.round(FH * s), s, fx: w / 2, fy: Math.round(FH * s) / 2 } }
reel({
  name: 'content_career',
  duration: META.duration,
  face: { frames: META.faceFrames, focus: { x: FW / 2, y: FH / 2 }, headHeight: 500 },
  theme: { accent: '#E5484D', ink: '#1C1B19' },
  seamShadow: 0,
  capShow: { dy: 0, dyOut: 0, sc: 1, blur: 0, sin: { f: 30, z: 1 }, sout: { f: 30, z: 1 } },
  captionY: { FOOT: 860, TOP: 874, CARD: 932, OFF: 1400 },
  layouts: {
    FOOT: { ...fit(0, 930, W), r: 0 },               // whole 16:9 frame under the graphics (y 930-1538)
    TOP: { ...fit(0, 240, W), r: 0 },                // whole frame on top (y 240-848)
    CARD: { ...fit(90, 1006, 900), r: 30 },           // inset card (y 1006-1512), graphics above
    OFF: { ...fit(0, 2010, W), r: 0 },               // below the screen: full-screen scenes
  },
})
const INK = '#1C1B19', MUTED = '#77746E', LINE = '#E6E4DF', RED = '#E5484D', GREEN = '#22A06B', GOLD = '#F2B705'
const SHADOW = 'box-shadow:0 1px 0 rgba(0,0,0,0.04),0 18px 40px -18px rgba(40,36,30,0.28)'
const PIX = "font-family:'Silkscreen',monospace"
const easeIn = (x) => x * x * x, easeOut = (x) => 1 - Math.pow(1 - x, 3)

faceAt([
  [-1, 'FOOT'],
  [4.9, 'TOP'],
  [6.5, 'OFF'],
  [14.2, 'FOOT'],
  [16.4, 'CARD'],
  [23.45, 'OFF'],
  [34.75, 'FOOT'],
])

// ---------- pixel kit ----------
const K = '#1C1B19'
function pixRects(rows, pal, u, ox = 0, oy = 0) {
  let r = ''
  rows.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.' && pal[ch]) r += `<rect x="${ox + x * u}" y="${oy + y * u}" width="${u + 0.6}" height="${u + 0.6}" fill="${pal[ch]}"/>` }))
  return r
}
// a pixel sprite; x, y = bottom centre
function sprite(parent, rows, pal, u, css = '') {
  const w = rows[0].length * u, h = rows.length * u
  const el = mk('div', `left:0;top:0;width:${w}px;height:${h}px;transform-origin:${w / 2}px ${h}px;${css}`, parent, `<svg width="${w}" height="${h}" shape-rendering="crispEdges" style="overflow:visible">${pixRects(rows, pal, u)}</svg>`, 'abs')
  el.w = w; el.h = h
  el.at = (x, y, { s = 1, rot = 0, op = 1 } = {}) => {
    el.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(y - h).toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(4)})`
    el.style.opacity = op
    el.style.visibility = op < 0.003 ? 'hidden' : 'visible'
  }
  return el
}
const PAL = { K, W: '#FFFFFF', R: RED, r: '#B9363A', Y: GOLD, y: '#C99400', G: '#5DBB63', g: '#3E8E47', B: '#4A90D9', b: '#2F6DB0', S: '#C9B79C', s: '#A8957A', T: '#8B5A3C', t: '#6B4229', L: '#D8EEF7', D: '#3A3D45', d: '#2A2C33', H: '#2B1D16', F: '#E2A77F', f: '#C98A63', P: '#2F3542', O: '#F4F1EA' }
const ART = {
  play: ['KKKKKKKKKK', 'KRRRRRRRRK', 'KRRRWRRRRK', 'KRRRWWRRRK', 'KRRRWWWRRK', 'KRRRWWRRRK', 'KRRRWRRRRK', 'KrrrrrrrrK', 'KKKKKKKKKK'],
  coin: ['..KKKK..', '.KYYYYK.', 'KYYWYYyK', 'KYWYYYyK', 'KYYYYYyK', 'KYYYYyyK', '.KyyyyK.', '..KKKK..'],
  flag: ['K.......', 'KKKKKKK.', 'KRRRRRK.', 'KRRRRRRK', 'KRRRRRK.', 'KKKKKKK.', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......', 'KK......'],
  shop: [
    '....KKKKKKKKKKKK....', '...KRWRWRWRWRWRWK...', '..KRWRWRWRWRWRWRWK..', '.KKKKKKKKKKKKKKKKKK.', '..KOOOOOOOOOOOOOOK..', '..KOKKKKOOOOKKKKOK..',
    '..KOKLLKOOOOKLLKOK..', '..KOKLLKOOOOKLLKOK..', '..KOKKKKOOOOKKKKOK..', '..KOOOOOOOOOOOOOOK..', '..KOOOOOKKKKOOOOOK..', '..KOOOOOKTTKOOOOOK..',
    '..KOOOOOKTTKOOOOOK..', '..KOOOOOKTYKOOOOOK..', '..KOOOOOKTTKOOOOOK..', '..KKKKKKKKKKKKKKKK..'],
  office: [
    '..KKKKKKKKKK..', '..KBBBBBBBBK..', '..KBLLBBLLBK..', '..KBLLBBLLBK..', '..KBBBBBBBBK..', '..KBLLBBLLBK..', '..KBLLBBLLBK..', '..KBBBBBBBBK..',
    '..KBLLBBLLBK..', '..KBLLBBLLBK..', '..KBBBBBBBBK..', '..KBBBKKBBBK..', '..KBBBKTKBBK..', '..KKKKKKKKKK..'],
  camera: ['...KKK....', 'KKKKKKKKKK', 'KDDDDDDDDK', 'KDDKKKDDDK', 'KDKLLLKDRK', 'KDKLBLKDDK', 'KDKLLLKDDK', 'KDDKKKDDDK', 'KDDDDDDDDK', 'KKKKKKKKKK', '....KK....', '....KK....', '...K..K...', '..K....K..', '.K......K.'],
  castle: [
    'KK.KK.KK....KK.KK.KK', 'KSKKSKKSK..KSKKSKKSK', 'KSSSSSSSK..KSSSSSSSK', 'KSsSSSsSK..KSsSSSsSK', 'KSSSSSSSKKKKSSSSSSSK', 'KSSKKSSSSSSSSSSKKSSK',
    'KSSKLSSSSSSSSSSKLSSK', 'KSSKKSSSSSSSSSSKKSSK', 'KSSSSSSSKKKKSSSSSSSK', 'KSsSSSSKTTTTKSSSSsSK', 'KSSSSSSKTTTTKSSSSSSK', 'KSSSSSSKTTTTKSSSSSSK', 'KKKKKKKKKKKKKKKKKKKK'],
  rock: ['...KKKKKK...', '..KSSSSSSKK.', '.KSSSsSSSSSK', 'KSSSSSSSSsSK', 'KSsSSSSSSSSK', 'KSSSSSSsSSSK', 'KKKKKKKKKKKK'],
  cloud: ['....KKKK......', '..KKWWWWKKK...', '.KWWWWWWWWWKK.', 'KWWWWWWWWWWWWK', 'KKKKKKKKKKKKKK'],
}
// the creator: glasses, wavy hair, goatee, hoodie; arms and legs rotate about their joints. x, y = between the feet
const CREATOR_BODY = [
  '...KKKKKKKK...', '..KHHHHHHHHK..', '.KHHHHHHHHHHK.', '.KHHHHHHHHHHK.', '.KHFFFFFFFFHK.', '.KFKKKFFKKKFK.', '.KFKLKKKKLKFK.', '.KFKKKFFKKKFK.',
  '.KFFFFFFFFFFK.', '.KFFFHHHHFFFK.', '..KFFHKKHFFK..', '...KFHHHHFK...', '..KKKKFFKKKK..', '.KDDDDKKDDDDK.', '.KDDDDDDDDDDK.', '.KDDDDRRDDDDK.',
  '.KDDDDRWDDDDK.', '.KDDDDDDDDDDK.', '.KKKKKKKKKKKK.']
const ARM = ['KKKK', 'KDDK', 'KDDK', 'KDDK', 'KDDK', 'KFFK', 'KKKK']
const LEG = ['KKKK', 'KPPK', 'KPPK', 'KPPK', 'KKKK', 'KKKKK']
function creator(parent, u = 9) {
  const w = 14 * u, h = 24 * u
  const g = (rows, cls, px, py) => `<g class="${cls}" data-px="${px}" data-py="${py}">${pixRects(rows, PAL, u, px - 2 * u, py)}</g>`
  const el = mk('div', `left:0;top:0;width:${w}px;height:${h}px;transform-origin:${w / 2}px ${h}px`, parent,
    `<svg width="${w}" height="${h}" shape-rendering="crispEdges" style="overflow:visible">
      ${g(LEG, 'legL', 4.5 * u, 18.5 * u)}${g(LEG, 'legR', 9.5 * u, 18.5 * u)}
      ${pixRects(CREATOR_BODY, PAL, u)}
      ${g(ARM, 'armL', 0.6 * u, 12.6 * u)}${g(ARM, 'armR', 13.4 * u, 12.6 * u)}
      <g class="sweat" opacity="0"><rect x="${13 * u}" y="${3 * u}" width="${u}" height="${1.6 * u}" fill="#7CC4F2"/><rect x="${14.4 * u}" y="${5.6 * u}" width="${u * 0.8}" height="${1.3 * u}" fill="#7CC4F2"/></g>
    </svg>`, 'abs')
  const part = (c) => el.querySelector('.' + c)
  const P = { legL: part('legL'), legR: part('legR'), armL: part('armL'), armR: part('armR'), sweat: part('sweat') }
  el.w = w; el.h = h; el.u = u
  el.set = ({ x, y, s = 1, flip = 1, rot = 0, armL = 0, armR = 0, legL = 0, legR = 0, op = 1, sweat = 0 }) => {
    el.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(y - h).toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${(s * flip).toFixed(4)}, ${s.toFixed(4)})`
    el.style.opacity = op
    el.style.visibility = op < 0.003 ? 'hidden' : 'visible'
    for (const [k, a] of [['legL', legL], ['legR', legR], ['armL', armL], ['armR', armR]]) {
      const n = P[k]
      n.setAttribute('transform', `rotate(${a.toFixed(1)} ${n.dataset.px} ${n.dataset.py})`)
    }
    P.sweat.setAttribute('opacity', sweat)
  }
  return el
}
// walk cycle helper: returns limb angles for a phase
const walk = (t, on = 1, speed = 9) => { const a = Math.sin(t * speed) * 26 * on; return { legL: a, legR: -a, armL: -a * 0.8, armR: a * 0.8, bob: Math.abs(Math.sin(t * speed)) * 6 * on } }
// a pixel sky/ground backdrop inside a box
function landscape(parent, w, h, groundY, { sky = ['#CDEBF8', '#FFF4E0'], ground = '#8FD07E', groundDark = '#5DA357' } = {}) {
  const root = mk('div', `left:0;top:0;width:${w}px;height:${h}px;overflow:hidden;background:linear-gradient(${sky[0]}, ${sky[1]})`, parent, null, 'abs')
  mk('div', `left:${w * 0.72}px;top:${groundY * 0.18}px;width:120px;height:120px;border-radius:60px;background:radial-gradient(circle, #FFF6D2 0 45%, rgba(255,246,210,0) 70%)`, root, null, 'abs')
  mk('div', `left:-10%;top:${groundY - 120}px;width:70%;height:240px;border-radius:50%;background:#B9E1A9`, root, null, 'abs')
  mk('div', `left:45%;top:${groundY - 90}px;width:80%;height:200px;border-radius:50%;background:#A6D896`, root, null, 'abs')
  mk('div', `left:0;top:${groundY}px;width:${w}px;height:${h - groundY}px;background:${ground};border-top:8px solid ${groundDark}`, root, null, 'abs')
  mk('div', `left:0;top:${groundY + 8}px;width:${w}px;height:${h - groundY}px;background:radial-gradient(${groundDark} 2px, transparent 2.5px) 0 0/34px 30px;opacity:0.45`, root, null, 'abs')
  return root
}
const tag = (parent, html, css = '') => mk('div', `left:0;top:0;height:54px;padding:0 20px;border-radius:12px;background:${INK};color:#fff;${PIX};font-size:24px;line-height:54px;white-space:nowrap;box-shadow:0 6px 0 rgba(0,0,0,0.18);${css}`, parent, html, 'abs')
const sceneCard = (parent, x, y, w, h) => mk('div', `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:26px;overflow:hidden;background:#fff;${SHADOW}`, parent, null, 'abs')
const vis = (el, t, a, b, f = 0.2) => { const v = clamp((t - a) / f) * (1 - clamp((t - b) / f)); el.style.opacity = v.toFixed(3); el.style.visibility = v < 0.003 ? 'hidden' : 'visible'; return v }
const popS = (t, k) => clamp(S(t - k, SPR.pop.f, SPR.pop.z), 0, 1.3)

// ---------- 1 hook: a wobbly tower of videos (FOOT) ----------
const L1 = layer('tower')
const c1 = sceneCard(L1, 60, 240, 960, 590)
landscape(c1, 960, 590, 500)
const tiles1 = Array.from({ length: 5 }, () => sprite(c1, ART.play, PAL, 8))
const cr1 = creator(c1, 7)
const bub1 = mk('div', `left:0;top:0;width:110px;height:100px;border-radius:22px;background:#fff;border:6px solid ${K};box-sizing:border-box;display:grid;place-items:center;${PIX};font-size:64px;color:${RED}`, c1, '?', 'abs')
const tag1 = tag(c1, 'ONLY CONTENT', `background:${RED}`)
on((t) => {
  if (vis(L1, t, -1, 4.85) < 0.003) return
  const sway = 2.2 * Math.sin(t * 2.4) * (1 + 0.6 * clamp((t - 2.3) / 1))
  const base = { x: 420, y: 510 }
  tiles1.forEach((el, i) => {
    const a = popS(t, -0.4 + 0.08 * i)
    const off = (i + 1) * sway * 0.6
    el.at(base.x + off * 1.2, base.y - i * 66, { rot: sway * (i + 1) * 0.35, s: a })
  })
  const topY = base.y - 5 * 66, topX = base.x + 6 * sway * 0.72
  const nerv = Math.sin(t * 7) * 6 * clamp((t - 2.3) / 0.5)
  cr1.set({ x: topX, y: topY + 2, rot: sway * 2.2, armL: 70 + nerv, armR: -70 - nerv, s: popS(t, 0.0) })
  const q = popS(t, 2.36)
  bub1.style.transform = `translate(${(topX + 70).toFixed(1)}px, ${(topY - 230).toFixed(1)}px) scale(${q.toFixed(3)}) rotate(${(6 * Math.sin(t * 4)).toFixed(1)}deg)`
  bub1.style.opacity = t > 2.36 ? 1 : 0
  tag1.style.transform = `translate(600px, 120px) scale(${popS(t, 3.08).toFixed(3)})`
  tag1.style.opacity = t > 3.08 ? 1 : 0
})
cue(0.05, 'pop', 0.6); cue(2.38, 'pop'); cue(3.1, 'tick')

// ---------- 2 tricky question: a tangled path (TOP) ----------
const L2 = layer('tricky')
const c2 = sceneCard(L2, 60, 950, 960, 540)
landscape(c2, 960, 540, 430, { sky: ['#F7EEDF', '#FFF9EF'], ground: '#E9D3A8', groundDark: '#CDB07D' })
const TANGLE = 'M90 380 C 200 380, 220 200, 320 220 S 420 420, 470 300 S 380 120, 520 140 S 660 380, 600 300 S 700 160, 780 250 S 840 380, 870 320'
mk('div', 'left:0;top:0;width:960px;height:540px', c2, `<svg width="960" height="540"><path d="${TANGLE}" fill="none" stroke="${K}" stroke-width="16" stroke-linecap="round" stroke-dasharray="1" pathLength="1" class="tg"/><path d="${TANGLE}" fill="none" stroke="#F4F1EA" stroke-width="6" stroke-linecap="round" stroke-dasharray="0.02 0.02" pathLength="1" class="tg2"/></svg>`, 'abs')
const flag2 = sprite(c2, ART.flag, PAL, 8)
const cr2 = creator(c2, 7)
const qs2 = [0, 1, 2].map(() => mk('div', `left:0;top:0;${PIX};font-size:48px;color:${RED};text-shadow:3px 3px 0 ${K}`, c2, '?', 'abs'))
on((t) => {
  if (vis(L2, t, 4.85, 6.55) < 0.003) return
  const p = clamp((t - 5.0) / 1.3)
  c2.querySelectorAll('.tg').forEach((e) => { e.style.strokeDashoffset = (1 - easeOut(p)).toFixed(4) })
  c2.querySelector('.tg2').style.opacity = p > 0.98 ? 1 : 0
  flag2.at(880, 330, { s: popS(t, 6.0) })
  const think = 150 + 15 * Math.sin(t * 6)
  cr2.set({ x: 100, y: 432, armR: -think, armL: 10, rot: 3 * Math.sin(t * 3) })
  qs2.forEach((q, i) => {
    const k = 5.2 + i * 0.25, a = popS(t, k)
    q.style.transform = `translate(${[330, 520, 700][i]}px, ${[150, 70, 170][i] - 10 * Math.sin(t * 4 + i)}px) scale(${a.toFixed(3)})`
    q.style.opacity = t > k ? 1 : 0
  })
})
cue(5.1, 'whoosh', 0.5); [5.2, 5.45, 5.7].forEach((k) => cue(k, 'tick', 0.6)); cue(6.0, 'pop', 0.6)

// ---------- 3-4 the bridge: ONLY VIDEOS (OFF, full screen) -> BACKING (shrinks into a card, FOOT) ----------
// world 1080x1920, cliffs top at y 1180; at 14.2 the whole scene scales into the card above the footage
const L3 = layer('bridge')
const wb = mk('div', `left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0`, L3, null, 'abs')
const GY = 1180
landscape(wb, W, H, 2000, { sky: ['#BFE2F6', '#FFF1DA'] })
const clouds3 = [[120, 640, 1], [640, 560, 1.3], [380, 780, 0.8]].map(([x, y, s]) => { const c = sprite(wb, ART.cloud, PAL, 10); c.base = [x, y, s]; return c })
const cliff = (x, w) => mk('div', `left:${x}px;top:${GY}px;width:${w}px;height:${H - GY}px;background:linear-gradient(#9C8A70, #6E5F4B);border:8px solid ${K};border-bottom:none;box-sizing:border-box;box-shadow:inset 0 22px 0 #7FC26F`, wb, null, 'abs')
mk('div', `left:300px;top:${GY + 20}px;width:480px;height:${H - GY}px;background:linear-gradient(#5B4A3A, #1E1813)`, wb, null, 'abs')
cliff(-8, 330); cliff(750, 340)
const castle = sprite(wb, ART.castle, PAL, 12)
const flagC = sprite(wb, ART.flag, PAL, 9)
const careerTag = tag(wb, 'CAREER', `background:${GREEN}`)
const pillars = [400, 540, 680].map((x) => mk('div', `left:${x - 26}px;top:0;width:52px;height:800px;background:repeating-linear-gradient(#C9B79C 0 34px, #B4A283 34px 40px);border:7px solid ${K};box-sizing:border-box;transform-origin:50% 0`, wb, null, 'abs'))
const plankL = mk('div', `left:322px;top:${GY - 4}px;width:218px;height:40px;background:repeating-linear-gradient(90deg,#9A6A44 0 52px,#7E5535 52px 56px);border:7px solid ${K};box-sizing:border-box;transform-origin:0 50%`, wb, null, 'abs')
const plankR = mk('div', `left:540px;top:${GY - 4}px;width:218px;height:40px;background:repeating-linear-gradient(90deg,#9A6A44 0 52px,#7E5535 52px 56px);border:7px solid ${K};box-sizing:border-box;transform-origin:100% 50%`, wb, null, 'abs')
const plankTile = sprite(wb, ART.play, PAL, 6)
const onlyTag = tag(wb, 'ONLY VIDEOS', `background:${RED}`)
const warn = mk('div', `left:0;top:0;width:120px;height:110px`, wb, `<svg width="120" height="110" shape-rendering="crispEdges"><polygon points="60,6 114,104 6,104" fill="${GOLD}" stroke="${K}" stroke-width="9" stroke-linejoin="round"/><rect x="54" y="40" width="12" height="36" fill="${K}"/><rect x="54" y="84" width="12" height="12" fill="${K}"/></svg>`, 'abs')
const backTag = tag(wb, 'BACKING ✓', `background:${GREEN}`)
const cr3 = creator(wb, 10)
const CARD3 = { x: 60, y: 250, w: 960, s: 960 / W, y0: 860 } // card rect and the world line shown at its top
on((t) => {
  if (vis(L3, t, 6.45, 16.4) < 0.003) return
  // camera: full screen push-in, then shrink into a card above the footage (14.2)
  const k = smooth(clamp((t - 14.15) / 0.5))
  const push = 1.16 + 0.06 * smooth(clamp((t - 6.6) / 7.4)) // close on the bridge, slow push
  const s = lerp(push, CARD3.s, k)
  const tx = lerp(540 - 585 * push, CARD3.x, k), ty = lerp(1080 - GY * push, CARD3.y - CARD3.y0 * CARD3.s, k)
  wb.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(4)})`
  const ins = (a, b) => lerp(0, b, k).toFixed(1)
  L3.style.clipPath = `inset(${ins(0, 250)}px ${ins(0, 60)}px ${ins(0, H - 250 - 590)}px ${ins(0, 60)}px round ${(26 * k).toFixed(1)}px)`
  clouds3.forEach((c) => { const [x, y, sc] = c.base; c.at(((x + t * 14 * sc) % 1250) - 80, y, { s: sc }) })
  castle.at(900, GY + 8, { s: 1 })
  flagC.at(925, GY - 148, { s: 1 })
  careerTag.style.transform = `translate(${(818).toFixed(0)}px, ${(GY - 310).toFixed(0)}px) scale(${popS(t, 6.9).toFixed(3)})`
  careerTag.style.opacity = t > 6.9 ? 1 : 0
  // the plank wobbles on "never" (8.89), warning on "wise" (9.99), cracks on "career" (13.83)
  const wob = (t > 8.8 && t < 13.8 ? 1 : 0) * 2.5 * Math.sin(t * 13) * clamp((t - 8.8) / 0.3)
  const crack = clamp((t - 13.83) / 0.5), fix = t > 14.0 ? 1 : 0
  const fall = easeIn(crack) * (1 - fix)
  plankL.style.transform = `rotate(${(wob + 38 * fall).toFixed(2)}deg)`
  plankR.style.transform = `rotate(${(-wob - 38 * fall).toFixed(2)}deg)`
  plankTile.at(540, GY - 10 + 30 * fall, { s: t < 13.83 || fix ? 1 : 1 - crack, rot: wob })
  onlyTag.style.transform = `translate(452px, ${GY + 70}px) scale(${popS(t, 11.55).toFixed(3)})`
  onlyTag.style.opacity = t > 11.55 && t < 14.1 ? 1 : 0
  const wa = popS(t, 9.95)
  warn.style.transform = `translate(560px, ${(GY - 330 - 12 * Math.abs(Math.sin(t * 6))).toFixed(1)}px) scale(${wa.toFixed(3)})`
  warn.style.opacity = t > 9.95 && t < 14.1 ? 1 : 0
  // pillars rise on "backing" (15.71)
  const pr = (i) => easeOut(clamp((t - 15.6 - 0.1 * i) / 0.45))
  pillars.forEach((p, i) => { p.style.transform = `translateY(${(GY + 30 + 800 * (1 - pr(i))).toFixed(1)}px)`; p.style.opacity = t > 15.55 ? 1 : 0 })
  backTag.style.transform = `translate(400px, ${GY + 140}px) scale(${popS(t, 15.9).toFixed(3)})`
  backTag.style.opacity = t > 15.9 ? 1 : 0
  // the creator: walks onto the plank (7.4-8.6), freezes, hops back as it cracks (13.83), then crosses safely (15.95)
  let x = 290, y = GY, mv = 0, armL = 8, armR = -8, rot = 0
  if (t > 7.3 && t < 8.6) { x = lerp(290, 420, smooth((t - 7.3) / 1.3)); mv = 1 }
  else if (t >= 8.6 && t < 13.8) { x = 420; armL = 30 + 12 * Math.sin(t * 9) * (t > 8.8 ? 1 : 0); armR = -armL }
  else if (t >= 13.8 && t < 14.3) { const p = easeOut((t - 13.8) / 0.5); x = lerp(420, 270, p); y = GY - 120 * Math.sin(Math.PI * p); armL = 150; armR = -150 }
  else if (t >= 14.3 && t < 15.95) x = 270
  else if (t >= 15.95) { x = lerp(270, 640, smooth(clamp((t - 15.95) / 1.0))); mv = t < 16.95 ? 1 : 0 }
  const wk = walk(t, mv)
  if (mv) { armL = wk.armL; armR = wk.armR }
  cr3.set({ x, y: y - wk.bob, armL, armR, legL: wk.legL, legR: wk.legR, rot })
})
cue(6.6, 'whoosh', 0.5); cue(6.9, 'pop', 0.6); cue(8.9, 'tick'); cue(9.97, 'thunk', 0.7); cue(11.57, 'pop', 0.6); cue(13.85, 'scratch'); cue(13.9, 'thunk', 0.8); shake(13.85, 10, 8)
cue(14.2, 'swish', 0.5); [15.6, 15.7, 15.8].forEach((k) => cue(k, 'thunk', 0.5)); cue(15.92, 'success', 0.5)

// ---------- 5 businesses built on a content foundation (CARD) ----------
const L5 = layer('foundation')
const c5 = sceneCard(L5, 60, 250, 960, 640)
landscape(c5, 960, 640, 540, { sky: ['#CFE9F7', '#FFF6E6'] })
const found = Array.from({ length: 7 }, () => sprite(c5, ART.play, PAL, 10))
const bld = [['shop', 10], ['office', 15], ['shop', 10]].map(([a, u]) => sprite(c5, ART[a], PAL, u))
const tagB = tag(c5, 'BUSINESSES', `background:${INK}`)
const tagC = tag(c5, 'CONTENT', `background:${RED}`)
on((t) => {
  if (vis(L5, t, 16.4, 23.45) < 0.003) return
  // foundation slides in under the buildings (21.9 "built" -> 23.19 "content")
  found.forEach((f, i) => { const k = 21.9 + 0.08 * i, a = easeOut(clamp((t - k) / 0.35)); f.at(150 + i * 110, 545 + 110 * (1 - a), { op: t > k ? 1 : 0 }) })
  const lift = t < 21.85 ? 0 : t < 23.2 ? 1 : 1 - easeOut(clamp((t - 23.2) / 0.3))
  const restY = t < 21.85 ? 540 : 470
  bld.forEach((b, i) => {
    const k = 19.3 + 0.15 * i, a = popS(t, k)
    const y = lerp(restY, 470, 0) - 50 * lift + (t < 23.2 ? 0 : 0)
    b.at([220, 480, 740][i], (t < 21.85 ? 540 : 455) - 46 * lift - 8 * Math.sin(t * 3 + i) * (lift > 0.5 ? 1 : 0), { s: a })
  })
  tagB.style.transform = `translate(355px, 40px) scale(${popS(t, 19.5).toFixed(3)})`; tagB.style.opacity = t > 19.5 ? 1 : 0
  tagC.style.transform = `translate(380px, 572px) scale(${popS(t, 23.1).toFixed(3)})`; tagC.style.opacity = t > 23.1 ? 1 : 0
})
;[19.3, 19.45, 19.6].forEach((k) => cue(k, 'pop', 0.6)); cue(21.9, 'whoosh', 0.4); cue(23.22, 'thunk', 0.8)

// ---------- 6 the Junejo model: main business -> create -> monetize (OFF, camera follows the walk) ----------
const L6 = layer('model')
const w6 = mk('div', `left:0;top:0;width:${W * 2}px;height:${H}px`, L6, null, 'abs')
const GY6 = 1140
landscape(w6, W * 2, H, GY6, { sky: ['#C5E6F8', '#FFF3DE'] })
mk('div', `left:0;top:${GY6 + 60}px;width:${W * 2}px;height:14px;background:repeating-linear-gradient(90deg, ${K} 0 26px, transparent 26px 50px);opacity:0.35`, w6, null, 'abs')
const ST = [400, 1080, 1760]
const shop6 = sprite(w6, ART.shop, PAL, 22)
const cam6 = sprite(w6, ART.camera, PAL, 21)
const scr6 = sprite(w6, ART.play, PAL, 18)
const pile6 = Array.from({ length: 9 }, () => sprite(w6, ART.coin, PAL, 12))
const rain6 = Array.from({ length: 14 }, () => sprite(w6, ART.coin, PAL, 11))
const labels6 = [['1 MAIN BUSINESS', INK, 26.2], ['2 CREATE', RED, 27.1], ['3 MONETIZE', GREEN, 30.35]].map(([s, bg, k]) => { const c = tag(w6, s, `background:${bg};font-size:28px;height:62px;line-height:62px`); c.k = k; return c })
const cr6 = creator(w6, 17)
const kicker6 = mk('div', `left:0;top:250px;width:${W}px;text-align:center;${PIX};font-size:34px;color:${INK}`, L6, 'THE JUNEJO MODEL', 'abs')
const crX6 = (t) => {
  if (t < 25.6) return 180
  if (t < 26.3) return lerp(180, ST[0] + 270, smooth((t - 25.6) / 0.7))
  if (t < 26.7) return ST[0] + 270
  if (t < 27.35) return lerp(ST[0] + 270, ST[1] + 190, smooth((t - 26.7) / 0.65))
  if (t < 28.0) return ST[1] + 190
  if (t < 30.25) return lerp(ST[1] + 190, ST[2] - 230, smooth((t - 28.0) / 2.25))
  return ST[2] - 230
}
on((t) => {
  if (vis(L6, t, 23.4, 31.0) < 0.003) return
  const x = crX6(t), moving = Math.abs(crX6(t + 0.03) - x) > 0.5
  const camX = clamp(x - 420, 0, W)
  w6.style.transform = `translateX(${(-camX).toFixed(1)}px)`
  shop6.at(ST[0], GY6 + 6, { s: popS(t, 26.2) })
  cam6.at(ST[1] - 60, GY6 + 6, { s: popS(t, 27.1) })
  scr6.at(ST[1] + 120, GY6 - 260 - 10 * Math.sin(t * 4), { s: popS(t, 27.25) })
  pile6.forEach((c, i) => c.at(ST[2] + (i % 3) * 90 - 40, GY6 + 4 - Math.floor(i / 3) * 70, { s: popS(t, 30.4 + i * 0.04) }))
  rain6.forEach((c, i) => {
    const k = 30.4 + (i % 7) * 0.08, p = (t - k) / 0.9
    if (p <= 0) { c.at(0, 0, { op: 0 }); return }
    const xx = ST[2] - 300 + ((i * 73) % 520), yy = lerp(420, GY6 - 20, Math.min(1, easeIn(clamp(p))))
    c.at(xx, yy, { rot: p * 360, op: p < 1.6 ? 1 : 0 })
  })
  labels6.forEach((c, i) => { c.style.transform = `translate(${ST[i] - 180}px, ${GY6 - 620}px) scale(${popS(t, c.k).toFixed(3)})`; c.style.opacity = t > c.k ? 1 : 0 })
  const wk = walk(t, moving ? 1 : 0, 11)
  const cheer = t > 30.45
  cr6.set({ x, y: GY6 - wk.bob - (cheer ? 30 * Math.abs(Math.sin((t - 30.45) * 7)) : 0), legL: wk.legL, legR: wk.legR,
    armL: cheer ? 160 : moving ? wk.armL : 10, armR: cheer ? -160 : moving ? wk.armR : -10, flip: 1 })
  kicker6.style.opacity = clamp((t - 23.95) / 0.2) * (1 - clamp((t - 30.9) / 0.2))
  kicker6.style.transform = `translateY(${(14 * (1 - easeOut(clamp((t - 23.95) / 0.3)))).toFixed(1)}px)`
})
cue(23.5, 'whoosh', 0.5); cue(24.0, 'tick'); cue(26.22, 'pop'); cue(26.75, 'whoosh', 0.5); cue(27.12, 'pop'); cue(30.42, 'success', 0.7); [30.5, 30.62, 30.74, 30.86].forEach((k) => cue(k, 'tick', 0.5))

// ---------- 7 a long road (OFF): camera pulls back on "long road" ----------
const L7 = layer('road')
const w7 = mk('div', `left:0;top:0;width:${W}px;height:${H}px;transform-origin:540px 1450px`, L7, null, 'abs')
const HZ = 820
landscape(w7, W, H, HZ, { sky: ['#F9D9A8', '#FCEBD0'], ground: '#9ED08D', groundDark: '#79B36A' })
mk('div', 'left:0;top:0;width:1080px;height:1920px', w7, `<svg width="1080" height="1920"><polygon points="525,${HZ} 555,${HZ} 1000,1920 80,1920" fill="#8A8F99" stroke="${K}" stroke-width="8"/><line class="dash" x1="540" y1="${HZ}" x2="540" y2="1920" stroke="#FFF1C2" stroke-width="12" stroke-dasharray="60 70"/></svg>`, 'abs')
const flag7 = sprite(w7, ART.flag, PAL, 4)
const tag7 = tag(w7, 'CAREER', `background:${GREEN};font-size:20px;height:44px;line-height:44px;padding:0 14px`)
const cr7 = creator(w7, 9)
const roadSign = tag(L7, 'LONG ROAD', `background:${INK}`)
on((t) => {
  if (vis(L7, t, 30.95, 34.8) < 0.003) return
  w7.querySelector('.dash').style.strokeDashoffset = (-t * 160).toFixed(1)
  const pull = smooth(clamp((t - 32.9) / 1.0))
  w7.style.transform = `scale(${lerp(1.45, 1.0, pull).toFixed(4)})`
  flag7.at(548, HZ - 2, {})
  tag7.style.transform = `translate(486px, ${HZ - 110}px)`
  const wk = walk(t, 1, 10)
  cr7.set({ x: 540, y: 1560 - (t - 31) * 40 - wk.bob, s: 1 - 0.25 * clamp((t - 31) / 3.8), legL: wk.legL, legR: wk.legR, armL: wk.armL, armR: wk.armR })
  roadSign.style.transform = `translate(400px, 330px) scale(${popS(t, 33.13).toFixed(3)})`
  roadSign.style.opacity = t > 33.13 ? 1 : 0
})
cue(31.0, 'whoosh', 0.5); cue(33.15, 'pop')

// ---------- 8 not as convenient as it looks: pushing a boulder uphill (FOOT) ----------
const L8 = layer('uphill')
const c8 = sceneCard(L8, 60, 240, 960, 590)
const bg8 = landscape(c8, 960, 590, 560, { sky: ['#F8E1C0', '#FFF6EA'] })
mk('div', 'left:0;top:0;width:960px;height:590px', c8, `<svg width="960" height="590"><polygon points="0,590 0,520 960,170 960,590" fill="#9ED08D" stroke="${K}" stroke-width="8"/></svg>`, 'abs')
const rock8 = sprite(c8, ART.rock, PAL, 14)
const cr8 = creator(c8, 8)
on((t) => {
  if (vis(L8, t, 34.75, 40) < 0.003) return
  const p = clamp((t - 34.8) / 2.0), slope = (520 - 170) / 960
  const rx = 470 + 60 * p, ry = 520 - rx * slope + 6
  const shake8 = 3 * Math.sin(t * 20)
  rock8.at(rx + shake8 * 0.3, ry, { rot: -p * 40 })
  const cx = rx - 150, cy = 520 - cx * slope
  const wk = walk(t, 0.6, 7)
  cr8.set({ x: cx, y: cy - wk.bob * 0.5, rot: -18, armL: -95 + shake8, armR: -95 - shake8, legL: wk.legL, legR: wk.legR, sweat: t > 35.6 ? 1 : 0 })
})
cue(34.85, 'whoosh', 0.4); cue(35.75, 'thunk', 0.5)

// ---------- captions: Roman Urdu / English as spoken, 2-4 words, mono uppercase ----------
captions([
  [0.0, 0.72, 'Can you really'],
  [0.72, 1.92, 'make a reliable'],
  [1.92, 2.68, 'career'],
  [2.68, 3.56, 'out of content?'],
  [5.09, 6.4, 'Tricky question'],
  [6.61, 8.5, 'lekin again'],
  [8.53, 9.95, "it's never directly"],
  [9.95, 11.59, 'wise to go for'],
  [11.59, 12.6, 'only'],
  [12.6, 14.2, 'videos se career?'],
  [14.43, 15.11, 'You need to have'],
  [15.11, 16.3, 'some sort of backing'],
  [17.9, 18.6, 'Junejo'],
  [18.63, 19.9, 'Junejo ke businesses'],
  [19.9, 20.9, 'content ke ilawa'],
  [20.99, 21.9, 'although he has'],
  [21.9, 23.3, 'built that on content'],
  [23.55, 24.6, 'so Junejo model'],
  [24.6, 25.6, 'is good'],
  [25.6, 26.6, 'ek main business'],
  [26.6, 27.6, 'and then you create'],
  [28.5, 29.8, 'and then eventually'],
  [29.8, 31.0, 'start to monetize it'],
  [31.1, 32.9, 'so like'],
  [32.9, 33.7, "it's a long road"],
  [33.7, 34.8, "is what I'm telling you"],
  [34.85, 35.6, "it's not as"],
  [35.6, 36.7, 'convenient as it looks'],
])
