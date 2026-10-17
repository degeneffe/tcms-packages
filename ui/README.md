# `@tcms/ui`

Shared design tokens and UI components for TCMS.

## Entry points

| Specifier         | Contents                 | Use it when                                         |
| ----------------- | ------------------------ | --------------------------------------------------- |
| `@tcms/ui`        | Tokens + every component | React DOM (apps/web) and React Native (apps/mobile) |
| `@tcms/ui/tokens` | Tokens only              | You want the palette without the component tree     |

```tsx
import { colors, spacing, typography, radii } from '@tcms/ui/tokens'

;<div style={{ background: colors.bgSurface, padding: spacing[4], borderRadius: radii.lg }}>
  <span style={{ color: colors.textPrimary, fontSize: typography.fontSize.base }}>Test case</span>
</div>
```

## Why `react` is not a dependency

This package has **two** consumers, and they are not on the same React version:

| Consumer                                                | React     | Renderer              |
| ------------------------------------------------------- | --------- | --------------------- |
| [apps/web](https://github.com/degeneffe/tcms-frontend)  | `^19.1.0` | `react-dom`           |
| [apps/mobile](https://github.com/degeneffe/tcms-mobile) | `18.2.0`  | React Native `0.74.5` |

React Native 0.74 declares `react: 18.2.0` as a **hard** peer dependency. When
`@tcms/ui` pinned `react: ^19.1.0` and `react-native: 0.74.5` in `dependencies`,
every install produced a tree where RN 0.74 was linked against React 19 — a
combination RN explicitly rejects — and forced ~800 packages of native toolchain
onto a consumer that only needs a colour palette.

So `react`, `react-dom` and `react-native` are declared as **optional peer
dependencies**. Each app brings its own:

```json
"peerDependencies": {
  "react": ">=18",
  "react-dom": ">=18",
  "react-native": ">=0.74"
},
"peerDependenciesMeta": {
  "react": { "optional": true },
  "react-dom": { "optional": true },
  "react-native": { "optional": true }
}
```

`pnpm-workspace.yaml` in this repo sets `autoInstallPeers: false` to enforce it —
pnpm defaults it to `true`, which would silently install the optional peers and
reproduce the original broken tree.

> **Do not move `react` or `react-native` back into `dependencies`.** See
> [#226](https://github.com/degeneffe/tcms/issues/226).

## Development

```bash
pnpm install          # from the repo root, not this directory
pnpm --filter @tcms/ui build
pnpm --filter @tcms/ui test
```

`build` runs `tsc` and emits `dist/`. The `exports` map points at `dist`, matching
`@tcms/types` and `@tcms/gherkin-utils`.

## Status

`src/` currently ships **tokens only** — `tokens.ts` and the package entry point.
There are no components yet. Adding them unblocks
[#122](https://github.com/degeneffe/tcms/issues/122) (component tests) and
[#123](https://github.com/degeneffe/tcms/issues/123) (token validation), which
currently have nothing to test against.
