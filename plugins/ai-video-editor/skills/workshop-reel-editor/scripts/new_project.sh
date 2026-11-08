#!/usr/bin/env bash
# Starts a reel project: copies the compositor template and scripts, moves the given videos into source/,
# installs Playwright, and checks the tools.
#   bash <skill>/scripts/new_project.sh <project-dir> [--style cream-karaoke|clean-split|pixel-16x9] [video ...]
# --style copies that preset's index.html and starter edit.js (assets/presets/<style>/) into a NEW project.
# Existing edit.js / index.html in the project are never overwritten; engine and scripts are refreshed.
set -euo pipefail
SKILL="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$1"; shift || true
STYLE=""
if [ "${1:-}" = "--style" ]; then STYLE="$2"; shift 2; [ -d "$SKILL/assets/presets/$STYLE" ] || { echo "unknown style $STYLE (have: $(ls "$SKILL/assets/presets" | tr '\n' ' '))"; exit 1; }; fi
mkdir -p "$DIR"/{source,assets/shots,assets/broll,assets/icons,assets/fonts,audio,out,tmp}
DIR="$(cd "$DIR" && pwd)"

cp -R "$SKILL/assets/project/reel" "$SKILL/assets/project/scripts" "$DIR/"
if [ -n "$STYLE" ]; then
  for f in index.html edit.js; do [ -e "$DIR/$f" ] || { cp "$SKILL/assets/presets/$STYLE/$f" "$DIR/$f"; echo "style $STYLE: $f"; }; done
fi
for f in index.html edit.js package.json; do [ -e "$DIR/$f" ] || cp "$SKILL/assets/project/$f" "$DIR/$f"; done
for v in "$@"; do
  [ -f "$v" ] || { echo "skip $v (not a file)"; continue; }
  mv -n "$v" "$DIR/source/" && echo "moved $(basename "$v") -> source/"
done

cd "$DIR"
[ -d node_modules/playwright ] || npm install --silent --no-audit --no-fund >/dev/null 2>&1 || echo "npm install failed: run it in $DIR"

echo
echo "tools:"
for t in ffmpeg ffprobe node uv; do printf "  %-8s %s\n" "$t" "$(command -v $t || echo MISSING)"; done
printf "  %-8s %s\n" avconvert "$(command -v avconvert || echo 'missing (only needed for HDR on macOS; ffmpeg zscale is the fallback)')"
ffmpeg -hide_banner -filters 2>/dev/null | grep -q " zscale " && echo "  ffmpeg zscale: yes" || echo "  ffmpeg zscale: no"
[ -d "/Applications/Google Chrome.app" ] && echo "  chrome: system Chrome (render uses it)" || echo "  chrome: not found, render falls back to playwright chromium (npx playwright install chromium)"
echo
echo "project: $DIR"
ls source
