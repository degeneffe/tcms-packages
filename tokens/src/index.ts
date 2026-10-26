/**
 * `@tcms/tokens` — shared design tokens.
 *
 * Plain token objects: no React, no React Native, no dependencies. The package
 * was named `@tcms/ui` until #5 renamed it to say what it actually contains.
 * `react-native` is deliberately absent: declaring it made pnpm install the
 * full RN 0.74 toolchain into web consumers that only need a colour palette (#2).
 */

export { colors, spacing, typography, radii } from './tokens'
