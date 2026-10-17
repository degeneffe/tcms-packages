/**
 * `@tcms/ui` — shared design tokens and components.
 *
 * Two entry points:
 *   - `@tcms/ui`         — this module (tokens + whatever components land next)
 *   - `@tcms/ui/tokens`  — tokens only, for consumers that cannot take the
 *                          component tree (e.g. a React Native app with no DOM)
 *
 * Both apps consume this package and they are NOT on the same React version:
 *
 *   | Consumer                  | React    | Renderer          |
 *   |---------------------------|----------|-------------------|
 *   | apps/web/apps/web         | ^19.1.0  | react-dom (DOM)   |
 *   | apps/mobile/apps/mobile   | 18.2.0   | react-native 0.74 |
 *
 * That is why `react`, `react-dom` and `react-native` are optional peer
 * dependencies here and not dependencies: pinning either one installed a
 * React 19 + React Native 0.74.5 tree into every consumer, and RN 0.74
 * hard-peers `react@18.2.0`, so the result was a tree nobody can actually
 * render. Never add them back to `dependencies` (#226).
 */

export { colors, spacing, typography, radii } from './tokens'
