# opencode-mobile-docs Agent Guide

Public user-facing docs site for OpenCode Mobile (unofficial native clients).

Live site: https://opencode-mobile.github.io/opencode-mobile-docs/

Private product/app source: https://github.com/opencode-mobile/opencode-mobile

## Purpose

- Publish setup and install guides testers can open without access to the
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
| `install-testflight/` | iOS TestFlight public join link |
| `install-play-internal/` | Android: Google Group + Play Closed testing |
| `planned/` | Next / planned / shipped / later scan list |
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

- Tester-facing only. No CI secrets, signing keys, service-account JSON, or
  operator-only runbook internals.
- Safe to name private channels (TestFlight, Play Closed testing)
  when that helps install steps.
- Android Play Closed is self-invite: join Google Group
  `opencode-mobile-testers` (Anyone can join), then open the Play Store listing
  (`https://play.google.com/store/apps/details?id=dev.opencode.mobile`) with
  the same Google account. Do not tell Android testers to wait for a manual
  email add.
- iOS TestFlight is self-invite: open
  `https://testflight.apple.com/join/psaUBVsa` on the iPhone or iPad (install
  TestFlight if needed), then accept and install. Do not tell iOS testers to
  wait for a form, email, or App Store Connect team add.
- Point “after install” flows at `connecting/`.
- Point “need a build” at `install-testflight/` (iOS) or
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

- Native app implementation, design-system component work, Linear/feature
  tracking.
- App-managed tunnels, accounts, or public store listing instructions.
- Embedding secrets or unpublished internal tooling URLs.
