# Contributing to tcms-packages

`tcms-packages` contains the TypeScript packages shared by the TCMS backend, web
frontend and mobile app. It is a **library workspace**, not a deployable
application: there is no server, route, database or UI entry point here.

Consumers import this repository as a git submodule mounted at `packages/` and
link the packages with pnpm `workspace:*`. A change merged here reaches a
consumer only when that consumer updates its submodule pointer.

## Repository layout

| Directory        | Package               | Public entry point            | Consumers                 |
| ---------------- | --------------------- | ----------------------------- | ------------------------- |
| `types/`         | `@tcms/types`         | `@tcms/types`                 | backend, frontend, mobile |
| `gherkin-utils/` | `@tcms/gherkin-utils` | `@tcms/gherkin-utils`         | backend                   |
| `ui/`            | `@tcms/ui`            | `@tcms/ui`, `@tcms/ui/tokens` | frontend                  |

`types/` and `gherkin-utils/` compile to `dist/` with `tsc`; `ui/` builds the
same way and exposes both a full entry point and a tokens-only entry point.

## Getting started

Requirements: Node.js >= 20 and pnpm >= 9. The exact pnpm version is pinned in
`package.json` (`packageManager`).

```bash
pnpm install
pnpm build          # builds all three packages through turbo
pnpm test           # runs the gherkin-utils suite
pnpm lint           # ESLint + Prettier check
pnpm lint:fix       # autofix both
```

Useful scoped commands:

```bash
pnpm --filter @tcms/gherkin-utils test
pnpm --filter @tcms/gherkin-utils test:watch
pnpm --filter @tcms/ui build
```

All source is strict TypeScript. Keep `dist/`, `node_modules/`, `coverage/` and
`.turbo/` out of commits; they are generated or ignored.

## Design system

### Canonical source

The design system is a set of **plain JavaScript constants**, not CSS variables,
Tailwind classes or CSS Modules. The canonical definition is
[`ui/src/tokens.ts`](./ui/src/tokens.ts); the public import path is
`@tcms/ui/tokens`.

JavaScript constants were chosen over a CSS-based system because TCMS styles
React components with inline `style={{ ... }}` objects. Tokens give every
consumer one source of truth without requiring a build-system change or a
migration away from inline styles.

### Importing tokens

```tsx
import { colors, spacing, typography, radii } from '@tcms/ui/tokens'

const buttonStyle: React.CSSProperties = {
  background: colors.primary,
  color: colors.bgSurface,
  borderRadius: radii.lg,
  padding: `${spacing[2]}px ${spacing[4]}px`,
  fontSize: typography.fontSize.md,
  fontWeight: typography.fontWeight.semibold,
}
```

Do not deep-import `ui/src/tokens.ts` from a consumer. `@tcms/ui/tokens` is the
stable entry point and resolves to the built package.

### Token categories

| Export       | Contents                                                                      | Example                               |
| ------------ | ----------------------------------------------------------------------------- | ------------------------------------- |
| `colors`     | Backgrounds, borders, text, interactive, execution/test-case status, priority | `colors.primary`, `colors.statusPass` |
| `spacing`    | Pixel spacing scale: 0, 4, 8, 12, 16, 20, 24, 32, 48                          | `spacing[4]` → `16`                   |
| `typography` | Font family, font size and font weight constants                              | `typography.fontSize.md` → `14`       |
| `radii`      | Border-radius constants                                                       | `radii.lg` → `8`                      |

Use semantic names rather than raw values. In particular:

```tsx
// Execution status
colors.statusPass
colors.statusFail
colors.statusSkip
colors.statusBlocked
colors.statusPending

// Test-case status
colors.statusActive
colors.statusDraft
colors.statusDeprecated

// Priority
colors.priorityCritical
colors.priorityHigh
colors.priorityMedium
colors.priorityLow
```

`colors.colorError` exists for destructive/error UI and is intentionally distinct
from the `statusFail` execution badge.

### Rules

- Never hardcode hex colours or pixel literals in consumer components; use the
  closest token.
- Do not rename or remove an existing token without checking its consumers.
  Consumers pin a specific commit of this repository, so a rename is a breaking
  change that must be coordinated.
- Add new values to the matching constant in `ui/src/tokens.ts`, keeping
  `as const` so literal types survive.
- `ui/src/index.ts` re-exports the tokens, so no export-map change is needed for
  a new token value. Rebuild the package after editing it.

### Mobile

React Native does not support the web inline-style token objects. Mobile
components use React Native `StyleSheet` and **must not** import
`@tcms/ui/tokens`.

## Package contracts

- `@tcms/types` — enums, entity interfaces and API DTOs with **no runtime
  dependencies**. Import with `import type { ... } from '@tcms/types'` where
  only types are needed.
- `@tcms/gherkin-utils` — Cucumber/Gherkin parsing and validation
  (`parseFeature`, `validateGherkin`, `extractFeatureName`, `extractTags`,
  `countScenarios`). It depends on `@cucumber/gherkin` and
  `@cucumber/messages`.
- `@tcms/ui` — currently tokens only. `@tcms/ui` is the future component entry
  point; `@tcms/ui/tokens` is the tokens-only entry point. `react` and
  `react-dom` are optional peers; `react-native` is deliberately **not** a peer
  or dependency (see issue #2).

Rules for all packages:

- Public API goes through each package's `src/index.ts` and `exports` map. Never
  import another workspace package's `src/` or `dist/` path directly.
- New runtime dependencies need a concrete justification. `@tcms/types` must
  stay dependency-free.
- Keep the three packages' `exports` maps aligned: built `dist/` output with
  `types` and `import` conditions.

## Versioning and consuming changes

All three packages are `private: true` and currently declare `version: 0.0.1`.
**The version that consumers actually use is this repository's git commit**, not
the `version` field: each consumer pins a commit through its submodule pointer
and resolves the packages with `workspace:*`. There is no registry publication
yet; publishing is tracked in issue #9.

Therefore:

- Do not bump package versions or add release tooling as part of an unrelated
  change.
- Treat public API changes as breaking for consumers even if `version` does not
  move.
- After a change lands, each affected consumer must update its `packages/`
  submodule pointer and rebuild.

```bash
cd tcms-backend/packages    # or tcms-frontend/packages, tcms-mobile/packages
git checkout main
git pull
cd ..
git add packages
git commit -m "chore: bump tcms-packages submodule"
```

## Commits and pull requests

- Use Conventional Commits: `type(scope): description`, with types such as
  `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- Do not add `Co-Authored-By` trailers.
- Link the issue a pull request closes and add exactly one `type:*` label.
- Keep tests and documentation in the same change as the behavior they describe.
- Before opening a pull request, run `pnpm build`, `pnpm test` and
  `pnpm lint` (or the scoped equivalent). If lint reports pre-existing issues in
  files you did not touch, say so in the pull request instead of hiding it.

## Documentation

- [`README.md`](./README.md) — repository overview and package table.
- [`AGENTS.md`](./AGENTS.md) — repository map and rules for AI coding agents.
- [`ui/README.md`](./ui/README.md) — `@tcms/ui` entry points and scope.
