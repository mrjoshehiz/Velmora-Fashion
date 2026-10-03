# Impeccable design review

The initial storefront repeated products in the hero, an automatic dress rail, new arrivals, an occasion section and the complete collection. A second sticky navigation row promoted seven secondary experiences equally with shopping. The chat launcher included an AI badge, a decorative icon tile and an unsupported ONLINE label. The runway repeated the same products in an animated marquee.

Changes:

- Replace the automatic dress carousel with a still dress edit, and render each runway product once in a responsive grid.
- Remove the second navigation row; group secondary experiences under Explore and retain all routes in the mobile menu/footer.
- Remove chat badges, the ONLINE label, sparkle decoration and the redundant assistant-mode request. Keep the assistant and its product recommendations.
- Remove redundant homepage kickers/counters, the complete-collection repeat and illustrative testimonials. Keep real approved reviews.
- Move hero captions below images; improve heading rhythm, page gutters, responsive grids and product touch targets.
- Replace the custom mobile-menu backdrop with the existing Radix Sheet for focus management and Escape dismissal; add a skip link and shared focus styling.
- Delete the unused carousel component and its CSS, old navigation styles, marquee styles, chat badge styles and bag-dot styles.

Validation completed (2026-10-03):

- Installed all dependencies from the frozen pnpm lockfile.
- Impeccable engine 0.1.11 installed in the versioned local cache; context loading succeeds.
- Manual Impeccable detector reports no findings for the changed header, chat, bag provider and editorial stylesheet.
- `pnpm lint` passes with 0 errors and 28 existing warnings (image optimization, unused declarations and internal-navigation warnings).
- `pnpm exec tsc --noEmit` passes.
- `pnpm build` passes, including the managed Linux build after execution-profile configuration.
- Fixed the home navigation link and escaped about-page text. Excluded vendored Impeccable scripts from storefront linting. Documented the deliberate after-mount browser-state restoration for SSR hydration.
- Product-card quick add is disabled for sold-out items, matching the product detail page.
- Chat checks HTTP status before presenting a response as successful.
- Supervised preview starts after restoring the managed Linux execution profile.

Validation remaining:

The required control-browser capability is unavailable in this session. No rendered desktop/mobile layout inspection or interactive browser testing was performed. Source review is not a substitute for exercising mobile Sheet focus/Escape, Explore, product sizes/save/bag persistence, quantity/remove, and chat responses.

Keep PR #1 in draft and do not merge or deploy until this required browser review is complete. The production site is unchanged.
