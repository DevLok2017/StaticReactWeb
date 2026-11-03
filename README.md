# Ananya & Rohan — Wedding Invitation

A fully static, client-side, configuration-driven Indian wedding invitation website. No backend, no database, no paid APIs — everything renders from JSON files you edit yourself.

Built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Zod.

## 1. Install and run locally

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173` URL in your browser.

```bash
npm run typecheck   # strict TypeScript check (alias for `tsc -b`)
npm run build        # production build to dist/
npm run preview      # preview the production build locally
```

## 2. How the site is structured

All content lives in `public/config/*.json`, loaded at runtime via `fetch` — editing these files and reloading the page is enough during development; no rebuild required. Validation is done with Zod (`src/schemas/`); if a file is missing or invalid, the app logs a console warning (dev only) and falls back to safe defaults instead of crashing.

| File | Controls |
| --- | --- |
| `public/config/wedding.json` | Names, dates, family info, love story, ceremonies, venue, gallery, RSVP contacts, closing message |
| `public/config/theme.json` | Color palette, fonts, radii, shadows — supports multiple named themes |
| `public/config/sections.json` | Which sections appear, in what order, enabled/disabled |
| `public/config/animations.json` | Animation durations, easing, floating decorations, reduced-motion behavior |

Images referenced in JSON (e.g. `"/assets/images/couple/hero.webp"`) must exist under `public/assets/images/...`. Any image path that's missing or fails to load renders a labeled placeholder box instead of a broken image, so the layout never breaks. The sample config currently points at real (freely-licensed, placeholder) stock photos for the hero, ceremonies, venue, and gallery — see **Assets to replace** below and [CREDITS.md](CREDITS.md) for sourcing/attribution.

## 3. Editing wedding information

Open `public/config/wedding.json` and edit the fields directly — no code changes needed. Key sections:

- `coupleNames`, `weddingDate` (ISO 8601 with timezone offset), `blessing`, `heroTagline`
- `family.bride` / `family.groom` — parents, grandparents, siblings (omit any you don't have; empty lists render nothing)
- `profiles.bride` / `profiles.groom` — intro, cultural background, traits, hobbies
- `loveStory` — an array of chapters, each with `number`, `title`, `description`, optional `date`/`image`
- `storybook` — pages for the interactive "Open Our Story" book
- `childhoodMemories` — array of `{ photo, caption }`
- `ceremonies.bride` / `ceremonies.groom` — each ceremony has `id`, `name`, `date`, `startTime`, and optional `endTime`, `description`, `image`, `venue`, `dressCode`, `instructions`
- `venue` — name, address, optional photo, and a `mapsUrl` (a plain Google Maps link — no API key needed)
- `gallery` — array of `{ src, thumb?, caption?, width?, height? }`
- `rsvp.bride` / `rsvp.groom` — contacts with `phone` (enables a `tel:` call button) and/or `whatsapp` (enables a pre-filled WhatsApp link)
- `closingMessage`, optional `music.src`, optional `social` metadata for link previews

## 4. Changing the wedding date

Update `weddingDate` in `wedding.json` (ISO 8601, include the timezone offset, e.g. `"2027-02-14T10:00:00+05:30"`). The countdown, "Save the Date" reveal, and the generated `.ics` calendar file all read from this single value — nothing else needs to change.

## 5. Changing colors and fonts

Edit `public/config/theme.json`. It supports multiple themes; set `activeTheme` to the `name` of the one you want live. Three starting points are included:

- `royal-indian` — burgundy, antique gold, ivory (default)
- `pastel-romance` — blush pink, sage green, ivory
- `minimal-elegance` — beige, champagne, muted gold

Fonts are loaded from Google Fonts in `index.html` (`Cormorant Garamond`, `Great Vibes`, `Mulish`). To use different fonts, update that `<link>` tag and the `fonts` object in `theme.json`.

## 6. Adding or removing sections

Edit `public/config/sections.json`. Each entry has `enabled` (boolean) and `order` (number) — toggle a section off or reorder the whole page without touching any component code. The `invitation` (opening tap-to-open screen) type is handled as an overlay rather than an in-page section; toggle it the same way via its `enabled` flag.

## 7. Adding photographs

1. Drop image files into the matching folder under `public/assets/images/` (`couple/`, `bride/`, `groom/`, `family/`, `ceremonies/`, `gallery/`, `illustrations/`).
2. Reference them in `wedding.json` using an absolute path starting with `/assets/...`.
3. Prefer WebP (or AVIF) and compress before uploading — large unoptimized photos are the single biggest hit to load time on mobile.
4. For the gallery, provide a smaller `thumb` image alongside the full-resolution `src`; the grid uses the thumbnail and the lightbox opens the full image.

Any image path that's missing or fails to load renders a labeled placeholder box instead of a broken image — the layout never breaks, but replace these before sharing the site.

## 8. Configuring ceremony schedules

Edit `ceremonies.bride` and `ceremonies.groom` in `wedding.json` independently — each side has its own list of ceremony objects, and the site's side-selector toggle reads directly from these arrays (nothing is duplicated in the UI layer).

## 9. Configuring WhatsApp and phone numbers

In `rsvp.bride` / `rsvp.groom`, set `phone` (international format, e.g. `+919876543210`) for a tap-to-call button, and `whatsapp` (same format) for a WhatsApp button that opens with a pre-filled RSVP message. If `whatsapp` is omitted but `phone` is present, the WhatsApp button falls back to `phone`.

There is intentionally no backend form — this is a zero-cost static site, so RSVP responses aren't collected centrally. Guests confirm via call or WhatsApp directly with your family contacts.

## 10. Configuring background music

`music.src` in `wedding.json` accepts **either**:

- An external URL (what the sample config ships with — a Wikimedia-hosted recording of Pachelbel's Canon, just to demonstrate the feature; see [CREDITS.md](CREDITS.md)), or
- A local file path under `public/assets/music/` (e.g. `"/assets/music/our-song.mp3"`) once you have your own track, from either `public/` or wherever your internal asset pipeline publishes files to.

Either way, music never autoplays — the closing section renders a Play/Pause button and playback only starts on a visitor tap, per standard browser autoplay policy and for accessibility. Omit the `music` key entirely to hide the control.

**Format note:** the placeholder track is an `.ogg` file, which Chrome/Firefox/Edge play fine but **Safari/iOS does not support**. When you swap in your own track, use an MP3 (or provide both and pick based on what your audience uses) so it plays everywhere, including iPhones.

## 11. Building for production

```bash
npm run build
```

Output goes to `dist/`. `npm run preview` serves that build locally so you can do a final check before deploying.

## 12. Deploying to Cloudflare Pages (recommended, ₹0/month)

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select the repo.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
4. Deploy. Your site is live at `your-project.pages.dev` with free HTTPS. A custom domain can be attached later without any code changes.

## 13. Deploying to GitHub Pages (alternative, ₹0/month)

1. In `vite.config.ts`, set `base: '/<your-repo-name>/'` if deploying to `https://<user>.github.io/<repo>/` (skip this if using a custom domain or a `<user>.github.io` root repo).
2. Build: `npm run build`.
3. Push the contents of `dist/` to a `gh-pages` branch (e.g. via the `gh-pages` npm package, or a GitHub Actions workflow that runs `npm run build` and deploys `dist/`).
4. Enable GitHub Pages for that branch in the repo's **Settings → Pages**.

## Assets that need replacing before publishing

All content in `public/config/wedding.json` uses clearly fictional sample names ("Ananya", "Rohan"). To make the demo visually complete, the hero, ceremony cards, venue, gallery, and one childhood-memory slot are currently filled with **real freely-licensed stock photos of real people and places who have no connection to this fictional couple** — pulled in specifically to show what the finished layout looks like. Family photos and the two individual bride/groom profile photos were left as placeholders. Before sharing the site:

- Replace every photo under `public/assets/images/...` with your own (see [CREDITS.md](CREDITS.md) for what's currently there and why).
- Delete `CREDITS.md` once none of its listed photos are still in use — it only exists to satisfy the Creative Commons attribution requirement on the current placeholders.
- Replace `blessing`, names, family details, love story text, ceremony details, venue, and RSVP contacts with your actual information.
- Replace `public/favicon.svg` with your own monogram if desired.
- Replace `music.src` with your own track — see **Configuring background music** above.
- Review `social.previewImage` and `social.description` — these populate link previews when the URL is shared on WhatsApp, social media, etc.

## What's intentionally not here

- No backend, database, authentication, or server-side RSVP storage — see section 9.
- No analytics or tracking scripts by default.
- No paid or API-key-gated map embed — the venue section links out to Google Maps via a plain URL.
- No admin dashboard — edit the JSON files directly with any text editor.
