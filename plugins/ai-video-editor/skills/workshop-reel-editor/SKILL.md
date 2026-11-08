---
name: workshop-reel-editor
description: Edit talking-head videos into finished 9:16 Instagram Reels, TikToks and YouTube Shorts in the AI Editing Workshop house styles - cream split with karaoke captions, clean straight half-split with mono hard-cut captions, pixel 2D characters around uncropped 16:9 footage, full-screen 2D scenes and character fights with a UI graph - with motion graphics timed to the words, captions in the language spoken (Roman Urdu / Hindi / Hinglish / English), synced sound effects and -14 LUFS mastering. Rendered frame by frame from HTML with Playwright + ffmpeg. Use whenever the user drops a video and asks to edit it, make a reel / short / TikTok, add captions, motion graphics, split screen, 2D animation or B-roll, convert horizontal footage to vertical, or "edit it like the workshop style", even if they only say "edit this video".
---

# Workshop reel editor

Turns a talking-head clip (vertical or horizontal) plus the user's references into a finished 1080x1920 30fps reel.
The edit is code: `edit.js` places every element on springs keyed to the speech, `reel/engine.js` turns it into
`seek(t)`, `scripts/render.mjs` screenshots each subframe with Playwright and ffmpeg blends and encodes them.

This skill is built on the open-source reel-editor by sunith vs (Apache-2.0, see NOTICE). On top of it, it adds the
AI Editing Workshop house styles, presets, fixes and rules that came out of real client edits.

## Pick a style first

Read `references/styles.md` (exact colors, fonts, layouts, springs, timings) and choose with the user's references:

| Style | Use when | Preset | Worked edit |
|---|---|---|---|
| **cream-karaoke** | vertical selfie footage, explainer, "tool / tip" reels | `--style cream-karaoke` | `examples/claude-jobs/` |
| **clean-split** | vertical footage, news / business / tech commentary; exact half-half straight split | `--style clean-split` | `examples/chatgpt-business/` |
| **pixel-16x9** | HORIZONTAL 16:9 footage that must not be cropped; pixel 2D characters and full-screen scenes | `--style pixel-16x9` | `examples/content-career/` |
| **arena fight** (add-on) | "X vs Y" moments: two characters fight in a crowded arena, comparison graph under them | none (copy from the example) | `examples/chatgpt-business/` + `references/arena-fight.md` |

When the user sends a reference video, its look wins over the preset: make a contact sheet of it
(`ffmpeg -i ref.mp4 -vf "fps=2,scale=200:-2,tile=8x6:padding=3:color=white" -frames:v 1 sheet.jpg`), look at it,
and match its typography, caption behaviour, layout and motion. When the user sends a voice note with instructions,
transcribe it (`transcribe.py` works on any audio) and follow every instruction in it.

## House rules (from client feedback; never break these)

Read `references/house-rules.md`. The short version:
- 1080x1920, 30fps, -14 LUFS, A/V sync +0.0 ms (verify.py). Nothing important in the platform UI zones.
- **Never crop, stretch or zoom a person to fill 9:16.** Horizontal footage stays whole (`references/horizontal-footage.md`).
- In a split, the whole head and hair show with a little space above the head. Split edges are straight when asked.
- Captions in the language spoken, written the way the speaker says it (Roman Urdu / Hinglish), 2-4 words a chunk,
  on the seam between graphics and face. Never over the mouth.
- When the user says the intro has "no person", the intro is full-screen graphics (`OFF` layout) and the face slides in after.
- Vary the animation styles section to section (slide, type-on, wipe, pop, pin drop, shatter, cursor click); never
  repeat one entrance for the whole video. Minimal: one idea per card, few words, no random zooms, no clutter.
- Branded characters or logos: follow the user's reference art exactly (cut it out with `scripts/cut_sprite.py`), or
  use official marks (Simple Icons). Don't invent lookalikes.
- Fact-check claims; mark unsourced graphics "concept" and example data "illustrative"; never fake a news screenshot.

## Setup

```bash
bash <skill dir>/scripts/new_project.sh "<project dir>" --style <cream-karaoke|clean-split|pixel-16x9> [video ...]
```

`<skill dir>` is this skill's folder (the directory holding this SKILL.md; shown as the base directory when the
skill loads). It works the same from a plugin install, `~/.claude/skills/reel-editor` or a project's `.claude/skills/`.

The project dir is the folder the user named or put the video in (a new folder per reel, inside their reels folder
if there is one). The script copies the template (`index.html`, starter `edit.js`, `reel/` engine, `scripts/`),
moves the videos into `source/`, installs Playwright and reports missing tools (ffmpeg, node, uv; avconvert or
ffmpeg zscale for HDR). Folder names with spaces are fine; quote them.

## Workflow

Work through these in order; steps 2 and 4 can run at the same time (assembling HDR footage takes minutes).

**1. Look at the source.** `bash scripts/probe.sh source/<video>` prints format, HDR, audio level and writes a
contact sheet: view it. Note where the face sits (the `focus` point: between the eyes and chin, in source pixels,
about (540, 620-820) for a phone selfie, lower when the person sits further from the camera; note the hair top too),
whether the background is plain (text can sit over it) and whether there are retakes or dead air. In HOOK the wall
band free for cards runs from y 230 to the hair, at about `fy - (focus.y - hairTop) * 1.25` (fy = `LAYOUTS.HOOK.fy`):
around 180px for a selfie framed with little headroom, so wall cards hold one or two short lines.

**2. Assemble** `source/edit.mp4`, the single clip everything else reads:
**Horizontal footage that must stay whole (pixel-16x9): `bash scripts/assemble_wide.sh` instead (no crop, runs prep.sh too), see `references/horizontal-footage.md`.** Otherwise `uv run scripts/assemble.py` (every video in `source/`, full length) or `uv run scripts/assemble.py edl.json` with
`{"clips": [{"src": "source/A.MOV", "in": 0.4, "out": 21.8}, ...]}` to trim the head and tail, drop retakes or join
takes. It tonemaps HDR, crops to 9:16 (`FOCUS_X=` for horizontal footage) and normalizes to 30fps. HDR tonemapping
usually takes about a minute per minute of footage but has taken 8; run it in the background. Only cut what you understand: in another language a "pause" in the energy is often quiet
speech, so cut the obvious (before the first word, after the last, a clear retake) and leave the rest.
Then `bash scripts/prep.sh` (face frames, voice wavs, `tmp/meta.js`).

**3. Transcribe.** `uv run scripts/transcribe.py` writes `audio/outline.txt`: transcript, word times, speech runs.
Mixed Urdu/Hindi/English speech often comes out as garbage or invented words: cut unclear stretches into 3-5 s wavs with ffmpeg and transcribe each with language `ur`, `hi` and `en` (faster-whisper, `HF_HUB_OFFLINE=1`), then compare. Write captions in Roman script as spoken. For non-English speech it also runs whisper's English translation (meaning, segment timing) and a forced-English pass
whose word timestamps locate the English loanwords people mix in ("Photoshop", "open source", product names). Those
loanwords are the anchors graphics land on. The native-script pass is often garbage for Indic languages; don't use it
for captions. Read the whole outline and write down the story beat by beat before designing anything.

**4. Gather assets** from the links the user gave (and the product site if there is one). View every image you plan
to use so you know what is in it.
- X posts: `uv run scripts/fetch_x.py <url>` (text, stats, video/photos into `assets/x/<id>/`) and
  `node scripts/capture.mjs tweet <url> <name>` for the real post card (crop the tall card with ffmpeg `crop=`).
- Websites: `node scripts/capture.mjs site <url> <name> [--desktop]` saves screenshots plus a JSON of every image
  (icons, product shots: download the originals with curl), the brand fonts and colors. Match the brand:
  `bash scripts/fonts.sh "<Family>:<axes>" <name>` and override `--font-*` / colors in `index.html`.
- Stock footage, music, sound effects: `uv run scripts/stock.py video|music|sfx "<query>" [--portrait]`, look at
  `tmp/stock_results.jpg`, `get <n> --name <slug>` (licenses recorded in `assets/credits.json`; put credits in the
  post caption). Sources, keys and licenses: `references/stock.md`.
- Video b-roll (the post's video, screen recordings): `bash scripts/frames.sh <video> <name> [start] [dur] [width]`
  gives a JPEG sequence for `browserCard` / `seqFrame`. Look at its contact sheet (`probe.sh`) to pick the section.

**5. Plan the edit** as a table in the header comment of `edit.js`: time range, face layout, what is on screen, the
word it lands on. Read `references/design.md` first. The short version:
- Hook in the first 2 seconds (the claim, the post that went viral, the surprising number); the first frame is the
  thumbnail, so have the hook already on screen at t=0.
- Change something every 2-4 seconds: a layout morph, a new card, a punch-in. Alternate graphic-heavy sections
  (split, pip) with full-face beats so the person stays present.
- Each section says one thing in a few words. Graphics carry the keywords; captions carry the sentence.
- End on a call to action and the URL/handle.

**6. Build** `edit.js` with the engine API (`references/engine-api.md`). `reel()` config, `faceAt()` layout
timeline, one `layer('name')` per section (the name labels its clip in the editor kit), elements timed with `at()` / `stagger()`, components (`chip`, `text`,
`wallCard`, `imageCard`, `browserCard`, `terminal`, `stamp`, `highlight`, `strike`, `codeCard`, `iconGrid`,
`streaks`, `emojiRise`, and the characters `clawd` (the Claude Code mascot) and `mascot`), sounds with `cue()` (most
components add their own), then `captions()`. Characters make strong hooks: one acting out the claim ("Claude
edited this reel": Clawd cutting the clip) beats a static card. Anything custom is
an `on(t => ...)` that computes styles from `t` (the examples have counters, rings, cut timelines, playheads).

**7. Check visually, then fix.** `node scripts/render.mjs sheet` (a frame every 0.5s) for flow, then
`node scripts/render.mjs stills <t> <t> ...` at every entrance, morph and dense moment, and look at them at full size.
Check: captions never cross the mouth; text is legible over the background; nothing clipped at the edges or hidden
under platform UI (safe zones in design.md); no empty panel lingers; graphics land on their words; emoji and fonts
rendered. Iterate until clean. This loop is where the quality comes from; expect two or three rounds.

**8. Audio.** `uv run scripts/mix_audio.py` (reads `out/cues.json`, written by every render run): cleans the voice,
removes the denoiser's latency, places synthesized UI sounds on the cues, masters to -14 LUFS (one gain and a peak
limiter, so the editor kit's stems add up to the mix exactly). Add a music bed only
when asked (`audio/music.mp3`, ducked automatically); creators usually add trending audio in the app.

**9. Render and verify.** `node scripts/render.mjs full` (writes `out/<name>.mp4` and a small `_preview.mp4`), then
`uv run scripts/verify.py`: 1080x1920, frame count, -14 LUFS, true peak, A/V sync against `source/edit.mp4`.
After changing only audio: `node scripts/render.mjs mux`.

**Variants (when asked for several versions / hooks, or for Instagram trial reels).** Don't duplicate the edit.
`variants({ v1: {}, v2: { segments: [[0, 5.8], [47.5, 53], [5.8, 47.45], [53, 57.1]] }, ... })` at the end of
`edit.js` re-cuts the same take: each segment is a stretch of source time, in output order; graphics, captions, face
frames and sound cues follow their segment, layouts snap into place at each cut. Typical variants: the offer (webinar,
workshop, registration, giveaway) moved right after the hook; a cold open on the boldest line (a claim, a number, a
"this is NOT ..."); a shorter cut without a middle section. Put every cut in a pause (speech runs in the outline),
check stills just before and after each cut, then `bash scripts/render_variants.sh` (cues, mix, render and verify
per variant). Variant-only extras go in `setup()` with `atOut()` / `cueOut()` in output time.

**Editor kit (when the user, or an editor they work with, wants to change the edit by hand).**
`node scripts/render.mjs kit [--formats prores,key] [--zip]` writes `out/kit/<name>/`: the master, the background,
the face with its layouts, one clip per graphics section (placed by the start time in its name), styled captions plus
`04_captions.srt`, `05_audio/` (voice, sfx, music, every sound effect on its own, `cues.csv`), `06_timeline/`
(`Premiere_timeline.xml` / `Resolve_timeline.xml`: File > Import opens a sequence with every layer and sound on its
track; one Link Media relink if the kit moved), `layers.json` and a README with import steps for Premiere, Resolve,
Final Cut, CapCut and VN. Formats: `prores` (ProRes 4444, the pro
default, about 1 GB per minute of face), `hevc` (tiny, Apple only), `key` (a chroma-key colour each clip doesn't use;
for CapCut mobile / VN), `black`, `rle` (CapCut Windows), `png`, `webm`. It reuses `out/<name>.mp4` when the edit is
unchanged, takes about 4x a render, and checks itself (layers restacked vs the master, stems summed vs the mix).
Name sections (`layer('hook')`) so the clips are easy to find. Variants: `VARIANT=v2 node scripts/render.mjs kit`.

**10. Deliver.** Send the preview (file tools often cap at 30 MB; the full file is for uploading) and give the path of
the full file. Summarize the edit as a short time/what table and list what the user should check: translated
caption wording, credit for third-party posts and videos (on screen and in the post caption), any illustrative
content (example code, mock UI), music. Offer a no-captions render (`CAPTIONS=0 node scripts/render.mjs full`), and
an editor kit if someone will touch the edit by hand.

## Gotchas (each one cost a render)

- **Engine globals**: don't name your own helpers `dots`, `chip`, `text`, `label`, `stamp`, `mascot` etc.; the engine
  already defines them (a clash throws and the page renders empty). Use names like `tag`, `box`, `win`.
- **Hidden face still casts a shadow**: when the face is parked below the frame (`OFF`, y 2010), set `seamShadow: 0`
  in `reel()` so no shadow band shows at the bottom.
- **Custom Playwright preview scripts render blank** unless they run `addInitScript(() => window.__RENDER__ = true)`
  before load and call `window.ready()`. Prefer `render.mjs stills`.
- **Full-screen article under a face circle**: put the article in `layerUnder()` so it never covers the face.
- **Pixel fonts**: check every letter at size (Pixelify Sans "C" reads as "Q"); Silkscreen and Jersey 10 are safe.
- **zsh loops**: `for p in a:b c:d` with `${p%%:*}` / `${p##*:}`; don't rely on word splitting.
- **Disk space**: renders write one JPEG per subframe into `tmp/`. Delete old `tmp/frames` of finished projects;
  a full disk stops every command.

- **HDR iPhone footage** (`color_transfer=arib-std-b67` HLG or `smpte2084` PQ) decoded straight to 8-bit is washed
  out and gray. `assemble.py` tonemaps it (macOS `avconvert`, which can take several minutes, or ffmpeg zscale).
  Homebrew ffmpeg often has no zscale, drawtext or libplacebo; never rely on ffmpeg for text, the HTML draws it.
- **Motion blur needs 6 subframes.** Two show fast morphs as two distinct ghost copies, four still step on the
  fastest layout changes. The default is 6 over a 180-degree shutter (a 57s reel renders in about 4 minutes); the
  engine rounds each subframe to the same face frame so the face itself never ghosts.
- **Shakes under ~10 Hz.** Faster shakes alias at 30fps into jitter and doubled text.
- **Captions over the mouth** happen in split layout if captions stay at chest height; the engine moves them to the
  seam per layout (`REEL.captionY`). Captions sit on a dark pill so colored keywords stay legible over a shirt or
  a busy background. Drop the caption where an on-screen card already says the same sentence (e.g. the CTA).
- **Voice denoise delays audio ~25 ms**; `mix_audio.py` measures it on 8 kHz mono copies (correlating decimated or
  single-channel audio locked onto wrong peaks) and removes it. `verify.py` checks sync; expect +0.0 ms.
- **Playwright browser mismatch**: scripts launch the system Chrome first, then bundled chromium.
- **Whisper**: `transcribe.py` prefers an already cached faster-whisper model and goes offline when one exists (a
  fresh download can stall). Code-mixed speech is detected as the native language; that's expected.
- **`text-transform: uppercase`** on `.mono` labels also uppercases URLs; give URL elements the `url` class.
- **Measure text after fonts load**: components that need widths (`strike`) measure lazily on the first seek.
- **Every style must be a function of t.** No CSS transitions or animations, no `setTimeout`, no state that depends
  on the previous frame (the renderer seeks out of order in 6 parallel pages, and variants jump around the source).
  That includes early returns: an `on()` that returns early after its section must still hide what it drives, or an
  element keeps whatever an earlier frame left (a sticker stuck in the corner of every later frame). Cache derived
  values only if they are pure (a measured width, a release point computed from constants).

## Content honesty

Graphics state what the speaker says and what the sources show. Don't invent numbers, features, quotes, prices or
availability, and don't add qualifiers the speaker didn't say ("LIVE", "free", a date). Illustrative code or UI is
fine when it reads as an illustration. When the translation of a line is unclear, leave that caption out (a card can
carry the idea in safer words) and tell the user which line it was. Use the real post card from the
official embed rather than recreating a post, and credit the author on screen when showing their post or video.

## Files

```
scripts/new_project.sh        scaffold a project (run from the skill)
assets/project/               template copied into each project
  index.html, edit.js         compositor page and starter edit
  reel/engine.js, engine.css  the engine (springs, layouts, components, captions, seek API), default fonts
  scripts/                    probe, assemble, prep, transcribe, fetch_x, capture, fonts, frames,
                              render, kit (editor kit: kit.mjs renders the layers, kit.py assembles and checks
                              them, xmeml.py writes the Premiere / Resolve XML), mix_audio, verify
references/engine-api.md      every engine function and option
references/design.md          layouts and coordinates, safe zones, type scale, pacing, captions, sound
examples/artcraft/edit.js     worked edit: product / app-suite explainer
examples/reel-with-claude/    worked edit: process / behind-the-scenes reel
examples/claude-jobs/         workshop: cream-karaoke (Roman Urdu karaoke captions, counters, funnel, CTA)
examples/chatgpt-business/    workshop: clean-split + Colosseum robot fight + UI graph, news article highlight,
                              typed chat, map pin, toggle, cursor click, profile follow card
examples/content-career/      workshop: pixel-16x9 (uncropped 16:9), pixel creator character, full-screen scenes
assets/presets/<style>/       index.html + starter edit.js per house style (new_project.sh --style)
scripts (project):            assemble_wide.sh (16:9 kept whole), cut_sprite.py (cut characters from a reference)
references/styles.md          the house styles: exact settings
references/house-rules.md     rules, safe zones, what clients rejected
references/horizontal-footage.md  16:9 inside 9:16 without cropping
references/pixel-kit.md       pixel sprites and jointed characters
references/arena-fight.md     character fight scene + graph overlay
```

The examples' own assets (client footage, screenshots, character art) are not included; read them for patterns.
