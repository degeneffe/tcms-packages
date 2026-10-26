# Contributing to tcms-packages

`tcms-packages` contains the TypeScript packages shared by the TCMS backend, web
frontend and mobile app. It is a **library workspace**, not a deployable
application: there is no server, route, database or UI entry point here.

Consumers either mount this repository as a git submodule at `packages/` (pnpm
`workspace:*`) or install the published packages from GitHub Packages. See
[Versioning and releases](#versioning-and-releases).

## Repository layout

| Directory        | Published package               | Import specifier in consumers | Consumers                 |
| ---------------- | ------------------------------- | ----------------------------- | ------------------------- |
| `types/`         | `@degeneffe/tcms-types`         | `@tcms/types`                 | backend, frontend, mobile |
| `gherkin-utils/` | `@degeneffe/tcms-gherkin-utils` | `@tcms/gherkin-utils`         | backend                   |
| `tokens/`        | `@degeneffe/tcms-tokens`        | `@tcms/tokens`                | frontend                  |

GitHub Packages only accepts a scope equal to the owner of the repository, so the
published names live under `@degeneffe`. Consumers keep the short `@tcms/*`
import specifiers through an install alias (see below); only `package.json`
changes, not source files. Everywhere else in this document, `@tcms/*` means
the import specifier.

`types/` and `gherkin-utils/` compile to `dist/` with `tsc`; `tokens/` builds the
same way and exposes a single entry point.

## Getting started

Requirements: Node.js >= 20 and pnpm >= 9. The exact pnpm version is pinned in
`package.json` (`packageManager`).

```bash
pnpm install
pnpm build          # builds all three packages through turbo
pnpm test           # runs the types and gherkin-utils suites
pnpm typecheck      # typechecks tests and type-level assertions
pnpm lint           # ESLint + Prettier check
pnpm lint:fix       # autofix both
```

Useful scoped commands:

```bash
pnpm --filter @degeneffe/tcms-types test
pnpm --filter @degeneffe/tcms-types typecheck
pnpm --filter @degeneffe/tcms-gherkin-utils test
pnpm --filter @degeneffe/tcms-gherkin-utils test:watch
pnpm --filter @degeneffe/tcms-tokens build
```

All source is strict TypeScript. Keep `dist/`, `node_modules/`, `coverage/` and
`.turbo/` out of commits; they are generated or ignored.

## Design system

### Canonical source

The design system is a set of **plain JavaScript constants**, not CSS variables,
Tailwind classes or CSS Modules. The canonical definition is
[`tokens/src/tokens.ts`](./tokens/src/tokens.ts); the public import path is
`@tcms/tokens`.

JavaScript constants were chosen over a CSS-based system because TCMS styles
React components with inline `style={{ ... }}` objects. Tokens give every
consumer one source of truth without requiring a build-system change or a
migration away from inline styles.

### Importing tokens

```tsx
import { colors, spacing, typography, radii } from '@tcms/tokens'

const buttonStyle: React.CSSProperties = {
  background: colors.primary,
  color: colors.bgSurface,
  borderRadius: radii.lg,
  padding: `${spacing[2]}px ${spacing[4]}px`,
  fontSize: typography.fontSize.md,
  fontWeight: typography.fontWeight.semibold,
}
```

Do not deep-import `tokens/src/tokens.ts` from a consumer. `@tcms/tokens` is the
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
- Add new values to the matching constant in `tokens/src/tokens.ts`, keeping
  `as const` so literal types survive.
- `tokens/src/index.ts` re-exports the tokens, so no export-map change is needed for
  a new token value. Rebuild the package after editing it.

### Mobile

React Native does not support the web inline-style token objects. Mobile
components use React Native `StyleSheet` and **must not** import
`@tcms/tokens`.

## Package contracts

- `@tcms/types` — enums, entity interfaces and API DTOs with **no runtime
  dependencies**. Import with `import type { ... } from '@tcms/types'` where
  only types are needed.
- `@tcms/gherkin-utils` — Cucumber/Gherkin parsing and validation
  (`parseFeature`, `validateGherkin`, `extractFeatureName`, `extractTags`,
  `countScenarios`). It depends on `@cucumber/gherkin` and
  `@cucumber/messages`.
- `@tcms/tokens` — design tokens only, with no dependencies or peers (renamed
  from `@tcms/ui` in issue #5). It ships no components; `react-native` is
  deliberately **not** a dependency (see issue #2).

Rules for all packages:

- Public API goes through each package's `src/index.ts` and `exports` map. Never
  import another workspace package's `src/` or `dist/` path directly.
- New runtime dependencies need a concrete justification. `@tcms/types` must
  stay dependency-free.
- Keep the three packages' `exports` maps aligned: built `dist/` output with
  `types` and `import` conditions.

## Versioning and releases

The packages are published to **GitHub Packages** (`https://npm.pkg.github.com`)
under the `@degeneffe` scope. The `version` field of each `package.json` is the
released version, using [SemVer](https://semver.org). While the major is `0`,
a breaking change bumps the minor and anything else bumps the patch.

Versioning is **manual**, driven by Conventional Commits; there is no Changesets
or semantic-release tooling to maintain.

### Releasing

1. In the pull request that changes a package, bump that package's `version`
   (`feat` → minor, `fix` → patch, breaking → minor while `0.x`, major after).
   If `@degeneffe/tcms-types` changes, also bump the packages that depend on it
   when they need the new version.
2. Merge to `main`. [`publish.yml`](./.github/workflows/publish.yml) builds,
   typechecks and tests everything, then runs `pnpm -r publish`. pnpm skips every
   version already in the registry, so a merge that does not bump a version
   publishes nothing and a failed run can simply be re-run.
3. Check the result under the repository's **Packages** tab.

The workflow authenticates with the job's `GITHUB_TOKEN` (`packages: write`).
No registry token is stored in the repository; never commit one to `.npmrc`.

### Rollback and patch releases

Published versions are immutable. To fix a bad release, **publish a newer patch**
(revert or fix, bump `version`, merge). Then mark the bad one so installs warn:

```bash
npm deprecate @degeneffe/tcms-types@0.1.0 "Broken enum export, use >=0.1.1" \
  --registry=https://npm.pkg.github.com
```

A version can be deleted from the package's settings page on GitHub only when it
leaks something it must not; deleting breaks any consumer lockfile that pins it.

### Consuming from the registry

Consumers map the scope to GitHub Packages and alias the published name to the
short import specifier, so no source file changes:

```ini
# .npmrc in the consumer (the token comes from the environment, never the file)
@degeneffe:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```json
{
  "dependencies": {
    "@tcms/types": "npm:@degeneffe/tcms-types@^0.1.0",
    "@tcms/gherkin-utils": "npm:@degeneffe/tcms-gherkin-utils@^0.1.0"
  }
}
```

`NODE_AUTH_TOKEN` needs a token with `read:packages`. In CI use `GITHUB_TOKEN`
with `packages: read`. In a Dockerfile pass it as a BuildKit secret, not a build
arg, so it never lands in an image layer:

```dockerfile
RUN --mount=type=secret,id=node_auth_token \
    NODE_AUTH_TOKEN="$(cat /run/secrets/node_auth_token)" pnpm install --frozen-lockfile
```

### Migrating a consumer off the submodule

Until a consumer switches to the registry it keeps working with the submodule
and `workspace:*`, but the workspace package names changed to `@degeneffe/*`.
Such a consumer must alias the workspace package too
(`"@tcms/types": "workspace:@degeneffe/tcms-types@*"`) or move to the registry.
After a change lands, a submodule consumer still updates its pointer:

```bash
cd tcms-backend/packages    # or tcms-frontend/packages, tcms-mobile/packages
git checkout main
git pull
cd ..
git add packages
git commit -m "chore: bump tcms-packages submodule"
```

Treat public API changes as breaking for consumers and call them out in the pull
request.

## Commits and pull requests

- Use Conventional Commits: `type(scope): description`, with types such as
  `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- Do not add `Co-Authored-By` trailers.
- Link the issue a pull request closes and add exactly one `type:*` label.
- Keep tests and documentation in the same change as the behavior they describe.
- Before opening a pull request, run `pnpm build`, `pnpm test`,
  `pnpm typecheck` and `pnpm lint` (or the scoped equivalent). If lint reports
  pre-existing issues in files you did not touch, say so in the pull request
  instead of hiding it.

## Documentation

- [`README.md`](./README.md) — repository overview and package table.
- [`AGENTS.md`](./AGENTS.md) — repository map and rules for AI coding agents.
- [`tokens/README.md`](./tokens/README.md) — `@tcms/tokens` entry points and scope.
