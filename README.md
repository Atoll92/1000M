# 1000 marges

Front-end for **1000 marges** — a French *société de production* working both
image and son. Editorial / cinematic art direction built around the brand
concept of *margins*: wide asymmetric gutters, hairline rules, mono margin
notes, and a global **IMAGE ⇄ SON** mode that recolours the accent and swaps
the hero media (showreel video ⇄ live audio waveform).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Lenis** smooth scroll · **GSAP** manifesto load animation
- **Web Audio API** waveform scrubber · **View Transitions API** page morphs
- Fonts: **Bricolage Grotesque** (variable display) + **Geist Mono** (metadata)

## Content is static (phase 2)

**All text, crew, and project content is static in `/content`** — typed local
modules, no CMS. Sanity is wired only as a minimal smoke-test (a single
`siteTitle`); the Sanity migration of the rest is a later phase.

```
content/
  types.ts            Role / Member / Project types
  roles.ts            métiers (cadreur, chef op, ingé son, perchman, …)
  crew.ts             the crew (placeholder people — replace names/photos)
  projects.ts         projects (mix image / son / both)
  copy.ts             ALL site prose (manifesto, studio, contact, socials, accents)
  peaks.generated.ts  AUTO-GENERATED waveform peaks (see below)
  index.ts            helpers: memberBySlug, projectsForMember, roleLabel, …
```

Edit those files to change the site — nothing is hardcoded in components.

### Waveform peaks

SON projects render a waveform from a precomputed `peaks` array so it draws
instantly (no decode-on-load). Regenerate after adding/replacing audio:

```bash
node scripts/peaks.mjs
```

For each SON slug the script looks for `public/audio/<slug>.{mp3,wav,m4a}` and
decodes it with **ffmpeg** (must be on PATH) to ~200 normalized amplitudes. If
no local file exists it writes a deterministic synthetic waveform so the UI
still renders during development. The demo currently uses remote SoundHelix
clips + synthetic peaks — drop real files in `public/audio/` and re-run.

### Sanity smoke-test (optional)

The site builds and runs **fully static with no Sanity connection**. If you set
`NEXT_PUBLIC_SANITY_PROJECT_ID` (see `.env.local.example`), the homepage
`<title>` is read from a `siteSettings.siteTitle` singleton, with the static
`"1000 marges"` as fallback on any miss. The embedded Studio at `/admin` (with
the full future schemas) is the migration target for later phases. Nothing else
touches Sanity.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Architecture

```
app/
  layout.tsx              root: fonts, <ModeProvider>, gated siteTitle, SEO
  (site)/                 the public site (route group)
    layout.tsx            shell: Lenis, grain + vignette, custom cursor, Nav
    page.tsx              home — mode-branched hero (video ⇄ waveform)
    work/                 Travaux index + /work/[slug] detail
    equipe/               crew manifesto index + /equipe/[slug] detail
    studio/  contact/     À propos · Contact
  admin/[[...tool]]/      embedded Sanity Studio (future migration)
components/               Mode/Transport context, hero, Waveform, Cursor, …
content/                  the static data layer (see above)
sanity/                   client + schemas + gated siteTitle fetch
scripts/peaks.mjs         waveform peaks precompute
```

### Signature pieces

- **`ModeContext`** — global `IMAGE`/`SON` state; injects `--accent`,
  persists to `localStorage`, cross-fades the hero media.
- **`Waveform`** — Web-Audio waveform that doubles as the seek bar: precomputed
  peaks draw instantly, an `AnalyserNode` reacts to amplitude on play, click /
  drag / keyboard seeks. Shared `TransportContext` keeps position aligned across
  an IMAGE ⇄ SON toggle.
- **`CrewIndex`** — anorak-style justified name block; hover/focus dims the rest,
  floats an eased portrait, reveals roles + skills; emphasizes crew by MODE.
- **`TransitionLink`** — View-Transition navigation with shared-element morphs
  (posters `poster-<slug>`, crew names `member-<slug>`) and a fade fallback.
- **`Cursor`** — ring + dot with contextual labels ("Voir", "Lire", "Écouter").
- **`Timecode` / grain / vignette** — the "UI honesty" + film-gate layer.

## Performance & accessibility

- Poster-first hero, lazy + muted-autoplay video (LCP-safe); audio never
  autoplays (requires the play affordance).
- Precomputed peaks → the waveform never fetches/decodes the full track to paint.
- Full `prefers-reduced-motion` fallbacks: no cursor-follow, static waveform,
  Lenis/GSAP/View-Transitions disabled, crew index degrades to a plain grid.
- Real links/buttons throughout; keyboard-navigable crew index (focus mirrors
  hover); `radiogroup` mode toggle; `slider` roles + `aria-label`s on the
  scrubber, waveform and play button.

## Deploy (Vercel)

Push to GitHub, import in Vercel. `npm run build` prerenders every route (SSG
for `/work/[slug]` and `/equipe/[slug]`). The build is static-export-compatible
aside from the optional gated Sanity `siteTitle` fetch.
