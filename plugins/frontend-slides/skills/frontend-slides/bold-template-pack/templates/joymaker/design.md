# joymaker

A minimal Chinese-first business presentation system derived from three
user-supplied 欢乐互娱 screenshots. It is an additional opt-in theme; it does
not replace or modify any existing preset, template, or presentation controller.

## Files and application

- [preview.md](preview.md): compact cover recipe for style discovery.
- [joymaker.css](joymaker.css): reusable, scoped visual tokens and components.
- [example.html](example.html): self-contained five-slide reference deck.
- [section-title.html](section-title.html): standalone logo-free chapter title.
- [example.pptx](example.pptx): editable PowerPoint with original logo assets,
  native text/cards, and speaker notes. Native PowerPoint playback uses Office
  controls rather than the HTML toolbar.

Include the entire existing `viewport-base.css`, then inline `joymaker.css`.
Add `class="joymaker"` to the body. Author slides in a 1920×1080 `.deck-stage`
and uniformly scale the stage to the available viewport. No device-dependent
slide reflow. The stylesheet uses only `.joymaker`-scoped rules and does not
control navigation, speaker notes, editing, or fullscreen. Retain the existing
controller and user-selected features when applying it to an existing deck.

## Design tokens

| Role | Token / value |
| --- | --- |
| Content surface | `--jm-surface: #EDF1F2` |
| Card | `--jm-card: #FFFFFF` |
| Title | `--jm-navy: #1C385F` |
| Body / muted text | `--jm-body: #606568`, `--jm-muted: #747A7E` |
| Primary data | `--jm-orange: #F45100` |
| Secondary accent | `--jm-coral: #F46B43` |
| Title marker / critical annotation | `--jm-red: #C81036` |
| Divider | `--jm-line: #D9DEE0` |
| Cover | `linear-gradient(135deg, #FFA451 0%, #FF8438 50%, #FF5725 100%)` |
| CJK sans | Noto Sans SC 400 / 600 / 800 / 900 |
| Offline fallback | PingFang SC, Microsoft YaHei, sans-serif |
| Safe margins | 112px left/right, 80px top, 88px bottom |
| Grid gap / card inset / radius | 32px / 40px / 24px |

Use `Noto Sans SC` from Google Fonts when network loading is acceptable.
The reference example deliberately has no remote requests and uses the listed
local fallbacks; do not make a working offline deck depend on a font CDN.

Typography at design scale: cover 108px/1.35 at 900; content heading 60px/1.4
at 900; section heading 34px/1.35 at 800; body 28px/1.6; footnote 24px/1.45;
KPI 78px/1.35 at 800; supporting metric 40px/1.4. Keep CJK letter spacing
nonnegative and use tabular numerals. Prefer one line for content titles;
split long titles or slides rather than crowd the top-right brand.

## Layout grammar

1. **Opening cover** (`jm-cover`): white text on the orange gradient, plain
   text brand or supplied white logo at (112, 96), title at (112, 500),
   subtitle below. Reserve the logo and crisp tagline for the opening cover. At most
   two faint cropped curves can add depth; content remains unobscured.
   **Later title pages** (`jm-cover jm-section-title`): retain the same orange
   gradient, two faint curves, white type and footer. Omit logo, brand lockup
   and slogan markup; place the title at (112, 470). Use this variant for every
   section title or title-style closing after the opening. Keep content-page
   logos and full-bleed image finales as authored.
2. **Content header** (`jm-header`): navy title, crimson 16×86px bar at its
   left, gray subtitle beneath, plain text brand or supplied logo in the
   top-right. Content starts at y=300 or lower. Bottom rule at y=1000.
3. **Business overview**: two text-led columns for capabilities, optional
   supplied product logos in a clean contain-fit row, then up to four KPI
   cards. Do not invent logos or company facts when source assets are absent.
4. **Comparison**: two white rounded cards, equal widths and aligned baselines;
   coral label, oversized orange value, gray context, hairline divider, and
   up to four supporting metrics. White cards have no border or drop shadow.
5. **Roadmap / narrative**: three or fewer open columns with orange step
   numbers and a fine gray rule. Avoid putting prose into repetitive cards.

Only headers have the red vertical marker. Orange is for quantitative emphasis
and short subheadings. Crimson is for a genuinely critical annotation, not all
emphasized text. Rounded corners belong to data cards, not the entire slide.
For small labels on white use navy/body colors; reserve orange/coral for large
display text. Avoid glass, shadows, neon, particles, pictograms, and busy waves.

## Content and brand handling

The reference screenshots define visual direction, not facts for a new deck.
Use the user's actual business content. The included example uses visibly
identified illustrative data and does not reproduce the uploaded operating
figures, game logos, personnel information, or screenshot watermarks. It embeds
the separately supplied original 欢乐互娱 logo, byte-for-byte, from
`assets/logo-original.png` on content pages. Orange covers use
`assets/logo-white-mark.png`, retaining the original white sun and company name
from the reference cover. The source lockup is retained in `logo-white.png`;
`logo-white-mark.svg` clips its tiny raster slogan without changing the symbol.
The slogan 欢乐从这里开始 is set separately as crisp native white text: 26px,
weight 600 (bold in PowerPoint), 10px tracking, at (273, 196). The logo is
460px wide at (112, 96). This prevents small screenshot lettering from fading
when scaled. No gray background plaque on covers.
For other brands, use their supplied assets or a text wordmark fallback.

Do not bundle the three original screenshots in a public theme package.
For real decks use supplied original logo assets, preserve aspect ratio,
and inline them if the deliverable needs to remain one portable HTML file.

## Motion and behavior

Use a quiet 240ms opacity entrance and at most a 12px vertical offset.
Honor `prefers-reduced-motion`. Keep slide switching via `.active`/`.visible`
visibility and opacity from `viewport-base.css`. Do not implement a separate
navigation system just to apply this theme.

The reference deck includes keyboard arrows/Space/PageUp/PageDown/Home/End,
touch and wheel navigation, a contents dialog, numeric page jump, fullscreen,
and a single-window presenter view (current slide, notes, next title, timer).
It also supports E to edit, local save when browser storage is available, and
HTML download. These example controls sit outside the slide design; applying
the CSS alone neither removes nor supplies presentation features.

## Verification

Check every slide at 1920×1080 and 1280×720, plus a portrait phone viewport.
The complete stage remains 16:9 and centered, with no text/card overflow,
overlapping sibling panels, clipped title, or obscured brand. Check long CJK
titles, reduced motion, navigation, page jump, contents focus, presenter view,
fullscreen, and offline loading. Print uses one fixed slide per page.
