# tcms-packages

Shared TypeScript packages for TCMS (Test Case Management System), split out of
the [tcms](https://github.com/degeneffe/tcms) monorepo.

Consumed as a **git submodule** at `packages/` by
[tcms-backend](https://github.com/degeneffe/tcms-backend),
[tcms-frontend](https://github.com/degeneffe/tcms-frontend) and
[tcms-mobile](https://github.com/degeneffe/tcms-mobile) — each references it
via `workspace:*` from their own `apps/*/package.json`.

## Packages

| Package                                 | Purpose                                                                | Used by                   |
| --------------------------------------- | ---------------------------------------------------------------------- | ------------------------- |
| `types` (`@tcms/types`)                 | Shared TypeScript enums, entity interfaces, API DTOs — no runtime deps | backend, frontend, mobile |
| `gherkin-utils` (`@tcms/gherkin-utils`) | Cucumber/Gherkin parser and validator                                  | backend                   |
| `ui` (`@tcms/ui`)                       | Shared design tokens (`@tcms/ui/tokens`); components land later        | frontend                  |

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
- [`ui/README.md`](./ui/README.md) — `@tcms/ui` entry points and scope.

## Design tokens

Design values live in [`ui/src/tokens.ts`](./ui/src/tokens.ts) and are consumed
as `@tcms/ui/tokens`. That file is the canonical source of truth for colours,
spacing, typography and radii; see
[`CONTRIBUTING.md`](./CONTRIBUTING.md#design-system) for the rules and examples.

## Updating a consumer repo after a change here

Each consumer repo pins this repo to a specific commit via its submodule
pointer. After pushing a change here, update the pointer in each consumer:

```bash
cd tcms-backend/packages    # or tcms-frontend/packages, tcms-mobile/packages
git checkout main
git pull
cd ..
git add packages
git commit -m "chore: bump tcms-packages submodule"
```
