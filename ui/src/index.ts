/**
 * `@tcms/ui` — shared design tokens.
 *
 * Two entry points:
 *   - `@tcms/ui`         — this module (tokens + whatever components land next)
 *   - `@tcms/ui/tokens`  — tokens only, for consumers that cannot take the
 *                          component tree
 *
 * The package ships plain token objects today: no React, no React Native.
 * `react` and `react-dom` remain optional peers for the components that will
 * land later. `react-native` is deliberately absent: declaring it made pnpm
 * install the full RN 0.74 toolchain into web consumers that only need a
 * colour palette (#2).
 */

export { colors, spacing, typography, radii } from './tokens'
