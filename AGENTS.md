# opencode-mobile-docs Agent Guide

Public user-facing docs site for OpenCode Mobile (unofficial native clients).

Live site: https://opencode-mobile.github.io/opencode-mobile-docs/

Private product/app source: https://github.com/opencode-mobile/opencode-mobile

## Purpose

- Publish setup and install guides anyone can open without access to the
  private app repo.
- Keep copy scannable: short steps, checklists, troubleshooting tables.
- Do **not** turn this into the product planning home — that stays in
  `opencode-mobile` (`docs/features/`, `AGENTS.md`, etc.).

## Site shape

Static HTML on GitHub Pages from the `main` branch root (no build step).

| Path | Role |
| --- | --- |
| `index.html` | Landing page with manifest index |
| `assets/site.css` | Shared styles (sidebar, cards, callouts, CTAs) |
| `connecting/` | Start opencode serve, Tailscale, connect the app |
| `install-app-store/` | iOS: public App Store listing |
| `install-play-internal/` | Android: public Google Play listing |
| `install-testflight/` | Legacy URL; redirects to `install-app-store/` |
| `planned/` | Next / planned / shipped / later scan list |
| `privacy/` | Privacy policy (Play / App Store URL) |
| `request-access/` | Legacy URL; redirects to the docs home |

Every guide is a folder with `index.html` so URLs stay directory-style.

## Page conventions

- Self-contained HTML; shared look via `../assets/site.css` (or `./assets/` on
  home). Load IBM Plex Sans + Mono from Google Fonts on every page.
- Every page uses the `.shell` layout: dark `.site-rail` sidebar (brand, tag,
  `.site-nav`, bottom `.site-access` CTA pointing at `connecting/`) + `.page`
  content column. When adding a guide, update the nav on **all** pages and
  mark the current page with `aria-current="page"`.
- Keep a readable content column (`max-width: 42rem`) beside the rail. Visual
  system: Graphite utility — cool paper, blue accent (`#1769aa`), Plex only.
- Prefer: eyebrow → title → short lede → note → numbered sections → checklist →
  troubleshooting `<details>` → footer. Landing uses `.manifest` /
  `.manifest-row` instead of grouped cards.
- Reuse existing classes (`.card`, `.note`, `.callout`, `.cta`, `.path`,
  `.manifest`, etc.) before inventing new ones.
- External CTAs (forms, downloads) use `target="_blank"` and
  `rel="noopener noreferrer"`.

## Content rules

- User-facing only. No CI secrets, signing keys, service-account JSON, or
  operator-only runbook internals.
- Android is a public Google Play listing:
  `https://play.google.com/store/apps/details?id=dev.opencode.mobile`.
  Open that listing and install.
- iOS is a public App Store listing:
  `https://apps.apple.com/app/opencode-mobile-unofficial/id6799246544`.
  Open that listing on the iPhone or iPad and install. Requires iOS 17.5
  or iPadOS 17.5 or later. Send people who still have the TestFlight build
  to delete it and install the App Store app.
- Point “after install” flows at `connecting/`.
- Point “need the app” at `install-app-store/` (iOS) or
  `install-play-internal/` (Android). There is no access-request form.
- Prefer Tailscale (or other user-managed transport) for reaching `opencode
  serve`; the app does not create a relay.
- Call out the `opencode serve` default bind (`127.0.0.1`) and the need for
  `--hostname 0.0.0.0` (or Tailscale Serve) for phones.

## Relationship to the private repo

- Durable product/feature docs stay in `opencode-mobile`.
- When install or connect facts change in operator runbooks there, update the
  matching public guide here in the same effort when the change is user-visible.
- Do not copy private planning files (`plan.md`, `progress.md`, ADRs) into this
  repo.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Publishing

Push to `main`. GitHub Pages serves the branch root. Confirm the Pages build
finished before telling someone a URL is live.

## Out of scope here

- Native app implementation, design-system component work, and GitHub issue
  tracking. The public `planned/` page is a short snapshot of user-visible
  work. Ticket detail stays in `opencode-mobile` issues.
- App-managed tunnels or accounts.
- Embedding secrets or unpublished internal tooling URLs.
