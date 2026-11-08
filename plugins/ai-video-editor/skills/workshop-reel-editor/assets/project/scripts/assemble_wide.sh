#!/usr/bin/env bash
# Horizontal (16:9) footage, kept WHOLE: builds source/edit.mp4 at the source size, 30fps, NO 9:16 crop, then runs prep.sh.
# Use instead of assemble.py with the pixel-16x9 style (index.html sets #faceImg to 1920x1080).
#   bash scripts/assemble_wide.sh [source/main.mp4]
set -euo pipefail
cd "$(dirname "$0")/.."
SRC="${1:-$(ls source/* | grep -v 'source/edit.mp4' | head -1)}"
ffmpeg -v error -y -i "$SRC" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" \
  -c:v libx264 -crf 16 -preset fast -c:a aac -ar 48000 -b:a 256k source/edit.mp4
echo "built source/edit.mp4 (1920x1080, uncropped) from $SRC"
bash scripts/prep.sh
