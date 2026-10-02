# Upstream effects

- Liquid Glass JS: https://github.com/dashersw/liquid-glass-js (MIT). ESM import, React cleanup and container-only use adapted in lib/effects/liquid-glass.js.
- Scroll World: https://github.com/oso95/scroll-world (MIT). Original scrub engine adapted for a page section and cleanup in lib/effects/scroll-world.js. Existing product photography provides the posters; no paid camera-flight media generated.
- React Three Fiber: @react-three/fiber 9, used by Shader Gradient for the Three.js scene.
- Shader Gradient: @shadergradient/react 2.4.20 (MIT).
- Paper Liquid Logo: official LiquidMetal integration via @paper-design/shaders-react 0.0.81 (Apache-2.0); original demo app is not redistributed.

Review correction: the story now uses a section-scoped sticky viewport, retains the final scene as it exits, keeps each current product action visible, makes inactive copy inert, and supplies contrasting buttons. These corrections await browser visual review before publication.
