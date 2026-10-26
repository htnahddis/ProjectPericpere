# Percipere.ai homepage (Next.js App Router + TypeScript)

This is a structured, runnable project assembled from the supplied source files.

## Run locally

1. Install Node.js 20.9+.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

To check a production build, run `npm run build`.

## Project structure

- `app/page.tsx` — homepage sections
- `app/layout.tsx` — root layout and metadata
- `app/globals.css` — design system and responsive styling
- `components/` — navigation, dashboard, product previews, reveal animations, footer
- `lib/data.ts` — navigation, product cards, footer links, demo URL
- `public/images/` — product artwork and product-video posters
- `public/media/products/` — locally hosted product videos

The homepage uses scroll-triggered text, section, dashboard and product-preview motion. Animations respect reduced-motion preferences and fall back to visible content. The standalone demo-video strip and SAP technology ticker have been removed from the homepage.

## Replace placeholders before launch

Temporary SVG placeholders are included so image paths resolve during development. Replace them with the approved Figma/product assets and update `lib/data.ts` if filenames change:

- `public/images/percixpert.svg`
- `public/images/perciserve.svg`
- `public/images/percihub.svg`
- `public/images/percisuite.svg`
- `public/images/futuroot.svg`
- `public/images/workflow.svg`

Product-card previews are locally hosted Mixkit stock clips (720p), each listed under the Stock Video Free License for commercial or personal use:

- PerciXpert: [Man working on his laptop](https://mixkit.co/free-stock-video/man-working-on-his-laptop-308/)
- PerciServe: [Hands of a programmer working on a desk](https://mixkit.co/free-stock-video/hands-of-a-programmer-working-on-a-desk-41652/)
- PerciHub: [Open office space](https://mixkit.co/free-stock-video/open-office-space-914/)
- PerciSuite: [Business people at work meeting](https://mixkit.co/free-stock-video/business-people-at-work-meeting-4809/)
- FUTUROOT: [Man visiting Twitter on his laptop](https://mixkit.co/free-stock-video/man-visiting-twitter-on-his-laptop-4916/)

## Before production

- Update `DEMO_HREF` in `lib/data.ts` to the real demo-booking route.
- Verify navigation and footer URLs against actual routes.
- Replace Inter Tight with the licensed brand font if available.
- Add the remaining product, company, resources, and legal pages if they are in scope. This package contains the supplied homepage implementation, not complete content for every linked route.
