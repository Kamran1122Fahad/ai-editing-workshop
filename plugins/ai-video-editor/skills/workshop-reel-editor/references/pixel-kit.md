# Pixel kit (in the pixel-16x9 preset edit.js)

- `pixRects(rows, pal, u)` turns text grids into SVG rects; `.` is empty, each letter a palette colour (`PAL`).
  Draw with `shape-rendering="crispEdges"`; outline everything with `K` (ink).
- `sprite(parent, ART.coin, PAL, u)` → element with `.at(x, y, { s, rot, op })`, x/y = bottom centre.
- `creator(parent, u)` → jointed character with `.set({ x, y, s, flip, rot, armL, armR, legL, legR, op, sweat })`.
  Arms and legs are SVG groups rotated about their joints (`data-px/data-py`).
- `walk(t, on, speed)` → limb angles + bob for a walk cycle. `landscape(parent, w, h, groundY, {sky, ground})`.
- `tag(parent, html, css)` pill labels, `sceneCard(parent, x, y, w, h)`, `vis(el, t, a, b)` fade window,
  `popS(t, k)` pop-in scale.

## Make a new character for each video
Copy `CREATOR_BODY` and redraw it on the grid (14 wide x 19 tall at the body; arms 4x7, legs 4x6) to match the
speaker: hair shape/colour (`H`), skin (`F`), glasses (`K`/`L`), beard, clothes colour (`D`) and a logo on the chest.
Keep the outline weight and proportions so it belongs to the same family. Props: draw 8-20 px wide grids.

## Animate as a function of t
Every `on(t => ...)` computes positions from t only (no state). Pattern per scene:
`if (vis(L, t, start, end) < 0.003) return` → compute sways (`Math.sin(t * f)`), pops (`popS(t, wordTime)`), and
place each sprite. Land every change on a word time from `audio/outline.txt` and add a `cue()` for its sound.
