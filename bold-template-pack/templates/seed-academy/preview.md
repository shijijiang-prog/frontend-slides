# Seed Academy Preview Card

Use this small file for title-slide previews only. For final deck generation, read the full design doc listed below.

## Files

- Full design doc: `bold-template-pack/templates/seed-academy/design.md`
- Preview card: `bold-template-pack/templates/seed-academy/preview.md`
- Reference deck (read only if the design doc is ambiguous): `bold-template-pack/templates/seed-academy/example.html`

## Selection Metadata

- Slug: `seed-academy`
- Tagline: Seed Academy team house style — forest-green stage, fields of soft green dots, and one orange speech-bubble dot.
- Mood: warm, trustworthy, educational, school-assembly, hopeful
- Tone: clear, caring, grounded, community
- Formality: medium
- Density: low
- Scheme: mixed
- Best for: Anything presented by or for the Seed Academy (习得学堂) team: strategy briefings, parent meetings, school / class assemblies, programme launches, teacher training, education and community decks — especially Chinese-language decks projected in classrooms and halls.
- Avoid for: Dense data reports, luxury or nightlife brands, or decks that must look editorial / serif — the system is heavy-sans and deliberately plain.

## Visual Snapshot

A school-assembly presentation system. Deep forest-green stage (#1f4a3b) for covers and keyword lists, alternating with a pale whiteboard surface (#eef1f2) for reading slides. Decoration is made only of round dots: a grid of soft green (#5cbf7a) dots on the left of the cover, a row of big round "heads" over arch-shaped "bodies" along the cover's bottom edge like an audience, and a single row of small dots as the page-progress rail on reading slides. In every dot field exactly one dot is a terracotta-orange (#ef5b2b) speech bubble — a circle with one sharp corner. Headlines are Noto Sans SC at weight 900; reading paragraphs Noto Sans SC 700 with key phrases in signal red (#d7302c); dates in Outfit.

## Preview Ingredients

- Palette: forest #1F4A3B; forest-deep #173A2E; leaf #5CBF7A; board #EEF1F2; ink #3A3D3F; white #F6F8F6; orange #EF5B2B; red #D7302C
- Typography: Noto Sans SC 900 (titles, keywords) / 700 (body) / 500 (small); Outfit 500–600 for numerals, dates and labels
- Signature move: exactly one orange speech-dot (`border-radius: 50% 50% 50% 0`) inside every field of round dots
- Signature move: cover = left 9×9 green dot-matrix + centred title column + spaced subtitle (letter-spacing 0.42em) + Outfit date + bottom audience row of heads and arches
- Signature move: reading slides = charcoal-speech-dot-over-orange-dot title marker, red emphasis in body, bottom progress rail of dots

## International / CJK Preview Note

- Built Chinese-first. Keep CJK letter-spacing ≥ 0, use full-width punctuation, no terminal 。 on titles.
- For English-only decks keep Noto Sans SC for headings (its Latin is solid at 900) and Outfit for numerals.

## Preview Rules

- Build exactly one title slide at 1920x1080 inside the fixed-stage model.
- Preserve the palette, type roles, surface rhythm, and the dot vocabulary described above.
- Use the user's real title/subtitle/context; do not copy demo slide content.
- The rendered preview must look like a real first slide, not a template-selection card.
- Never place internal workflow text on the slide: no `preview`, `generated from`, `preview.md`, `template`, `preset`, `style option`, `Option A/B/C`, file names, paths, or source-doc labels.
- Never place the template name or slug on the slide itself; mention it only in the chat message.
- After the user picks this template for the full deck, read the full design doc before generating final slides.
