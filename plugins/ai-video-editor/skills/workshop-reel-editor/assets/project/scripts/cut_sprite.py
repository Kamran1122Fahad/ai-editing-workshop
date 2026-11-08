# /// script
# dependencies = ["pillow", "numpy"]
# ///
"""Cut characters out of a reference image with a plain white/light background (flood fill from the edges).
  uv run scripts/cut_sprite.py <image> <out_dir> [name] [--split X name2]
Writes <out_dir>/<name>.png with a transparent background, cropped to the character. --split X cuts the image into a
left part (name) and a right part (name2) at pixel X, for a reference sheet with two characters side by side.
Check the result over a coloured background before using it (light parts of a character touching the edge can be eaten).
"""
import sys
from collections import deque
import numpy as np
from PIL import Image

args = sys.argv[1:]
if len(args) < 2:
    sys.exit(__doc__)
src, out = args[0], args[1]
name = args[2] if len(args) > 2 and not args[2].startswith('--') else 'sprite'
split = None
if '--split' in args:
    i = args.index('--split'); split = (int(args[i + 1]), args[i + 2])
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(int)
H, W, _ = a.shape
mx, mn = a.max(2), a.min(2)
bgish = (mn > 200) & (mx - mn < 30)  # near-white, unsaturated
seen = np.zeros((H, W), bool); q = deque()
for x in range(W):
    q.append((0, x)); q.append((H - 1, x))
for y in range(H):
    q.append((y, 0)); q.append((y, W - 1))
while q:
    y, x = q.popleft()
    if y < 0 or y >= H or x < 0 or x >= W or seen[y, x] or not bgish[y, x]:
        continue
    seen[y, x] = True
    q.extend(((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)))
rgba = Image.fromarray(np.dstack([a.astype(np.uint8), np.where(seen, 0, 255).astype(np.uint8)]), 'RGBA')
parts = {name: (0, W)} if not split else {name: (0, split[0]), split[1]: (split[0], W)}
for n, (x0, x1) in parts.items():
    c = rgba.crop((x0, 0, x1, H)); bb = c.getbbox(); c = c.crop(bb)
    c.save(f'{out}/{n}.png'); print(n, c.size)
