// STARTER (style pixel-16x9): horizontal 16:9 footage shown WHOLE inside a 9:16 reel, pixel 2D scenes around it.
// Replace the two demo scenes with the real plan. Full worked edit: examples/content-career/edit.js.
// Layouts: FOOT (footage under the graphics), TOP (footage on top), CARD (inset card), OFF (full-screen scenes).
// Safe area: graphics x 60-1020, y 230-1520; captions never below 1460.
//
//  time      layout  scene
//  0.0-4.9   FOOT    demo: creator on a wobbly tower of video tiles, "?" pops, tag
//  4.9-6.6   TOP     demo: a tangled path draws to a flag, question marks

const W = 1080, H = 1920
const FW = 1920, FH = 1080 // source frame
const fit = (x, y, w) => { const s = w / FW; return { x, y, w, h: Math.round(FH * s), s, fx: w / 2, fy: Math.round(FH * s) / 2 } }
reel({
  name: 'reel',
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
  // [6.5, 'OFF'],   full-screen scene
  // [9.0, 'CARD'],  inset card
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
  bub1.style.transform = `translate(${(topX + 90).toFixed(1)}px, ${(topY - 170).toFixed(1)}px) scale(${q.toFixed(3)}) rotate(${(6 * Math.sin(t * 4)).toFixed(1)}deg)`
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
  if (vis(L2, t, 4.85, META.duration + 1) < 0.003) return // demo: holds to the end; real edits end it at the next scene
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

// ---------- captions: [start, end, 'text'] in source seconds; *word* = keyword. 2-4 words per chunk, as spoken ----------
captions([
  [0.2, 1.4, 'replace these'],
  [1.4, 2.6, 'with the *transcript*'],
])
