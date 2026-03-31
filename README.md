# Job Kanban - Hadris

A design-forward, local-first job application tracker built as a standalone static web app.

It keeps all board data in the browser, supports JSON import/export, includes English/Spanish/German UI, and ships with the same editorial shell and self-hosted typography family used across the Hadris tools.

## Features

- Four fixed workflow stages: Backlog, Applied, In Progress, Closed
- Local-only persistence in `localStorage`
- JSON export/import for backup and migration
- Light and dark mode
- English, Spanish, and German UI
- No cookies and no third-party services

## 🚀 Run locally

This project uses native ES modules, so opening `index.html` directly with `file://` won't work. Start a local server instead:

```bash
# Option 1: Python 3
python3 -m http.server 5500

# Option 2: Node
npx serve . -l 5500
```

Or use the **Live Server** extension in VS Code — open `index.html` → **Open with Live Server**.

Then visit `http://localhost:5500`.

## Tooling

No install step is needed to use the app itself.

Install dev dependencies only if you want to run Playwright checks or regenerate the OG image:

```bash
npm install
```

## Tests

Run the browser-independent unit tests:

```bash
node --test tests/*.test.js
```

Run the Playwright smoke checks:

```bash
npx playwright test
```

## Generate the OG image

The social preview asset is committed as `og-image.png`. To regenerate it after editing `og-template.html`:

```bash
node scripts/generate-og.js
```

## Deploy to GitHub Pages

This repo is configured for GitHub Pages via Actions.

1. In repository settings, set **Pages -> Source** to **GitHub Actions**.
2. Ensure the custom domain is set to `job.hadris.com`.
3. Add the DNS record: `job CNAME hadris-com.github.io`.
4. Push to `main` to trigger `.github/workflows/deploy-pages.yml`.

Because this repo deploys through a custom GitHub Actions workflow, the custom domain is managed in the repository's Pages settings and does not require a committed `CNAME` file.

The site is intended to be served from `https://job.hadris.com/`.

## Migrating data from the old in-repo kanban

Browser `localStorage` does not move across origins automatically.

To migrate an existing board:

1. Open the old kanban app.
2. Export your board as JSON.
3. Open `https://job.hadris.com/`.
4. Import that JSON snapshot into the standalone app.
