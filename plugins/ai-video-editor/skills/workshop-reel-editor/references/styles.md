# Workshop house styles: exact settings

All styles: 1080x1920, 30 fps, motion blur 6 subframes over a 0.5-frame shutter (render.mjs defaults), -14 LUFS.
Spring presets (`SPR` in the engine; f = Hz, z = damping, below 1 overshoots):
`morph {2.1, .84}` layout changes · `punch {4.2, .82}` · `enter {3.2, 1}` · `exit {7, 1}` · `pop {3.4, .6}` ·
`snap {3, .72}` · `slam {4.4, .48}` stamps/cards landing · `line {2.6, 1}` wipes/highlights.
Custom easing used: `easeIn = x => x*x*x`, `easeOut = x => 1 - (1-x)**3`.

## 1. cream-karaoke  (preset `cream-karaoke`, worked edit `examples/claude-jobs/`)
- **Look**: cream stage `#F6F1E7` with a faint grid; black headline card (radius 36, `#15151A`), white cards, pixel
  titles in Silkscreen, display numbers 76px/900 in yellow `#FFD23F`. Palette INK `#15151A`, BLUE `#2D6BFF`,
  CYAN `#1AA3FF`, GREEN `#1FB86A`, RED `#F0453A`.
- **Layout**: `SPLIT { x:0, y:920, w:1080, h:1050, r:56, s:1, fx:<face x>, fy:500 }` (face LOW: whole head + room
  above), `face.headHeight 560`. captionY `{ SPLIT:880, FULL:1480, HOOK:1480, PUNCH:1480, PIP:1470 }`.
- **Intro**: `faceAt([[-1,'FULL'],[0.98,'SPLIT'], ...])`: the full A-roll first, then it morphs down and the
  motion-graphics intro comes in above it.
- **Rhythm**: split → full face → split → small face card (PIP) → split → full face → ... a change every 2-4 s.
- **Motion**: headline drops in with `SPR.slam`, counters count up (`on(t => ...)`), stars/bars fill, SKIP stamps,
  funnel numbers, chips `stagger` with `SPR.pop`. A sound cue on every card and layout change.
- **Captions**: white rounded box, Poppins 700 44px / line-height 80, words grey `#C9C9C9` turning black `#111114` as
  spoken (karaoke block at the end of the preset edit.js), centred on the seam.
- **Intro-only export** (graphics without face/captions, for other editors): render with `CAPTIONS=0`, hide the face,
  then blend and trim the frames with
  `format=rgba,premultiply=inplace=1,tmix=frames=6,select='eq(mod(n\,6)\,5)',setpts=N/(30*TB),unpremultiply=inplace=1,trim=start=<t0>:duration=5,setpts=PTS-STARTPTS`
  and write an MP4 on the background plus a ProRes 4444 `.mov` with alpha.

## 2. clean-split  (preset `clean-split`, worked edit `examples/chatgpt-business/`)
- **Look**: flat warm grey `#EEEDEA` (no grid), white UI cards radius 22 with
  `box-shadow:0 1px 0 rgba(0,0,0,.04),0 18px 40px -18px rgba(40,36,30,.28)`, app windows with traffic-light dots.
  Palette INK `#1C1B19`, MUTED `#77746E`, LINE `#E6E4DF`, GREEN `#10A37F`, RED `#E5484D`, BLUE `#3B6FF5`.
- **Layout**: exact half/half, straight plain edge: `SPLIT { x:0, y:960, w:1080, h:960, r:0, s:1, fx:<x>, fy:400 }`,
  `seamShadow: 0`. `OFF { y:2010 }` hides the face (full-screen intro / scenes). `CIRCLE { x:620, y:250, w:400,
  h:400, r:200, s:0.5, fx:200, fy:222 }` = face circle top right over a full-screen article (article in `layerUnder`).
- **Captions**: Geist Mono 500, 38px / 64, letter-spacing 4px, uppercase, white on `#2B2A28` box (padding 8px 18px
  9px, radius 7), 2-3 words, HARD CUTS: `capShow: { dy:0, dyOut:0, sc:1, blur:0, sin:{f:30,z:1}, sout:{f:30,z:1} }`.
  captionY `{ SPLIT:928, FULL:1440, CIRCLE:1430, OFF:330 }` (at the top during full-screen scenes).
- **Graphics area**: y 230-930, x 60-1020.
- **A different animation per section** (all in the worked edit): form slides out while the next window pushes up
  (`slide`), typed question with blinking caret (`typed`), map pin drop on the word, word-by-word equation
  ("A = B 📍"), chart wipe with dots riding the line tips, toggle that tries to switch on and snaps back + progress
  bar, rows slide in + cursor clicks a button, title types out + steps light up along a drawn line, heart burst.
- **News highlight**: real article screenshot (`capture.mjs site <url> name`) full screen, slow scroll, red marker
  sweeps over the phrases as they are spoken, on-screen credit "Source: <outlet> · <date>".
- **Follow card**: the creator's real profile screenshot slides in with Like + Follow buttons; heart burst on "like",
  ring pulse on the logo on the name, cursor taps Follow → "Following ✓" on "follow".

## 3. pixel-16x9  (preset `pixel-16x9`, worked edit `examples/content-career/`)
- **Footage**: horizontal 16:9 kept WHOLE. See `horizontal-footage.md`. Layouts FOOT / TOP / CARD / OFF.
- **Look**: warm grey stage `#EEEDEA`, white scene cards radius 26, pixel art with thick ink outlines `#1C1B19`,
  RED `#E5484D`, GREEN `#22A06B`, GOLD `#F2B705`, pastel sky gradients and green ground (`landscape()`).
- **Characters**: a pixel creator built for the topic (glasses, hair, beard, hoodie with a logo) with jointed arms and
  legs, walk cycle, sweat drop; props as pixel sprites (play tile, coin, flag, shop, office, camera, castle, rock,
  cloud). Make NEW characters per video that match its speaker and topic; see `pixel-kit.md`.
- **Tags**: Silkscreen 24px, white on ink (or red/green), height 54, radius 12, `box-shadow:0 6px 0 rgba(0,0,0,.18)`.
- **Captions**: as clean-split. captionY `{ FOOT:860, TOP:874, CARD:932, OFF:1400 }`.
- **Scene ideas that worked** (each acts out the sentence): wobbly tower of video tiles = "only content"; tangled path
  to a flag = "tricky question"; one plank over a chasm that wobbles, warning sign, cracks = "risky"; pillars rise =
  "backing"; buildings on a foundation of content tiles = "built on content"; camera follows him walking past
  stations 1-2-3 = a step-by-step model; perspective road to the horizon with camera pull-back = "long road";
  pushing a boulder uphill = "not as easy as it looks".
- **Camera in full-screen scenes**: wrap the scene in a world div and scale/translate it from t, e.g.
  `push = 1.16 + 0.06*smooth(p)`, `tx = 540 - focusX*push`, `ty = 1080 - groundY*push` (keeps the ground line at the
  bottom edge, no gap). A scene can shrink into a card (clip-path + scale) when the footage comes back.

## 4. arena fight add-on  (`arena-fight.md`, code in `examples/chatgpt-business/edit.js`)
Two characters (the user's reference art, cut out) fight in a painted Roman Colosseum with ~5,000 spectators, light
shafts, haze and dust; health bars + "ROUND n"; hits on the spoken words; K.O. slam; a dark-glass comparison graph
under the fighters whose lines move on the hits. Captions at the top (y 330). Face hidden (`OFF`).
