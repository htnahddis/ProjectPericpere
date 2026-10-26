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
- `components/` — navigation, dashboard, video, reveal animations, footer
- `lib/data.ts` — navigation, product cards, journey strip, footer links, demo URL
- `public/images/` — product artwork and video poster
- `public/media/` — locally hosted product video

## Replace placeholders before launch

Temporary SVG placeholders are included so image paths resolve during development. Replace them with the approved Figma/product assets and update `lib/data.ts` if filenames change:

- `public/images/percixpert.svg`
- `public/images/perciserve.svg`
- `public/images/percihub.svg`
- `public/images/percisuite.svg`
- `public/images/futuroot.svg`
- `public/images/workflow.svg`

The video section currently uses the Mixkit clip [“Typing on a laptop”](https://mixkit.co/free-stock-video/typing-on-a-laptop-242/) (9 seconds, 720p), downloaded locally as `public/media/percipere-demo.mp4` with its poster at `public/images/video-poster.jpg`. Mixkit lists it under the [Stock Video Free License](https://mixkit.co/license/#videoFree) for commercial or personal use. Keep the source and license links with the asset; review Mixkit's current terms before redistribution or future replacement.

Product-card previews are locally hosted Mixkit stock clips (720p), each listed under the Stock Video Free License for commercial or personal use:

- PerciXpert: [Man working on his laptop](https://mixkit.co/free-stock-video/man-working-on-his-laptop-308/)
- PerciServe: [Hands of a programmer working on a desk](https://mixkit.co/free-stock-video/hands-of-a-programmer-working-on-a-desk-41652/)
- PerciHub: [Open office space](https://mixkit.co/free-stock-video/open-office-space-914/)
- PerciSuite: [Business people at work meeting](https://mixkit.co/free-stock-video/business-people-at-work-meeting-4809/)
- FUTUROOT: [Man visiting Twitter on his laptop](https://mixkit.co/free-stock-video/man-visiting-twitter-on-his-laptop-4916/)

## Before production

- Update `DEMO_HREF` in `lib/data.ts` to the real demo-booking route.
- Verify navigation and footer URLs against actual routes.
- Verify `JOURNEY` labels against Figma.
- Replace Inter Tight with the licensed brand font if available.
- Add the remaining product, company, resources, and legal pages if they are in scope. This package contains the supplied homepage implementation, not complete content for every linked route.
