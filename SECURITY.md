# Security Policy

## Supported versions

This repository is a library workspace consumed as a git submodule. Consumers
pin a commit, so there is no released version line to patch: security fixes land
on `main` and reach consumers when they bump the submodule pointer.

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Report it privately through GitHub's vulnerability reporting:

<https://github.com/degeneffe/tcms-packages/security/advisories/new>

Include, when possible:

- the affected package (`@tcms/types`, `@tcms/gherkin-utils`, `@tcms/ui`) and
  entry point;
- reproduction steps or a proof of concept;
- the impact you expect;
- any suggested fix.

We will acknowledge the report, investigate it, and coordinate disclosure
before a fix is published. Please allow a reasonable window to ship a patch
before disclosing the issue publicly.

## Scope

In scope:

- source and package configuration in `types/`, `gherkin-utils/` and `ui/`;
- this repository's workflows, lockfile and dependency overrides.

Out of scope:

- vulnerabilities in third-party dependencies that are already tracked by
  Dependabot or reported upstream — report those upstream;
- issues in the consumer applications (`tcms-backend`, `tcms-frontend`,
  `tcms-mobile`).
