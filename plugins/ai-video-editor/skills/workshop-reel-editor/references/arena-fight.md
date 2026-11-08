# Arena fight add-on (copy from examples/chatgpt-business/edit.js, section "the Colosseum fight")

## Characters
1. Get the client's reference art for both fighters (one image on a white background works).
2. `uv run scripts/cut_sprite.py ref.png assets/bots left --split <x between them> right` → transparent PNGs.
   Check them over a red background: `ffmpeg -f lavfi -i color=c=#C8473D:s=1100x700 -i assets/bots/left.png -filter_complex overlay=20:20:shortest=1 -frames:v 1 chk.png`.
3. Set `SPRITE = { g: { src, w, h, ax }, c: {...} }` (ax = x of the feet centre in the PNG) and scale `SC` (0.56 was
   right for ~600-900 px tall art). Fighters stand at `GX0`/`CX0` on the floor line `FEET`, facing each other in
   the first frame; leave space so they never overlap at rest.

## Arena (painted once, pure function of t)
- World 1200x2000 at (-60, -40); canvases painted at load from a seeded RNG (`rng(seed)`, mulberry32) so every frame
  is identical on re-render: sky + sun, curved tiers (`BANDS`, `curveY`), arcades, podium, banners, gate, raked sand.
- Crowd painted three times: idle A, idle B (swap every 0.2 s = shimmer) and cheer (arms up), shown on every hit.
- Light: shafts gradient, haze over far tiers, vignette, drifting motes, dust kicked at take-off and landing.

## Fight timing
```js
const SCENES = [
  { tIn: -1, tOut: 2.3, flex: [[0.02, 'c'], [0.9, 'g']], hits: [[1.4, 'ko']], push: [1.0, 1.07] },
  { tIn: 20.16, tOut: 24.36, flex: [], hits: [[21.24, 'clash'], [22.66, 'hit'], [23.72, 'ko']], push: [1.0, 1.06] },
]
```
- `flex` on each fighter's name; `hits` on the spoken words: `clash` (blocked by a shield), `hit`, `ko`.
- `poseAt(t, sc)`: wind-up 0.34-0.18 s before the hit, leap 0.18 s, recover 0.5 s; on K.O. the loser spins
  off-screen (760 px, 540°) and fades; the winner does victory hops.
- `camAt(t, sc)`: slow push over the scene, punch-in + tilt on each hit toward the contact point, zoom on the winner
  after the K.O.
- FX at the contact point: 14 sparks, a shock ring, `shake(k, 9 or 18, 8)`, sounds whoosh → thunk/stamp → success,
  "K.O." in Silkscreen 170px `#FFD23F` slams in (`S(t - ko - 0.12, 4, 0.5)`).

## HUD and graph
- Health bars at y 240 (team colours, icons, "ROUND n" in Silkscreen); the loser's bar drains on the hits.
- Graph: dark glass panel under the fighters (top y 1338, height 190, width 730, inside the safe zone); winner's line
  rises from the first hit, loser's falls from the second, both end in team badges with ▲/▼ labels; title one line.
  Label it illustrative unless the numbers are real.
- Captions at the top (`captionY.OFF: 330`) so they never cover the fighters or the graph. Face layout `OFF`.
