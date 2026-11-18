# joymaker Preview Card

Read this card for title-slide previews; read [design.md](design.md) only when
joymaker is selected for a full deck. [example.html](example.html) demonstrates
the cover, business overview, comparison, roadmap, and closing layouts.

- Slug / name: `joymaker`
- Mood: confident, warm, clear, businesslike
- Tone: minimal, restrained, Chinese-first
- Formality: medium-high
- Density: medium-high (split content rather than reduce type)
- Scheme: mixed — orange covers, light-gray content
- Best for: company introductions, operating reviews, product test results,
  publishing updates, and Chinese-language business presentations.
- Avoid for: neon gaming aesthetics, illustrated storytelling, decorative
  editorial layouts, or dense spreadsheet reproductions.

## Visual recipe

Based on three user-supplied 欢乐互娱 screenshots: a warm orange gradient cover
with white, left-aligned type; cool light-gray content pages; deep navy titles
with a crimson vertical marker; white rounded cards with oversized orange
numbers; gray descriptions and thin dividers. Keep generous empty space.

- Palette: surface `#EDF1F2`, white `#FFFFFF`, navy `#1C385F`, body `#606568`,
  muted `#747A7E`, orange `#F45100`, coral `#F46B43`, crimson `#C81036`,
  divider `#D9DEE0`.
- Cover gradient: `linear-gradient(135deg, #FFA451 0%, #FF8438 50%, #FF5725 100%)`.
- Type: Noto Sans SC 400/600/800/900; offline fallbacks PingFang SC and
  Microsoft YaHei. No decorative Latin display face.
- Fixed 1920×1080 canvas; 112px side margins; cover title 108px; content title
  60px; body 28px; KPI 78px; label 24px. All are design-space measurements.
- Cover: original white symbol/name at top-left, 460px wide; set the slogan
  欢乐从这里开始 as native 26px white semibold text with 10px tracking.
  Keep the tiny slogan out of the raster mark. Use a large title below the midpoint; at most two
  faint curves, behind the text. No textures or elaborate wave fields.
- Content: brand at top-right, title at top-left, slim bottom rule. Use cards
  for metrics only, not as a wrapper for every sentence.

Use the user's actual title and context. Keep the style name, file paths,
selection labels, and implementation notes out of the slide. A supplied real
logo may be embedded; otherwise use a plain text company name. Do not redraw
the sun logo or reuse the reference screenshots as slide backgrounds.
