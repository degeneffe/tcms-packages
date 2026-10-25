# `@tcms/ui`

Shared design tokens for TCMS.

## Entry points

| Specifier         | Contents                   | Use it when                                     |
| ----------------- | -------------------------- | ----------------------------------------------- |
| `@tcms/ui`        | Tokens + future components | React DOM (apps/web)                            |
| `@tcms/ui/tokens` | Tokens only                | You want the palette without the component tree |

```tsx
import { colors, spacing, typography, radii } from '@tcms/ui/tokens'

;<div style={{ background: colors.bgSurface, padding: spacing[4], borderRadius: radii.lg }}>
  <span style={{ color: colors.textPrimary, fontSize: typography.fontSize.base }}>Test case</span>
</div>
```

## Why `react-native` is not a dependency

This package currently exports **plain JavaScript token objects** — `colors`,
`spacing`, `typography` and `radii`. Nothing here renders a DOM or a native
view, so neither `react-dom` nor `react-native` is needed to consume it.

`react-native` used to be declared as a peer dependency. pnpm resolves peer
dependencies for workspace packages, so consumers that only need the palette
still installed the full React Native 0.74 toolchain and a React version the
app did not use. The peer was removed in
[#2](https://github.com/degeneffe/tcms-packages/issues/2).

`react` and `react-dom` remain **optional peer dependencies** for the
components that will land later:

```json
"peerDependencies": {
  "react": ">=18",
  "react-dom": ">=18"
},
"peerDependenciesMeta": {
  "react": { "optional": true },
  "react-dom": { "optional": true }
}
```

> **Do not add `react-native` here.** There is no native code in this package.
> See [#226](https://github.com/degeneffe/tcms/issues/226).

## Development

```bash
pnpm install          # from the repo root, not this directory
pnpm --filter @tcms/ui build
```

`build` runs `tsc` and emits `dist/`. The `exports` map points at `dist`, matching
`@tcms/types` and `@tcms/gherkin-utils`.

There is no test command yet: the package has no components and no tests. The
component test harness was removed in
[#2](https://github.com/degeneffe/tcms-packages/issues/2) so it does not sit
unused in every consumer install.

## Status

`src/` currently ships **tokens only** — `tokens.ts` and the package entry point.
There are no components yet. Adding them unblocks
[#122](https://github.com/degeneffe/tcms/issues/122) (component tests) and
[#123](https://github.com/degeneffe/tcms/issues/123) (token validation), which
currently have nothing to test against.
