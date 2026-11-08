// Claude Jobs: 46s Urdu/Hindi talking head about career-ops (Claude scores jobs against your CV, tailors CVs, you apply).
// Style follows the reference reel: cream stage, graphics on top / face below (SPLIT), black headline card, Clawd,
// pixel titles. Captions follow the caption reference: Roman Urdu, pixel font, white with dark shadow, cyan keyword box.
//
//  time        layout  on screen                                         lands on
//  0.0-4.9     SPLIT   headline card + Clawd + CV + job cards             CV 1.06, 1 lakh 2.4, 10 lakh 3.14, jobs 4.16
//  4.96-6.2    PUNCH   wall card "one guy did exactly this"               bande 5.18
//  6.22-9.44   SPLIT   740 JOBS counter + scanning job grid               740 7.36, analyse 8.88
//  9.44-14.6   SPLIT   score card x/5, experience / salary / work, FIT    5 10.3, experience 11.98, salary 12.4, kaam 13.08, fit 14.24
// 14.62-18.6   PIP     job list with scores, low ones red, SKIP stamp     score 15.12, kam 15.82, chhor 17.14, time 17.88
// 18.68-26.7   SPLIT   good jobs -> custom CV / form answers / message    achhi 19.16, CV 22.18, form 22.72, message 25.74
// 26.72-32.08  HOOK    best part: doesn't submit -> YOU review / YOU apply submit 28.46, aap 29.8, apply 30.72
// 32.08-38.16  SPLIT   funnel 740 -> 68 -> 12 -> 1 AI job                 68 33.48, 12 34.86, AI 36.54, mil 37.84
// 38.16-42.1   PIP     FREE / OPEN SOURCE + GitHub repo + CAREER-OPS       free 39.52, open 40.02, career 41.48
// 42.24-46.25  PUNCH   go try it + FOLLOW TalhaReviews.ai                 try 42.7, Talha 44.5

reel({
  name: 'claude_jobs',
  duration: META.duration,
  face: { frames: META.faceFrames, focus: { x: 610, y: 900 }, headHeight: 560 },
  theme: { accent: '#2D6BFF', ink: '#15151A' },
  captionY: { SPLIT: 880, FULL: 1480, HOOK: 1480, PUNCH: 1480, PIP: 1470 },
  // split: seam a bit higher and the face lower, so the whole head and some wall above it show
  layouts: { SPLIT: { x: 0, y: 920, w: 1080, h: 1050, r: 56, s: 1, fx: 610, fy: 500 } },
})
const INK = '#15151A', BLUE = '#2D6BFF', CYAN = '#1AA3FF', CREAM = '#F6F1E7', GREEN = '#1FB86A', RED = '#F0453A', YEL = '#FFD23F'
const PIX = "font-family:'Silkscreen',monospace"
const card = (parent, css, html) => mk('div', `background:#fff;color:${INK};border-radius:26px;box-shadow:0 0 0 2px rgba(21,21,26,0.06),0 24px 60px -24px rgba(21,21,26,0.35);${css}`, parent, html, 'abs')
const dark = (parent, css, html) => mk('div', `background:${INK};color:#fff;border-radius:22px;box-shadow:0 24px 60px -24px rgba(21,21,26,0.6);${css}`, parent, html, 'abs')
const kbox = (s, bg = BLUE) => `<span style="background:${bg};color:#fff;padding:0 14px 4px;border-radius:10px">${s}</span>`
const IN = { dy: 34, sin: SPR.enter }
const POP = { dy: 24, sc: 0.6, rot: -4, sin: SPR.pop, cue: 'pop' }

faceAt([
  [-1, 'FULL'],
  [0.98, 'SPLIT'], // intro: full A-roll first, then the face slides down and the graphics drop in from the top
  [4.9, 'PUNCH'],
  [6.16, 'SPLIT'],
  [14.56, 'PIP'],
  [18.62, 'SPLIT'],
  [26.66, 'HOOK'],
  [32.02, 'SPLIT'],
  [38.1, 'PIP'],
  [42.18, 'PUNCH'],
])

// ---------- 0 hook: headline card, Clawd hands over a CV, jobs come out ----------
const H_OUT = 4.92
const L0 = layer('hook')
const head = dark(L0, 'left:70px;top:236px;width:940px;padding:26px 30px 30px;box-sizing:border-box;text-align:center', '')
mk('div', 'font-size:54px;font-weight:800;line-height:64px', head, 'Give your CV to Claude', 'disp')
const lakh = mk('div', `font-size:76px;font-weight:900;line-height:90px;color:${YEL};letter-spacing:-1px`, head, '<span class="l1">1 LAKH</span>&nbsp;&nbsp;–&nbsp;&nbsp;<span class="l2">10 LAKH</span>', 'disp')
mk('div', 'font-size:54px;font-weight:800;line-height:64px', head, 'salary jobs', 'disp')
at(head, 1.02, H_OUT, { dy: -460, sc: 1.04, rot: -3, sin: SPR.slam, cue: 'thunk', cueDelay: 0.22 })
on((t) => {
  ;[['l1', 2.4], ['l2', 3.14]].forEach(([c, k]) => {
    const p = pulse(t - k, 3)
    const e = lakh.querySelector('.' + c)
    e.style.display = 'inline-block'
    e.style.transform = `scale(${(1 + 0.14 * p).toFixed(3)})`
  })
})
cue(2.4, 'tick'); cue(3.14, 'tick')

// CV paper
const cv = card(L0, 'left:380px;top:560px;width:230px;height:300px;padding:24px;box-sizing:border-box', `
  <div style="${PIX};font-size:44px;color:${BLUE}">CV</div>
  <div style="width:70px;height:70px;border-radius:35px;background:#E7E2D8;margin:10px 0 14px"></div>
  ${[150, 170, 120, 160, 110].map((w) => `<div style="width:${w}px;height:12px;border-radius:6px;background:#E7E2D8;margin-bottom:12px"></div>`).join('')}`)
at(cv, 1.16, H_OUT, { dy: -360, sc: 0.9, rot: 10, sin: SPR.pop, base: 'rotate(-4deg)', cue: 'pop', cueDelay: 0.2 })
// arrow + job cards on "jobs"
const arrow = mk('div', `left:628px;top:672px;font-size:64px;font-weight:900;color:${INK}`, L0, '→', 'abs disp')
at(arrow, 3.9, H_OUT, { dy: 0, sc: 0.4, sin: SPR.pop })
const jobs = [0, 1, 2].map((i) => card(L0, `left:720px;top:${560 + i * 104}px;width:290px;height:88px;display:flex;align-items:center;gap:14px;padding:0 20px;box-sizing:border-box;font-size:34px;font-weight:800`,
  `<span style="width:44px;height:44px;border-radius:22px;background:${GREEN};color:#fff;display:grid;place-items:center;font-size:28px">✓</span><span class="disp">JOB ${['#1', '#2', '#3'][i]}</span>`))
stagger(jobs, 4.12, 0.08, H_OUT, { ...POP, gain: 0.7 })
// Clawd next to the CV
const M0 = clawd(L0, { u: 13 })
on((t) => {
  if (t > H_OUT + 0.6) { M0.set({ opacity: 0 }); return }
  const id = M0.idle(t), a = S(t - 1.3, SPR.slam.f, SPR.slam.z), ex = S(t - H_OUT, 4, 1)
  const cheer = pulse(t - 1.75, 2.6) + pulse(t - 4.16, 2.6)
  M0.set({ x: lerp(-200, 210, clamp(a)) - 500 * ex, y: 868 - id.bob - 40 * cheer, s: 1, blink: id.blink, armL: 2 * cheer, armR: 2 * cheer, opacity: 1, scissors: false })
})

// ---------- 1 one guy did this ----------
const L1 = layer('story')
const w1 = wallCard(L1, `<div class="mono" style="font-size:24px;color:#6B6B76">Real story <span class="emoji">👇</span></div><div class="disp" style="font-size:66px;font-weight:850;line-height:76px">One guy did ${kbox('exactly this')}</div>`, { y: 240 })
at(w1, 5.0, 6.18, { dy: -40, sc: 0.92, rot: -2, sin: SPR.pop, cue: 'pop' })

// ---------- 2 740 jobs analysed ----------
const L2 = layer('analyse')
at(text(L2, 'Claude analysed', { y: 250, size: 62, weight: 820, color: INK }), 6.3, 9.42, { ...IN, cue: 'tick' })
const num = mk('div', `left:70px;top:322px;${PIX};font-size:150px;line-height:160px;color:${BLUE};white-space:nowrap`, L2, '', 'abs')
at(num, 7.2, 9.42, { dy: 30, sc: 0.8, sin: SPR.pop, cue: 'pop' })
on((t) => { num.innerHTML = `${Math.round(740 * clamp(S(t - 7.3, 1.1, 1)))}<span style="font-size:80px;color:${INK}"> JOBS</span>` })
const tiles = []
for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
  const el = card(L2, `left:${70 + c * 240}px;top:${510 + r * 124}px;width:216px;height:104px;padding:16px 18px;box-sizing:border-box`,
    `<div class="mono url" style="font-size:20px;color:#8B8B96">job #${100 + r * 4 + c * 37}</div><div style="width:${110 + ((r * 4 + c) * 37) % 70}px;height:12px;border-radius:6px;background:#E7E2D8;margin-top:12px"></div><div style="width:80px;height:12px;border-radius:6px;background:#E7E2D8;margin-top:10px"></div>`)
  el.row = r
  tiles.push(el)
}
stagger(tiles, 6.4, 0.04, 9.42, { dy: 30, sc: 0.85, sin: SPR.pop })
cue(6.45, 'pop', 0.6); cue(6.75, 'pop', 0.5)
const scan = mk('div', `left:50px;top:0;width:980px;height:6px;border-radius:3px;background:${CYAN};box-shadow:0 0 24px ${CYAN}`, L2, null, 'abs')
on((t) => {
  const p = (t - 7.4) / 1.2
  scan.style.opacity = p > 0 && p < 1.5 && t < 9.4 ? 1 : 0
  scan.style.transform = `translateY(${(500 + ((p % 1 + 1) % 1) * 380).toFixed(1)}px)`
  tiles.forEach((el) => {
    const lit = t > 7.4 + ((el.row * 124 + 50) / 380) * 1.2 && t < 9.5
    el.style.boxShadow = lit ? `0 0 0 4px ${GREEN},0 24px 60px -24px rgba(21,21,26,0.35)` : ''
  })
})
cue(7.45, 'whoosh', 0.5)

// ---------- 3 every job scored out of 5 ----------
const L3 = layer('score')
at(text(L3, `Every job gets a ${kbox('score')}`, { y: 250, size: 62, weight: 820, color: INK }), 9.5, 14.55, { ...IN, cue: 'tick' })
const sc = card(L3, 'left:70px;top:350px;width:940px;height:520px;padding:30px 40px;box-sizing:border-box', '')
const scTop = mk('div', 'display:flex;align-items:center;gap:30px', sc)
const scNum = mk('div', `${PIX};font-size:120px;line-height:130px;color:${INK};white-space:nowrap`, scTop, '')
const stars = mk('div', 'display:flex;gap:6px;font-size:58px', scTop, [0, 1, 2, 3, 4].map(() => '<span class="emoji" style="display:inline-block">⭐</span>').join(''))
on((t) => {
  const p = clamp(S(t - 10.3, 1.4, 1))
  scNum.innerHTML = `${(4.6 * p).toFixed(1)}<span style="font-size:60px;color:#8B8B96">/5</span>`
  ;[...stars.children].forEach((s, i) => {
    const a = clamp(S(t - 10.35 - 0.09 * i, SPR.pop.f, SPR.pop.z), 0, 1.3)
    s.style.transform = `scale(${a.toFixed(3)})`
    s.style.opacity = i === 4 ? 0.35 : 1
  })
})
;[0, 1, 2, 3, 4].forEach((i) => cue(10.35 + 0.09 * i, 'tick', 0.5))
const ROWS = [['Experience', 11.98, 0.92], ['Salary', 12.4, 0.86], ['Work', 13.08, 0.95]]
ROWS.forEach(([name, k, v], i) => {
  const row = mk('div', `left:40px;top:${190 + i * 96}px;width:860px;height:70px;display:flex;align-items:center;gap:24px`, sc, null, 'abs')
  mk('div', 'width:250px;font-size:40px;font-weight:780', row, name, 'disp')
  const bar = mk('div', 'flex:1;height:26px;border-radius:13px;background:#EEE9DF;overflow:hidden', row)
  const fill = mk('div', `width:100%;height:100%;border-radius:13px;background:${BLUE};transform-origin:0 50%`, bar)
  mk('div', `width:50px;height:50px;border-radius:25px;background:${GREEN};color:#fff;display:grid;place-items:center;font-size:30px;font-weight:900`, row, '✓')
  at(row, k - 0.1, 14.55, { dy: 20, sc: 0.9, sin: SPR.pop, cue: 'pop', gain: 0.7 })
  on((t) => { fill.style.transform = `scaleX(${(v * clamp(S(t - k, 1.6, 1))).toFixed(4)})` })
})
at(sc, 9.6, 14.55, { dy: 80, sc: 0.94, sin: SPR.morph })
at(chip(L3, `FIT ✓`, { x: 760, y: 300, bg: GREEN, fg: '#fff', size: 52, weight: 900 }), 14.2, 14.55, { ...POP, rot: 8, cue: 'click' })

// ---------- 4 below 4: skip it ----------
const L4 = layer('skip')
at(mk('div', `left:70px;top:250px;${PIX};font-size:78px;line-height:90px;color:${INK};white-space:nowrap`, L4, `Score <span style="color:${RED}">&lt; 4</span> ?`, 'abs'), 14.7, 18.6, { ...IN, cue: 'tick' })
const LIST = [['job #128', 4.5], ['job #307', 3.2], ['job #451', 4.1], ['job #562', 2.8]]
const rows4 = LIST.map(([n, s], i) => {
  const r = card(L4, `left:70px;top:${380 + i * 118}px;width:940px;height:100px;display:flex;align-items:center;justify-content:space-between;padding:0 34px;box-sizing:border-box`,
    `<span class="mono url" style="font-size:32px;color:#55555E">${n}</span><span class="pill" style="${PIX};font-size:44px;padding:4px 22px;border-radius:14px;background:#EEE9DF">${s.toFixed(1)}</span>`)
  r.low = s < 4
  return r
})
stagger(rows4, 15.0, 0.12, 18.6, { dy: 30, sc: 0.9, sin: SPR.pop, cue: 'tick', gain: 0.6 })
on((t) => rows4.forEach((r) => {
  const p = r.low ? clamp((t - 15.85) / 0.15) : 0, g = !r.low ? clamp((t - 15.85) / 0.15) : 0
  r.style.background = p > 0 ? `rgba(255,${Math.round(255 - 30 * p)},${Math.round(255 - 30 * p)},1)` : '#fff'
  r.style.opacity = r.low ? 1 - 0.35 * clamp((t - 17.1) / 0.2) : 1
  const pill = r.querySelector('.pill')
  pill.style.background = p > 0 ? RED : g > 0 ? GREEN : '#EEE9DF'
  pill.style.color = p > 0 || g > 0 ? '#fff' : INK
}))
cue(15.9, 'scratch', 0.6)
stamp(L4, 'SKIP ✕', { x: 560, y: 610, t: 17.14, tout: 18.6, size: 96, rot: -8 })
at(chip(L4, `<span class="emoji">⏳</span> don't waste time`, { x: 70, y: 880, bg: INK, fg: '#fff', size: 46 }), 17.85, 18.6, POP)

// ---------- 5 good jobs: CV, form answers, recruiter message ----------
const L5 = layer('prepare')
at(text(L5, `For the ${kbox('good jobs', GREEN)}`, { y: 250, size: 62, weight: 820, color: INK }), 18.75, 26.65, { ...IN, cue: 'tick' })
at(text(L5, 'Claude prepares:', { y: 330, size: 62, weight: 820, color: INK }), 20.4, 26.65, IN)
const DOCS = [['📄', 'Custom CV', 'for every job', 22.1], ['📝', 'Form answers', 'all questions', 22.72], ['✉️', 'Recruiter message', 'ready to send', 25.7]]
DOCS.forEach(([e, name, sub, k], i) => {
  const d = card(L5, `left:${70 + i * 322}px;top:440px;width:296px;height:420px;padding:28px 24px;box-sizing:border-box`,
    `<div class="emoji" style="font-size:86px;line-height:100px">${e}</div>
     <div class="disp" style="font-size:42px;font-weight:850;line-height:48px;margin-top:16px">${name}</div>
     <div style="font-size:26px;color:#6B6B76;margin-top:10px;font-weight:600">${sub}</div>
     <div style="position:absolute;left:24px;bottom:30px">${[200, 150, 180].map((w) => `<div style="width:${w}px;height:12px;border-radius:6px;background:#E7E2D8;margin-top:12px"></div>`).join('')}</div>`)
  at(d, k, 26.65, { dy: 60, sc: 0.8, rot: [-5, 3, -3][i], sin: SPR.pop, cue: 'pop' })
})
// Clawd writes them
const M5 = clawd(L5, { u: 9 })
on((t) => {
  const vis = t > 20.3 && t < 26.9
  if (!vis) { M5.set({ opacity: 0 }); return }
  const id = M5.idle(t), a = S(t - 20.35, SPR.slam.f, SPR.slam.z), ex = S(t - 26.62, 4, 1)
  const hop = pulse(t - 22.15, 3) + pulse(t - 22.75, 3) + pulse(t - 25.75, 3)
  M5.set({ x: 930 + 300 * (1 - clamp(a)) + 300 * ex, y: 400 - id.bob - 30 * hop, s: 1, blink: id.blink, armL: 2 * hop, armR: 2 * hop, opacity: 1, scissors: false })
})

// ---------- 6 the best part: it doesn't submit ----------
const L6 = layer('you-apply')
const w6 = wallCard(L6, `<div class="mono" style="font-size:24px;color:#6B6B76">The best part <span class="emoji">😮</span></div><div class="disp" style="font-size:62px;font-weight:850;line-height:74px">It doesn't <span class="sub">auto-submit</span></div>`, { y: 240 })
at(w6, 26.8, 29.15, { dy: -40, sc: 0.92, rot: -2, sin: SPR.pop, cue: 'pop' })
const sub = w6.querySelector('.sub')
on((t) => {
  const p = clamp((t - 28.45) / 0.12)
  sub.style.background = p > 0 ? RED : 'transparent'
  sub.style.color = p > 0 ? '#fff' : INK
  sub.style.padding = '0 14px 4px'; sub.style.borderRadius = '10px'
})
cue(28.48, 'stamp', 0.7); shake(28.48, 8)
const w6b = wallCard(L6, `<div class="disp" style="font-size:62px;font-weight:850;line-height:80px"><div class="r1"><span style="color:${BLUE}">You</span> review <span class="emoji">👀</span></div><div class="r2"><span style="color:${GREEN}">You</span> apply <span class="emoji">✅</span></div></div>`, { y: 240 })
at(w6b, 29.25, 32.0, { dy: -40, sc: 0.92, rot: 2, sin: SPR.pop, cue: 'pop' })
on((t) => {
  w6b.querySelector('.r2').style.opacity = clamp((t - 30.7) / 0.12)
  w6b.querySelector('.r2').style.transform = `translateY(${(20 * (1 - clamp(S(t - 30.7, SPR.pop.f, SPR.pop.z), 0, 1.2))).toFixed(1)}px)`
})
cue(30.75, 'pop')

// ---------- 7 the result: funnel ----------
const L7 = layer('result')
at(text(L7, 'The result', { y: 250, size: 62, weight: 820, color: INK }), 32.15, 38.1, { ...IN, cue: 'tick' })
const FUN = [[740, 'jobs analysed', 32.3, 940, '#C9C2B4', INK], [68, 'applied', 33.45, 720, BLUE, '#fff'], [12, 'interviews', 34.84, 560, INK, '#fff'], [1, 'big AI job', 36.55, 460, GREEN, '#fff']]
FUN.forEach(([n, lab, k, w, bg, fg], i) => {
  const row = mk('div', `left:70px;top:${350 + i * 132}px;width:${w}px;height:112px;border-radius:24px;background:${bg};color:${fg};display:flex;align-items:center;gap:22px;padding:0 30px;box-sizing:border-box;box-shadow:0 24px 50px -26px rgba(21,21,26,0.5);transform-origin:0 50%`, L7, null, 'abs')
  const nEl = mk('div', `${PIX};font-size:72px;line-height:80px`, row, '')
  mk('div', 'font-size:40px;font-weight:800;white-space:nowrap', row, lab + (i === 3 ? ' <span class="emoji">🎉</span>' : ''), 'disp')
  on((t) => { nEl.textContent = i === 0 ? '740' : Math.round(n * clamp(S(t - k, 1.6, 1))) })
  at(row, k - 0.08, 38.1, { dy: 0, sc: 0.5, sin: SPR.pop, cue: i === 3 ? 'success' : 'pop', gain: i === 3 ? 0.6 : 0.8, base: '' })
})
emojiRise(L7, ['🎉', '🥳', '🎉', '💼', '🎉'], { t0: 37.0, step: 0.18, x: 760, spread: 200, from: 900, to: 300, dur: 1.4, size: 74 })

// ---------- 8 free + open source: career-ops ----------
const L8 = layer('career-ops')
const row8 = mk('div', 'left:70px;top:250px;display:flex;gap:16px', L8, null, 'abs')
stagger([chip(row8, 'FREE', { bg: GREEN, fg: '#fff', size: 46, weight: 900 }), chip(row8, 'OPEN SOURCE', { bg: INK, fg: '#fff', size: 46, weight: 900 })], 39.45, 0.55, 42.1, POP)
const gh = imageCard(L8, 'assets/shots/gh_card.jpg', { x: 70, y: 370, w: 940, h: 500, pos: '0% 0%' })
at(gh, 38.3, 42.1, { dy: 200, sc: 0.92, rot: 2, sin: SPR.morph, cue: 'whoosh', gain: 0.5 })
const title8 = mk('div', `left:540px;top:900px;${PIX};font-size:100px;line-height:110px;color:${INK};white-space:nowrap;text-shadow:6px 6px 0 ${CYAN}`, L8, 'CAREER-OPS', 'abs')
at(title8, 41.45, 42.12, { dy: 0, sc: 1.8, sin: SPR.slam, base: 'translateX(-50%)', cue: 'thunk' })

// ---------- 9 CTA ----------
const L9 = layer('cta')
at(chip(L9, `Go try it <span class="emoji">🚀</span>`, { x: 70, y: 260, bg: '#fff', fg: INK, size: 56, weight: 900 }), 42.6, null, { ...POP, rot: -6 })
const fol = mk('div', 'left:110px;top:1110px;width:860px;padding:22px 0 30px;text-align:center;border-radius:36px;background:rgba(16,16,20,0.82);box-shadow:0 30px 80px -20px rgba(0,0,0,0.6)', L9, null, 'abs')
mk('div', 'font-size:132px;font-weight:900;line-height:130px;color:#fff;letter-spacing:-3px;text-shadow:0 6px 30px rgba(0,0,0,0.45)', fol, 'FOLLOW', 'disp')
mk('div', `font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:86px;line-height:100px;color:${YEL};text-shadow:0 4px 24px rgba(0,0,0,0.5)`, fol, 'TalhaReviews.ai')
at(fol, 44.45, null, { dy: 40, sc: 1.3, sin: SPR.slam, cue: 'thunk', cueDelay: 0.15 })

// ---------- captions: Roman Urdu, *word* = cyan box ----------
captions([
  [0.0, 0.96, '*Claude* ko sirf'],
  [1.28, 1.74, 'apni *CV* do,'], // starts after the intro morph so it never slides across the face
  [1.76, 2.4, 'wo aapke liye'],
  [2.4, 3.68, '*1 lakh* se *10 lakh*'],
  [3.68, 4.96, 'salary wali *jobs* nikaal dega'],
  [4.96, 6.2, 'ek *bande* ne yahi kiya,'],
  [6.22, 7.36, 'aur *Claude* ne uske liye'],
  [7.36, 8.6, '*740 jobs*'],
  [8.6, 9.44, 'khud *analyse* ki'],
  [9.44, 10.3, 'aur har *job* ko'],
  [10.3, 11.36, '*5* mein se number diya,'],
  [11.4, 12.4, 'ke ye uske *experience*,'],
  [12.4, 13.36, '*salary* aur kaam'],
  [13.36, 14.62, 'ke hisaab se kitni *fit* hain'],
  [14.62, 15.4, 'jis job ka *score*'],
  [15.4, 16.32, '*4* se kam aaya,'],
  [16.4, 16.94, '*Claude* ne kaha,'],
  [16.96, 17.66, 'ise *chhor* do,'],
  [17.68, 18.64, 'is pe *time* zaaya mat karo'],
  [18.68, 19.98, 'aur jo jobs *achhi* thi,'],
  [20.06, 21.1, 'unke liye *Claude* ne har'],
  [21.1, 21.92, 'job ke hisaab se'],
  [21.92, 22.72, 'alag *CV* banayi,'],
  [22.72, 23.78, '*form* ke sawalon ke'],
  [23.78, 24.38, 'jawab likhe'],
  [24.38, 25.12, 'aur *recruiter* ko'],
  [25.12, 25.98, 'bhejne wala *message*'],
  [25.98, 26.72, 'bhi tayyar kar diya'],
  [26.72, 27.8, 'aur maze ki baat ye hai'],
  [27.8, 28.46, 'ke ye khud kuch'],
  [28.46, 29.2, '*submit* nahi karta'],
  [29.2, 30.02, 'sab kuch *aap*'],
  [30.02, 30.72, 'dekhte ho aur'],
  [30.72, 31.52, '*apply* bhi aap'],
  [31.52, 32.08, 'khud karte ho'],
  [32.08, 33.2, 'is tarah us bande ne'],
  [33.2, 34.32, 'sirf *68* jagah'],
  [34.32, 34.84, 'apply kiya,'],
  [34.86, 35.7, '*12 interviews* aaye,'],
  [35.76, 36.54, 'isi dauran use'],
  [36.54, 37.32, '*AI* ki ek'],
  [37.32, 38.16, 'bari *job* bhi mil gayi'],
  [38.16, 39.06, 'aur ye poora system'],
  [39.06, 39.84, 'bilkul *free*'],
  [39.84, 40.68, 'aur *open source* hai'],
  [40.68, 41.48, 'is tool ka naam hai'],
  [41.48, 42.14, '*Career-Ops*'],
  [42.24, 42.7, 'jao jaa kar'],
  [42.7, 43.14, '*try* karo'],
  [43.14, 43.82, 'aur aisi aur'],
  [43.82, 44.5, '*videos* ke liye'],
])

// karaoke captions (second caption reference): each chunk's words turn from grey to black as they are spoken.
// Word times are spread over the chunk by word length (chunks are 2-4 words, under ~1.3s).
for (const c of CAPS) {
  const words = c.txt.replace(/\*/g, '').split(/\s+/)
  const total = words.reduce((n, w) => n + w.length + 1, 0)
  let acc = 0
  c.el.innerHTML = '<span>' + words.map((w) => { const k = c.a + (c.b - c.a) * (acc / total) * 0.92; acc += w.length + 1; return `<b data-k="${k.toFixed(3)}">${w}</b>` }).join(' ') + '</span>'
  c.words = [...c.el.querySelectorAll('b')]
}
on((t) => { for (const c of CAPS) if (t > c.a - 0.3 && t < c.b + 0.4) c.words.forEach((b) => b.classList.toggle('on', t >= +b.dataset.k)) })
