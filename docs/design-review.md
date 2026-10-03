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

Validation completed:

- Parsed all edited TSX files with the installed Playwright Babel parser.
- Rendered the homepage, header, footer and chat trigger to a static source fixture using seed products and mock hooks/infrastructure. This checks initial source rendering only.
- Checked the diff for whitespace errors and reviewed imports and routes.

Validation blocked:

- Dependency installation cannot reach the npm registry in this workspace. Full type checking, linting and the application build have not run.
- Chromium launch is blocked by the workspace socket permissions. No desktop/mobile screenshots or interactive browser checks completed.
- Impeccable's engine download is blocked. Its CLI detector and context command have not run successfully.

Before merging, install dependencies in a working environment, run `pnpm lint` and `pnpm build`, and inspect the homepage, catalog, product sizes/save/bag actions, Explore menu, mobile Sheet, chat and runway at desktop and narrow mobile widths. Verify safe-area spacing and reduced-motion behavior. This change is kept as a draft until those checks are complete.
