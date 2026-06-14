# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install all dependencies
pnpm build            # Build all packages (Turborepo-orchestrated)
pnpm build:packages   # Build only packages (not apps)
pnpm lint             # Lint all packages
pnpm check-types      # Type-check all packages
pnpm format           # Format with Prettier
pnpm dev              # Start all apps in watch mode
pnpm release          # Publish via Changesets (after versioning)
```

All tasks run through Turbo — use `turbo run <task> --filter=<package>` to target a specific package (e.g. `turbo run build --filter=@jabworks/oxlint-config`).

## Architecture

Turborepo monorepo managed with pnpm workspaces.

### Packages (publishable)

| Package | Entry point | Build |
|---|---|---|
| `@jabworks/eslint-plugin` | `src/index.js` (no build step, shipped as source) | – |
| `@jabworks/oxlint-config` | `dist/index.{mjs,cjs}` | `tsdown` |
| `@jabworks/oxfmt-config` | `dist/index.{mjs,cjs}` | `tsdown` |
| `@jabworks/prettier-config` | no build | – |
| `@jabworks/stylelint-config` | no build | – |
| `@jabworks/typescript-config` | JSON files | – |

### eslint-plugin structure

`packages/eslint-plugin/src/` is organized into:
- `configs/` — named flat config arrays (`base`, `typescript`, `react`, `next`, `node`, `library`, `vitest`, `comments`)
- `rules/` — rule objects grouped by category (`best-practice`, `stylistic`, `typescript`, `import`, `react`, `unicorn`, etc.)
- `index.js` — exports `{ plugin }` with `plugin.configs.*`

The plugin ships as ESM source (no build). `exports` in `package.json` point directly to `src/`.

### oxlint-config structure

`packages/oxlint-config/src/` mirrors the eslint-plugin config surface:
- `configs/` — TypeScript config files (`base`, `typescript`, `react`, `next`, `node`, `library`, `vitest`)
- `lib/merge.ts` — `mergeConfigs()` utility
- `index.ts` — re-exports all named configs and `{ config }` aggregate

Built with `tsdown` into dual CJS+ESM `dist/`. Requires `oxlint ≥1.69.0`.

### Releases

Releases use [Changesets](https://github.com/changesets/changesets):
1. `pnpm changeset` — describe the change
2. PR merge triggers the "Version Packages" CI workflow
3. `pnpm release` — publish the versioned packages
