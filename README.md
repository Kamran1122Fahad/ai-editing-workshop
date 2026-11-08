# AI Editing Workshop: AI Video Editor for Claude Code

Apni talking-head video ek folder mein daalo, Claude ko bolo "edit this video", aur Claude poori reel edit karke dega:
motion graphics jo words par land karti hain, split screens, pixel 2D characters, full-screen animated scenes,
Roman Urdu / Hinglish captions, sound effects aur Instagram/TikTok loudness (-14 LUFS). Output: 1080x1920 MP4.

Drop a talking-head video in a folder, ask Claude Code to edit it, and get a finished 9:16 reel in the workshop styles.

## Styles

| Style | Kis ke liye |
|---|---|
| `cream-karaoke` | Vertical selfie video. Cream background, graphics upar, face neeche, white-box karaoke captions |
| `clean-split` | Vertical video. Exact half/half straight split, white UI cards, mono hard-cut captions |
| `pixel-16x9` | Horizontal 16:9 video, bina crop ke. Pixel 2D characters aur full-screen scenes |
| arena fight | "X vs Y" moments: do characters arena mein fight karte hain, graph neeche |

## Requirements (ek baar install karo)

- macOS ya Linux
- [Claude Code](https://claude.com/claude-code)
- ffmpeg: `brew install ffmpeg`
- Node 18+: `brew install node`
- uv: `brew install uv` (ya `curl -LsSf https://astral.sh/uv/install.sh | sh`)
- Google Chrome (ya `npx playwright install chromium`)

## Install

Claude Code ke andar:

```
/plugin marketplace add Kamran1122Fahad/ai-editing-workshop
/plugin install ai-video-editor@ai-editing-workshop
```

Ya terminal se:

```bash
claude plugin marketplace add Kamran1122Fahad/ai-editing-workshop
claude plugin install ai-video-editor@ai-editing-workshop
```

Phir Claude Code restart karo. Skill `ai-video-editor:workshop-reel-editor` naam se load hogi.

**Bina plugin system ke (manual):**

```bash
git clone https://github.com/Kamran1122Fahad/ai-editing-workshop && cd ai-editing-workshop
./install.sh
```

## Use

Claude Code mein bolo, jaise:

- "~/Reels/video1 mein meri video hai, isko clean-split style mein edit karo, captions Roman Urdu mein"
- "Yeh 16:9 video hai, isko 9:16 mein pixel-16x9 style se edit karo, mera face crop nahi hona chahiye"
- "Is reference video jaisi editing karo" (reference video attach karo)
- "Intro mein do robots fight karein, ChatGPT vs Google" (characters ki image attach karo)

Har video ka apna project folder banta hai: edit `edit.js` mein hai, final video `out/` mein.
Changes chahiye? Bas bolo ("captions chhote karo", "face thoda neeche"), Claude edit.js badal ke dobara render karega.

## Credits and license

Built on the open-source [video-agent-skill](https://github.com/sunithvs/video-agent-skill) by sunith vs
(Apache-2.0). See `NOTICE` for what was changed. Licensed under Apache-2.0 (`LICENSE`). Fonts: SIL Open Font License.
