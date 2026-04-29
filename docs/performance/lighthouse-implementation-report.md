# Lighthouse Performance Implementation Report

## Baseline

URL: `https://captivedemand.com/`

Device profile: mobile viewport `390x844`, touch, Chrome DevTools performance trace.

Screenshot: `docs/performance/baseline-mobile-hero.png`

Notes:
- Lighthouse MCP reported `LCP: N/A` / no LCP candidate for this route, so the baseline uses Chrome trace insights and the visible hero screenshot as the candidate evidence.
- The likely LCP region is the above-the-fold hero headline in `src/components/sections/Hero.tsx`.
- First paint and FCP from the trace were about `712ms`; navigation TTFB was about `190ms` on this run.

## Baseline Findings

1. Font display and broken duplicate fonts
   - Trace issue: `FontDisplay`
   - Estimated savings: `765ms` FCP
   - Affected URLs: `/fonts/Nohemi-Light.ttf`, `/fonts/Nohemi-Regular.ttf`, `/fonts/Nohemi-SemiBold.ttf`
   - Code owner: `src/components/layout/Footer.tsx`

2. Render-blocking CSS
   - Trace issue: `RenderBlocking`
   - Requests: two Next CSS chunks
   - Estimated savings: none reported by trace
   - Code owner: global CSS/layout structure in `src/app/globals.css` and `src/app/layout.tsx`

3. Third-party payload
   - Trace issue: `ThirdParties`
   - Largest transfers: Facebook around `548KB`, Google Tag Manager around `416KB`
   - Code owners: `src/components/analytics/GoogleTagManager.tsx`, `src/components/booking/GhlLeadConnectorBooking.tsx`, `src/components/sections/CTASection.tsx`

4. Forced reflow
   - Trace issue: `ForcedReflow`
   - Total reflow time: about `235ms`
   - Code owners: above-the-fold animation in `src/components/sections/Hero.tsx` and carousel transform loop in `src/components/ui/Carousel.tsx`

5. Carousel image payload
   - Production eagerly requests many `_next/image` carousel entries at first load.
   - Largest optimized carousel responses observed included `goodmanors.png` around `1.25MB`, `theskinrealserenbe.png` around `1.15MB`, and `twocents.png` around `1MB`.
   - Code owners: `src/components/sections/Hero.tsx`, `src/components/ui/Carousel.tsx`, `src/components/ui/Card.tsx`

## Implemented Changes

1. Removed duplicate footer font declarations
   - File: `src/components/layout/Footer.tsx`
   - Result: footer typography now uses the global `Nohemi` face from `src/app/globals.css`, avoiding the broken `/fonts/Nohemi-Light.ttf`, `/fonts/Nohemi-Regular.ttf`, and `/fonts/Nohemi-SemiBold.ttf` requests.

2. Deferred offscreen carousel image mounting
   - Files: `src/components/ui/Carousel.tsx`, `src/components/ui/Card.tsx`
   - Result: card shells, text, spacing, rotation, and shadows stay the same, while heavy card images mount only when their cards approach the visible arc.

3. Reduced carousel animation overhead
   - File: `src/components/ui/Carousel.tsx`
   - Result: the ticker now uses direct transform writes for card rotation and avoids repeating unchanged filter writes.

4. Lazy-mounted the booking iframe
   - File: `src/components/booking/GhlLeadConnectorBooking.tsx`
   - Result: the booking frame reserves the same space but does not load the LeadConnector iframe until it nears the viewport.

5. Fixed the hero video source path
   - File: `src/components/sections/Hero.tsx`
   - Result: the hero video uses the existing non-`copy` MP4 path that returns `200` locally and avoids a missing media request.

## Validation

Local production URL: `http://localhost:3001/`

Screenshots:
- Before: `docs/performance/baseline-mobile-hero.png`
- After: `docs/performance/final-mobile-hero.png`

Checks:
- `npm run build`: passed.
- Lints for touched files: no errors.
- Old footer font requests: `0`.
- Old hero `copy.mp4` requests: `0`.
- LeadConnector iframe requests during initial load: `0`.
- Fixed hero video URL: `200 video/mp4`.
- Forced reflow: reduced from about `235ms` baseline to about `68ms` after changes.
- Final trace FCP: about `724ms`; CLS remained `0.00`.

Notes:
- The final Chrome trace still did not consistently emit an LCP entry for the route, matching the earlier Lighthouse `LCP: N/A` behavior. The route is still documented through trace insights, screenshots, network evidence, and paint timing.
- GTM/Facebook still load lazily after page load through the existing tag setup. The LeadConnector iframe is no longer on the initial load path.

