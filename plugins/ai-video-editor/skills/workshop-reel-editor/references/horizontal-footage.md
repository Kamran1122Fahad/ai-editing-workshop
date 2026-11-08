# 16:9 footage inside a 9:16 reel, never cropped

1. Scaffold with `--style pixel-16x9` (its `index.html` sets `#faceImg { width:1920px; height:1080px }`).
2. Build the clip WITHOUT the 9:16 crop: `bash scripts/assemble_wide.sh` (scales/pads to 1920x1080, 30 fps, then
   runs `prep.sh`). Do not run `assemble.py`, it crops to 9:16.
3. Layouts are the whole frame scaled to a width:
   ```js
   const FW = 1920, FH = 1080
   const fit = (x, y, w) => { const s = w / FW; return { x, y, w, h: Math.round(FH * s), s, fx: w / 2, fy: Math.round(FH * s) / 2 } }
   face: { frames: META.faceFrames, focus: { x: FW / 2, y: FH / 2 }, headHeight: 500 },
   layouts: {
     FOOT: { ...fit(0, 930, 1080), r: 0 },   // footage at the bottom, y 930-1538
     TOP:  { ...fit(0, 240, 1080), r: 0 },   // footage at the top, y 240-848
     CARD: { ...fit(90, 1006, 900), r: 30 }, // inset rounded card, y 1006-1512
     OFF:  { ...fit(0, 2010, 1080), r: 0 },  // hidden: full-screen animated scene
   },
   captionY: { FOOT: 860, TOP: 874, CARD: 932, OFF: 1400 },
   seamShadow: 0,
   ```
   `fx/fy` at the centre and `s = w/1920` means the full frame is always visible: face, hands and gestures.
4. Vary them: FOOT for most talking, TOP when the scene needs the bottom, CARD for a quieter beat, OFF whenever a
   full-screen visual explains better. Graphics fill the rest (scene cards 960 wide at x 60).
5. Check stills: the footage edges must be fully inside the frame and nothing of the person cut. A watermark in the
   source shows wherever the footage shows; tell the user.
