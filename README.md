# omarkaaki.github.io

Cybersecurity portfolio website for Omar Kaaki, hosted on [GitHub Pages](https://omarkaaki.me).

## Structure

- `index.html` — Home page
- `about.html` — About, education, and experience
- `projects.html` — Cybersecurity projects
- `skills.html` — Skills and tools
- `contact.html` — Contact information
- `style.css` — Stylesheet
- `main.js` — Navigation script
- `CNAME` — Custom domain configuration
- `.nojekyll` — Disables Jekyll processing for direct file serving

## Custom Domain & HTTPS Setup

The site uses the custom domain **omarkaaki.me**. To ensure HTTPS works correctly:

1. **DNS Records** — At your domain registrar, add these A records pointing to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. **Enforce HTTPS** — In the repository settings:
   - Go to **Settings → Pages**
   - Under "Custom domain", confirm `omarkaaki.me` is set
   - Check the **Enforce HTTPS** checkbox
   - If the checkbox is greyed out, wait a few minutes for the SSL certificate to be provisioned and try again

> **Note:** It can take up to 24 hours for DNS changes to propagate and for GitHub to provision the SSL certificate.