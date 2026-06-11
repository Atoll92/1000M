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

In `app/globals.css` via Tailwind v4 `@theme`:

- Palette: `--color-ink #0a0a0a`, `--color-paper #f2f0eb`,
  `--color-paper-dim #9a988f`, `--color-hairline #2a2a28`
- Accent: `--accent` driven by mode — IMAGE `#3b6dff` (blue), SON `#ffae2b` (amber)
- `--margin-page: clamp(1.5rem, 5.5vw, 7rem)` — the "thousand margins" gutter system
- Type: `.display` (variable Bricolage, hover weight sweep), `.margin-note`
  (mono uppercase metadata)
- Overlays: `.grain` (animated feTurbulence), `.vignette` (gate), custom cursor
  (ring + dot + contextual label), `.reveal` scroll-in, View-Transition CSS
- Full `prefers-reduced-motion` fallbacks everywhere

## Signature components

- **`ModeContext`** — global IMAGE/SON state, injects `--accent`, persists to
  `localStorage`.
- **`HomeStage` / `HeroMedia`** — mode-branched, cross-fading hero. IMAGE = muted
  showreel video; SON = `Waveform`.
- **`Waveform` + `TransportContext`** — Web-Audio waveform that doubles as the
  seek bar. Precomputed peaks draw instantly; `AnalyserNode` reacts on play;
  supports a `startAt` offset (e.g. "20 pierres" begins at 9:35). Shared
  transport keeps position aligned across a mode toggle.
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

## What "professional / artistic vision" should tackle

The current site is a competent, cinematic **template**. To make it feel like a
real studio's site with a genuine point of view, consider (audit first, then
choose a direction — don't do all of it blindly):

1. **Art direction & identity.** It currently leans on generic "cinematic dark"
   tropes. Define an actual visual thesis for "1000 marges" — what does *margin*
   look like as a design language? Push the gutter/annotation system, the
   IMAGE/SON duality, the typographic voice. Make choices that a template wouldn't.
2. **Typography.** Hierarchy, scale ramp, optical sizing, line-length, the
   FR-language rhythm. The huge `.display` + mono `.margin-note` pairing is a
   start; refine into a real type system.
3. **Layout & grid.** The "thousand margins" idea deserves a rigorous,
   intentional grid — asymmetry with purpose, not just `px-[var(--margin-page)]`.
4. **Motion choreography.** GSAP/Lenis are wired but motion is sparse and a bit
   generic. Design entrances, scroll-linked moments, and the mode-switch as a
   crafted transition. Keep reduced-motion parity.
5. **Color.** Two accents (blue/amber) + near-black/paper. Decide if that's the
   identity or if it needs a more distinctive palette/treatment.
6. **Photography & media treatment.** Grayscale-on-default with colour-on-hover
   is used everywhere — make it intentional, consistent, and considered. The
   crew portraits vary in quality/crop.
7. **The hero & the waveform.** The SON waveform is the signature — make it
   genuinely beautiful, not just functional. Same for the IMAGE showreel hero.
8. **Detail polish.** Cursor, grain intensity, hairlines, focus states,
   empty/loading states, favicon + OG image (currently default), mobile.
9. **Coherence.** Make every page feel like one art-directed object.

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

Recommended first move: **run the site, screenshot every page in both IMAGE and
SON modes, write a short art-direction critique + a proposed design direction,
then implement iteratively** — don't start editing before there's a thesis.
