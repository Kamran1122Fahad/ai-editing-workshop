# House rules (from real client feedback)

## Format and quality gates
- 1080x1920, 30 fps, H.264; full file + `_preview.mp4`. `verify.py` must pass: frame count, -14 LUFS, true peak
  under -1 dBTP, A/V sync +0.0 ms.
- Look at `render.mjs sheet` and full-size stills at every entrance, morph and dense moment before the final render.
  Expect two or three fix rounds; that loop is where quality comes from.

## Safe zones (Instagram Reels, TikTok, YouTube Shorts)
- Top 0-220: status bar / app header. Keep graphics from y 230.
- Right edge x > 960 in y 1100-1750: like / comment / share buttons. Nothing important there.
- Bottom: nothing important below y 1540 (username, caption, music line).
- Left/right margins 60-70 px for text. In a top/bottom split the graphics panel is y 230-930.
- Captions: on the seam in splits; at y 1440-1480 on a full face; at the top (y 330) during full-screen scenes;
  never over the mouth; never below 1460 when the layout puts them low.

## What clients asked for (do it this way by default)
- **Face in a split**: the whole head and hair visible with a little space above the head. If the head is cut,
  move the seam up and the face lower (`fy` larger / `y` smaller).
- **Straight split**: when asked for half/half, it is exactly y 960, `r: 0`, `seamShadow: 0`. No curve, no shadow.
- **Intro**: either the full A-roll first then animate into the graphics intro, or (when asked "no person in the
  intro") a full-screen graphics intro with the face sliding in after it.
- **Captions**: in the language spoken, Roman script as spoken (Roman Urdu / Hinglish), 2-4 words, readable size;
  smaller rather than bigger; centred on the seam. When the client says the captions are good, don't touch them.
- **Variety**: change the animation style section to section; make graphics explanatory (they act out the sentence),
  minimal (one idea per card), no excessive text, no random zooms, no generic "AI-looking" stock motion.
- **Branded characters**: recognisable from the client's reference art (cut it out with `cut_sprite.py`); official
  logos from Simple Icons (`https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/<slug>.svg`).
- **Big scenes**: when asked for "massive / cinematic", build scale (thousands of small figures painted once on a
  canvas from a seeded RNG), light (sun shafts, haze, vignette), a camera that never stands still, and keep the
  characters the main focus. Overlay data (graphs) as a clean UI panel inside the same scene, below the action.
- **Horizontal footage**: never crop, stretch, zoom or distort the person. Recompose the layout around the footage.
- **New video = new concept**: reuse the style, never the previous video's characters or storyline.

## Honesty
- Graphics state what the speaker says and what sources show. Search to verify claims; when nothing is found, label
  the graphic "concept"; example data "illustrative"; never make a fake news screenshot or post.
- Tell the user which caption lines or names are guesses from unclear audio.

## What was rejected (don't repeat)
- A split where the top of the head was cut off.
- Pixel-font captions with a cyan keyword box (client wanted the clean white-box karaoke style instead).
- Captions too big or not on the seam.
- An intro with the person visible when the client wanted graphics only.
- Generic home-made robots for brands, a flat arena, and a separate chart card: replaced by the client's reference
  characters, a full Colosseum, and the graph under the fighters.
