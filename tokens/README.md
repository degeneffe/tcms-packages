# `@tcms/tokens`

Shared design tokens for TCMS: plain JavaScript constants with **zero
dependencies and no peers**. Published as `@degeneffe/tcms-tokens`.

> Formerly `@tcms/ui` (`@degeneffe/tcms-ui`). It never contained components, so
> it was renamed to say what it is ([#5](https://github.com/degeneffe/tcms-packages/issues/5)).

## Usage

```tsx
import { colors, spacing, typography, radii } from '@tcms/tokens'

;<div style={{ background: colors.bgSurface, padding: spacing[4], borderRadius: radii.lg }}>
  <span style={{ color: colors.textPrimary, fontSize: typography.fontSize.base }}>Test case</span>
</div>
```

There is a single entry point. The old `@tcms/ui/tokens` subpath is gone.

## Migrating from `@tcms/ui`

1. Alias the new package: `"@tcms/tokens": "npm:@degeneffe/tcms-tokens@^0.1.0"`
   (or `workspace:@degeneffe/tcms-tokens@*` for the submodule).
2. Replace `@tcms/ui/tokens` and `@tcms/ui` imports with `@tcms/tokens`.
3. Remove the `@tcms/ui` dependency.

## Why `react-native` is not a dependency

Nothing here renders a DOM or a native view, so neither `react-dom` nor
`react-native` is needed. `react-native` used to be a peer dependency and pulled
the full React Native 0.74 toolchain into consumers that only needed the
palette; it was removed in
[#2](https://github.com/degeneffe/tcms-packages/issues/2).

> **Do not add `react-native` here.** There is no native code in this package.

## Development

```bash
pnpm install          # from the repo root, not this directory
pnpm --filter @degeneffe/tcms-tokens build
```

`build` runs `tsc` and emits `dist/`. The `exports` map points at `dist`, matching
`@degeneffe/tcms-types` and `@degeneffe/tcms-gherkin-utils`. There is no test
command: the package is constants only.

## Scope

Tokens only. Components, if they ever happen, belong in a new package
(e.g. `@tcms/ui-web`), not here.
