# Portfolio — Aryan Imanipour

Persoonlijke portfolio-website. **Infrastructure & Security Management.**
Live: [imanipour.nl](https://imanipour.nl)

> "Security is één grote puzzel — en die los ik graag op."

## Stack

Pure **HTML, CSS en JavaScript** — geen build-step, geen framework, geen dependencies.
Wat in de repo staat *is* de site. Dat houdt het snel, simpel en betrouwbaar te deployen.

```
index.html     # markup — alle secties
styles.css     # dark, security-geïnspireerd thema + responsive layout
script.js      # scroll-reveal, scramble-effect, custom cursor, 3D-tilt, CV-download
favicon.svg    # logo
CNAME          # custom domein (imanipour.nl)
```

> De PDF-CV wordt client-side gegenereerd; [jsPDF](https://github.com/parallax/jsPDF)
> wordt pas geladen op het moment dat je op "Download CV" klikt (lazy-load via CDN),
> zodat de pagina zelf snel blijft.

## Lokaal bekijken

Geen build nodig. Open `index.html` direct, of start een mini-server:

```bash
# Python
python -m http.server 5173

# of Node (npx, geen install nodig)
npx serve .
```

Ga daarna naar `http://localhost:5173`.

## Deploy (GitHub Pages)

Automatisch via GitHub Actions: bij elke push naar `main` draait
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), die de repo-root
1-op-1 publiceert naar GitHub Pages. Geen `npm install`, geen `next build`.

**Eenmalige instelling:** repo → *Settings → Pages → Build and deployment →
Source = "GitHub Actions"*.

Het custom domein `imanipour.nl` staat in `CNAME` en blijft behouden.
