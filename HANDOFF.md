# 1000 marges — design handoff

Context for the next agent picking up this repo. The goal of the next phase is
to **elevate the look & feel to a professional, agency-grade standard with a
real artistic point of view** — not to re-architect. The engineering is solid;
the art direction needs a stronger, more intentional vision.

---

## What this is

Front-end for **1000 marges**, a French *société de production* (image **and**
son) based in **Marseille**. Brand concept: *margins* — the company works "in
the margins" of both crafts, treating image and son as one gesture. The site
has a global **IMAGE ⇄ SON** mode toggle that recolours the accent and swaps
the hero media (showreel video ⇄ live audio waveform).

Live repo: `github.com/Atoll92/1000M` (deploys on Vercel from `main`).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — CSS-first `@theme` tokens in `app/globals.css`
- **Lenis** smooth scroll · **GSAP** (manifesto load animation)
- **Web Audio API** waveform · **View Transitions API** · custom cursor · film grain
- Fonts: **Bricolage Grotesque** (variable display) + **Geist Mono** (metadata)
- Content is **static** in `/content` (typed modules). **Sanity** is wired only
  as a gated `siteTitle` smoke-test; the embedded Studio at `/admin` is a future
  migration target. Don't add a CMS dependency for this phase.

## Project map

```
app/
  layout.tsx              root: fonts, <ModeProvider>, gated siteTitle, SEO
  globals.css             THE design system (tokens, type, grain, cursor, VT)
  (site)/                 public site (route group)
    layout.tsx            shell: Lenis, grain + vignette, custom cursor, Nav
    page.tsx              home — mode-branched hero (HomeStage)
    work/ + work/[slug]   Travaux index + project detail
    equipe/ + [slug]      crew index (anorak) + member detail
    studio/ contact/      À propos · Contact
    not-found.tsx
  admin/[[...tool]]/      embedded Sanity Studio (leave as-is)
components/               see "Signature components" below
content/                  types.ts, roles.ts, crew.ts, projects.ts, copy.ts,
                          peaks.generated.ts (auto), index.ts (helpers)
sanity/                   client + schemas + gated siteTitle
scripts/peaks.mjs         waveform peaks precompute (ffmpeg | synthetic)
public/equipe/            crew portraits   public/audio, public/work  media
```

## Design system (current)

The visual thesis is **« le son habite la marge de l'image »** — on a 35mm
print the optical soundtrack literally lives in the margin of the image. The
site is art-directed as an **annotated working print**: media and statements
in the body, every piece of metadata in a visible margin rail, paper surfaces
as the second register, accent used only as annotation ink.

In `app/globals.css` via Tailwind v4 `@theme inline`:

- Palette routed through **runtime vars** `--ink/--paper/--paper-dim/--hairline`
  (mapped to `--color-*` in `@theme inline` so utilities resolve per element).
  `.surface-paper` inverts them in scope — any component dropped inside
  re-inks itself (used by the Footer, Studio philosophy band, project
  description section).
- Accent: `--accent` driven by mode — IMAGE `#3b6dff` (blue), SON `#ffae2b`
  (amber). **Annotation-ink discipline**: accent underlines, ticks, dashes,
  marks and the single italic "margin word" of a statement — it never fills
  buttons or large type.
- **The margin rail**: `--rail-w`, `--rail-gap`, `.rail-section/.rail-cell`
  grid + the `RailSection` component (`components/Rail.tsx`). Sections stack
  flush so the hairline reads as one continuous rule. On mobile the rail
  collapses to an annotation row.
- Type ramp (four registers, no more): `.display` (calm wght 280),
  `.title` (firm wght 560), body (Bricolage 400 via Tailwind), `.margin-note`
  (mono uppercase, strictly marginalia). The variable-weight hover sweep is
  opt-in via `.sweep` and exists ONLY on the Équipe name block.
- Overlays: `.grain` (animated feTurbulence), `.vignette` (now a whisper —
  do not strengthen it, it fights the paper surfaces), custom cursor,
  `.reveal` scroll-in, View-Transition CSS + the `.mode-reprint` wipe.
- `.hover-hint` hides pointer-only copy on touch devices.
- Full `prefers-reduced-motion` fallbacks everywhere

## Signature components

- **`RailSection`** — the annotated-page stripe (margin rail + body). Every
  page is built from stacked RailSections; keep new sections on this grid.
- **`ModeContext`** — global IMAGE/SON state, injects `--accent`, persists to
  `localStorage`. Mode switches run as a "re-print": a left-to-right clip
  wipe via the View Transitions API (`.mode-reprint`), skipped under
  reduced-motion; all transition promises are caught (aborts are normal).
- **`HomeStage` / `HeroMedia`** — mode-branched, cross-fading hero. IMAGE = muted
  showreel video; SON = `Waveform`.
- **`Waveform` + `TransportContext`** — the optical track: Web-Audio waveform
  drawn on a ruled baseline with a time ruler (minor/15 s, major/60 s), the
  `startAt` edit point flagged in accent ink, and an accent playhead. Doubles
  as the seek bar; precomputed peaks draw instantly; `AnalyserNode` reacts on
  play. Shared transport keeps position aligned across a mode toggle.
- **`CrewIndex`** — anorak-style justified name block; hover/focus floats a
  portrait, dims the rest, reveals roles + skills; emphasises crew by MODE;
  reduced-motion → plain grid.
- **`TransitionLink`** — View-Transition navigation with shared-element morphs
  (`poster-<slug>`, `member-<slug>`) + fade fallback.
- **`Cursor`** — ring + dot, contextual labels ("Voir", "Lire", "Écouter").
- **`BottomStrip` / `Filmstrip`** — bottom nav of featured projects, hover-to-play.
- **`Timecode`** — running `HH:MM:SS:FF @25fps` ("UI honesty" motif).

## Content state (important: mixed real + placeholder)

- **Crew** (`content/crew.ts`): 4 **real** leads with real portraits —
  Alexandre Krajewski (réalisateur, chef op, étalonneur), Valentin Leverrier
  (ingénieur du son, preneur de son, compositeur), Damien Desmier (monteur,
  cadreur), Arthur Boval (compositeur). Then **8 placeholder** collaborators
  with picsum stills + invented bios.
- **Projects** (`content/projects.ts`): **"20 pierres" is real** — real audio
  (`/audio/20-pierres.mp3`, plays from 9:35), real poster (still from the film
  *Pietre* © Élise Blotière), real description/credits, external link to Villa
  Médicis. The other 5 projects are **demo** (Google sample mp4s, picsum
  posters, SoundHelix audio, synthetic peaks).
- **Copy** (`content/copy.ts`): manifesto, studio philosophy, services, contact,
  socials, accents — all editable here. Based in Marseille.

## Design-elevation status (June 2026)

The "annotated working print" direction is implemented (see Design system
above): margin rail on every page, four-register type ramp, paper surfaces,
accent-as-annotation-ink, the waveform as optical track, and the IMAGE ⇄ SON
"re-print" wipe. Done in four commits — rail/type, paper/accent, waveform/
transition, detail polish.

Worth tackling next (in rough priority):

1. **Photography treatment.** The grayscale-default/colour-on-hover motif is
   consistent, but the four real portraits still differ wildly in grade and
   crop — define one printed look (soft grayscale, slight warm lift, fixed
   crops) and bake it into the assets or a CSS filter recipe.
2. **Motion depth.** Entrances are reveals + the manifesto bleed; the next
   layer is "annotation being made": hairlines drawing in, margin notes
   stamping, one scroll-linked moment per page. Keep reduced-motion parity.
3. **OG/share image** (`docs/screenshots/og-image.png` + the generated route)
   still shows the old art direction — regenerate.
4. **docs/screenshots baseline** still shows the pre-rail design — re-shoot.
5. **Demo content** (5 sample projects, 8 placeholder collaborators with
   picsum portraits): replace with real work as it lands, or give
   placeholders an honest « à venir » margin-note treatment.
6. **Mobile menu / nav** could become a full-screen annotated index rather
   than a dropdown.

## Working agreements (keep these intact)

- **Static-first**: all content in `/content`. No new CMS dependency this phase.
- **Keep it green**: `npx tsc --noEmit` and `npm run build` must stay clean
  (build runs lint too). Verify visually with the dev server before pushing.
- **Accessibility & reduced-motion**: every motion/interaction has a graceful
  fallback today — preserve that.
- **Performance**: poster-first media, lazy video, precomputed peaks. Watch LCP.
  Note: demo media is remote; one real audio file is ~30 MB in `/public`.
- **Commit to `main`** in small, described commits; Vercel auto-deploys.
- Run `node scripts/peaks.mjs` after changing any audio (needs ffmpeg).

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000  (no env needed; fully static)
npx tsc --noEmit && npm run build   # must stay clean
```

A visual baseline of the current state is in **`docs/screenshots/`** (both
modes, plus the generated OG card) — use it to anchor your critique, then
re-shoot as you go.

Recommended first move: **run the site, screenshot every page in both IMAGE and
SON modes, write a short art-direction critique + a proposed design direction,
then implement iteratively** — don't start editing before there's a thesis.
