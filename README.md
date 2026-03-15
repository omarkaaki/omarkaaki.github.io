# omarkaaki.github.io

Modern cybersecurity portfolio for Omar Kaaki, built with **React** and **Vite**, hosted on [GitHub Pages](https://omarkaaki.me).

## Features

- **Interactive Kali Terminal** — A simulated forensics workstation with commands like `whoami`, `nmap`, `volatility`, `hashcat`, `cat`, `ls`, and more. Supports command history and tab completion.
- **DFIR Theme** — Custom SVG security icons (Shield, Fingerprint, Radar, Skull, etc.) and cybersecurity-themed visual elements throughout.
- **Futuristic Effects** — Particle network background, glitch text, HUD corners, scanline overlay, neon glow cards with mouse tracking.
- **React SPA** — Client-side routing with HashRouter for seamless page transitions.

## Structure

- `src/pages/` — Page components (Home, About, Projects, Skills, Contact)
- `src/components/` — Reusable components (InteractiveTerminal, ParticleCanvas, Navbar, Footer, Icons, etc.)
- `src/styles/global.css` — Global styles
- `public/CNAME` — Custom domain configuration
- `.github/workflows/deploy.yml` — CI/CD pipeline

## Development

```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Build for production
```

## Deployment

The site auto-deploys via GitHub Actions on push to `main`. The workflow builds the Vite project and deploys to GitHub Pages.

## Custom Domain & HTTPS Setup

The site uses the custom domain **omarkaaki.me**. To ensure HTTPS works correctly:

1. **DNS Records** — At your domain registrar, add these A records pointing to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. **Enforce HTTPS** — In the repository settings:
   - Go to **Settings → Pages**
   - Set source to **GitHub Actions**
   - Under "Custom domain", confirm `omarkaaki.me` is set
   - Check the **Enforce HTTPS** checkbox

> **Note:** It can take up to 24 hours for DNS changes to propagate and for GitHub to provision the SSL certificate.