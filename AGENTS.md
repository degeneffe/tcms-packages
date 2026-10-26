# AGENTS.md

Instructions for AI coding agents working in `tcms-packages`. Human
contributors should read [`CONTRIBUTING.md`](./CONTRIBUTING.md) first; this file
is the short, operational version.

## What this repository is

A library workspace with three shared TypeScript packages. It is **not** an
application: there is no API server, web app, database, deployment or runtime
entry point here.

The repository is consumed as a git submodule mounted at `packages/` by
`tcms-backend`, `tcms-frontend` and `tcms-mobile`. Those apps link the packages
with pnpm `workspace:*`. A change here is invisible to them until they update
their submodule pointer.

## Layout

| Directory        | Package                         | Build output | Consumer import specifiers    |
| ---------------- | ------------------------------- | ------------ | ----------------------------- |
| `types/`         | `@degeneffe/tcms-types`         | `dist/`      | `@tcms/types`                 |
| `gherkin-utils/` | `@degeneffe/tcms-gherkin-utils` | `dist/`      | `@tcms/gherkin-utils`         |
| `ui/`            | `@degeneffe/tcms-ui`            | `dist/`      | `@tcms/ui`, `@tcms/ui/tokens` |

Source lives in each package's `src/`; public API is re-exported from
`src/index.ts` and declared in that package's `package.json` `exports` map.
`dist/` is generated and ignored — never edit it.

## Commands

Requirements: Node.js >= 20, pnpm >= 9. Use the pnpm version pinned in
`package.json`.

```bash
pnpm install
pnpm build                                  # turbo: all three packages
pnpm test                                   # turbo: types + gherkin-utils suites
pnpm typecheck                              # turbo: tsc --noEmit per package
pnpm lint                                   # ESLint + Prettier check
pnpm lint:fix
pnpm --filter @degeneffe/tcms-types test
pnpm --filter @degeneffe/tcms-types typecheck
pnpm --filter @degeneffe/tcms-gherkin-utils test
pnpm --filter @degeneffe/tcms-ui build
```

Do not add a `test` script to `ui/` unless components and tests actually exist.
`types` and `gherkin-utils` have tests today.

## Consumer / import contract

| Consumer        | May import                                                 |
| --------------- | ---------------------------------------------------------- |
| `tcms-backend`  | `@tcms/types`, `@tcms/gherkin-utils`                       |
| `tcms-frontend` | `@tcms/types`, `@tcms/ui/tokens` (and `@tcms/ui` later)    |
| `tcms-mobile`   | `@tcms/types` only — never `@tcms/ui/tokens` or `@tcms/ui` |

Rules:

- Import packages through their public entry points, never through another
  package's `src/` or `dist/` path.
- Keep `@tcms/types` free of runtime dependencies.
- `@tcms/ui` exports plain token objects today. Do not add `react-native` as a
  dependency or peer; that was deliberately removed in issue #2. `react` and
  `react-dom` are optional peers for future components.
- Mobile uses React Native `StyleSheet`; the web token objects do not apply.

## Design tokens

The canonical definition is [`ui/src/tokens.ts`](./ui/src/tokens.ts). Consumers
import it as:

```tsx
import { colors, spacing, typography, radii } from '@tcms/ui/tokens'
```

- All web styles must use token values; never hardcode hex colours or pixel
  literals.
- Use semantic colours (`colors.statusPass`, `colors.priorityCritical`, …)
  instead of raw values.
- Add new values to the matching `as const` object in `ui/src/tokens.ts`;
  `ui/src/index.ts` already re-exports them.
- Renaming or removing a token is a breaking change for submodule consumers:
  coordinate it and update them.
- The full reference, categories and examples are in
  [`CONTRIBUTING.md`](./CONTRIBUTING.md#design-system).

## Versioning

- The packages are published to GitHub Packages as `@degeneffe/tcms-types`,
  `@degeneffe/tcms-gherkin-utils` and `@degeneffe/tcms-ui` (the scope must equal
  the repo owner). Consumers alias them back to `@tcms/*`.
- The `version` field is the released version. Bump it by hand in the PR that
  changes a package; `.github/workflows/publish.yml` publishes every version not
  yet in the registry when it lands on `main`. Published versions are immutable:
  fix forward with a patch release.
- Do not add Changesets, semantic-release or registry tokens. Never commit a
  token to `.npmrc`; CI uses `GITHUB_TOKEN`.
- Public API changes are breaking for consumers. Call them out in the pull
  request. Submodule consumers still bump their submodule pointer.
- Full process: [`CONTRIBUTING.md`](./CONTRIBUTING.md#versioning-and-releases).

## Working rules

- Use strict TypeScript and the existing formatting (no semicolons, single
  quotes, trailing commas, 120-column print width).
- Keep changes scoped. This is a small library workspace; do not introduce
  frameworks or build tools for a local problem.
- Use Conventional Commits (`type(scope): description`) and never add
  `Co-Authored-By` trailers.
- Link an issue in the pull request and add exactly one `type:*` label.
- Run `pnpm build`, `pnpm test` and `pnpm typecheck` before finishing. Run
  `pnpm lint` too and report any pre-existing failures rather than silently
  ignoring them.
- Update `README.md`, `CONTRIBUTING.md` or the relevant package README when a
  public contract changes.
