# Portfolio v3.0 — Upgrade notes

This is a substantial refresh of the portfolio. The DFIR/cyberpunk identity is preserved, but the visuals, copy, and structure have been pushed up a tier and a dedicated FYP showcase has been added.

## What's new

**Real 3D in the hero.** A Three.js scene renders alongside the intro: a wireframe icosahedron "shield" with a distorting inner core, three orbiting torus rings, drifting data-shard particles, and a starfield. Built with React Three Fiber + Drei. The whole scene is code-split via `React.lazy` so it doesn't block first paint.

**Tilt cards replace flat cards.** Cards now react to the cursor with a real perspective-tilt + glow, not just a flat hover. The old `CardGlow` component is no longer imported anywhere and can be deleted (`src/components/CardGlow.jsx`).

**Elegchos sits in the Projects list.** It's one project among the others — appears as the first card on the Projects page with a "Capstone" badge, but no dedicated section, no homepage takeover, no special featured layout. The capstone gets a quiet mention in the About page's Education block.

**Refined typography.** IBM Plex Mono for display, Manrope for body, JetBrains Mono for code. Replaces the prior Inter setup.

**Framer Motion** drives scroll/reveal animation on the FYP section and the hero entrance. The existing `ScrollReveal` IntersectionObserver still handles other sections to keep the bundle lean.

**Deeper background.** New tokens (`#04060d` base, three accent colors), an SVG-noise grain overlay, refined HUD corners, and a gradient hero title.

## Install & build

```bash
npm install
npm run build      # production build → dist/
npm run dev        # local dev server
```

New dependencies added:
- `three`
- `@react-three/fiber` (v9 — required for React 19)
- `@react-three/drei` (v10)
- `framer-motion`

## Bundle sizes (gzipped)

```
react        17 KB
motion       37 KB
r3f         110 KB
three       176 KB
app + css    19 KB
```

The 3D scene chunk loads on demand. Initial paint is just the React + app shell + CSS.

## Files you can delete

- `src/components/CardGlow.jsx` — superseded by `TiltCard.jsx`. Nothing imports it anymore.

## Deploy

The existing GitHub Actions workflow (`.github/workflows/deploy.yml`) is unchanged — it still builds on push to `main` and deploys to GitHub Pages with the `omarkaaki.me` CNAME. No infrastructure changes needed.

## Notes on the terminal

`fyp.txt` lives in the interactive Kali terminal's filesystem. `cat fyp.txt` will print the Elegchos summary if someone explores it. The default `ls` output lists it alongside the other files — not promoted.
