# tcms-packages

Shared TypeScript packages for TCMS (Test Case Management System), split out of
the [tcms](https://github.com/degeneffe/tcms) monorepo.

Published to **GitHub Packages** and consumed by
[tcms-backend](https://github.com/degeneffe/tcms-backend),
[tcms-frontend](https://github.com/degeneffe/tcms-frontend) and
[tcms-mobile](https://github.com/degeneffe/tcms-mobile), which alias them back
to the short `@tcms/*` import specifiers. They can also still be mounted as a
**git submodule** at `packages/`. See
[`CONTRIBUTING.md`](./CONTRIBUTING.md#versioning-and-releases) for the release
process and install instructions.

## Packages

| Package (directory)                                                                  | Purpose                                                                | Used by                   |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------- |
| `@degeneffe/tcms-types` (`types`, imported as `@tcms/types`)                         | Shared TypeScript enums, entity interfaces, API DTOs — no runtime deps | backend, frontend, mobile |
| `@degeneffe/tcms-gherkin-utils` (`gherkin-utils`, imported as `@tcms/gherkin-utils`) | Cucumber/Gherkin parser and validator                                  | backend                   |
| `@degeneffe/tcms-tokens` (`tokens`, imported as `@tcms/tokens`)                      | Shared design tokens, zero runtime dependencies                        | frontend                  |

## Development

```bash
pnpm install
pnpm build   # builds all 3 packages via turbo
pnpm test    # runs the types and gherkin-utils test suites
pnpm typecheck
```

## Documentation

- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — setup, package contracts, design system and versioning.
- [`AGENTS.md`](./AGENTS.md) — repository map and rules for AI coding agents.
- [`tokens/README.md`](./tokens/README.md) — `@tcms/tokens` entry points and scope.

## Design tokens

Design values live in [`tokens/src/tokens.ts`](./tokens/src/tokens.ts) and are consumed
as `@tcms/tokens`. That file is the canonical source of truth for colours,
spacing, typography and radii; see
[`CONTRIBUTING.md`](./CONTRIBUTING.md#design-system) for the rules and examples.

## Updating a submodule consumer after a change here

Consumers installing from the registry just bump the version range. A consumer
that still mounts this repo as a submodule pins a specific commit; after pushing
a change here, update the pointer:

```bash
cd tcms-backend/packages    # or tcms-frontend/packages, tcms-mobile/packages
git checkout main
git pull
cd ..
git add packages
git commit -m "chore: bump tcms-packages submodule"
```
