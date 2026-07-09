# Style Guide Monorepo - AI Coding Instructions

## Architecture Overview

This is a **Turborepo monorepo** for shareable linting/formatting configurations published under the `@jabworks` namespace. The main product is `@jabworks/eslint-plugin` - an opinionated ESLint flat config system supporting JS, TS, React, and Next.js.

### Key Components

- **`packages/eslint-plugin/`** - Core ESLint plugin with modular flat configs (`base`, `typescript`, `react`, `next`, `vitest`, `comments`)
- **`apps/web/`** - Next.js demo app showcasing the ESLint plugin with Vitest browser testing
- **`apps/docs/`** - Documentation site (Next.js)
- **`packages/typescript-config/`** - Shared TypeScript configurations (base, nextjs, react-library)
- **Other packages** - Placeholders for future Prettier/Stylelint configs

## Essential Workflows

### Development Commands

```bash
# Install dependencies (uses pnpm workspaces)
pnpm install

# Run all apps in dev mode (web on :3000, docs on :3001)
pnpm dev

# Build everything using Turbo
pnpm build

# Lint with zero tolerance for warnings
pnpm lint

# Type check across all packages
pnpm check-types

# Format all TS/TSX/MD files
pnpm format
```

### Testing (Web App Only)

```bash
cd apps/web
pnpm test          # Vitest unit tests
pnpm coverage      # Coverage report
```

### Publishing

Uses **Changesets** for version management:

```bash
# Create a changeset for new changes
npx changeset

# Publish to npm (from root)
pnpm release
```

## ESLint Plugin Architecture

The main package follows a **modular flat config pattern**:

### Config Structure

- **`src/configs/`** - Individual config arrays (base.js, typescript.js, react.js, etc.)
- **`src/rules/`** - Rule definitions grouped by category (typescript.js, react.js, stylistic.js)
- **`src/index.js`** - Main plugin export with all configs

### Usage Pattern

```javascript
// In consuming projects (see apps/web/eslint.config.mjs)
import { plugin } from '@jabworks/eslint-plugin';

export default [
  {
    plugins: { '@jabworks/eslint-plugin': plugin },
  },
  ...plugin.configs.next, // Includes base + typescript + react + next
  ...plugin.configs.vitest, // For test files
];
```

### Key Conventions

- **Flat configs only** - No legacy .eslintrc support
- **ES modules** - All packages use `"type": "module"`
- **Workspace references** - Use `workspace:*` for internal dependencies
- **Rule documentation** - Each rule includes comment with fixable status and docs link

## Project-Specific Patterns

### File Extensions & Constants

- Use `TYPESCRIPT_FILES = ['*.ts?(x)']` and `JAVASCRIPT_FILES = ['*.js?(x)', '*.mjs']` from `lib/constants.js`
- TypeScript strict config with `noUncheckedIndexedAccess: true`

### Testing Setup (Web App)

- **Vitest + Playwright browser testing** using `vitest-browser-react`
- Component tests in `components/*/**.test.tsx`
- Coverage config excludes test files and stories

### Turbo Configuration

- **Build dependencies** - Packages must build before dependent apps
- **No cache for dev** - Development servers run with `cache: false, persistent: true`
- **Lint dependencies** - Ensures packages lint before apps

### Changesets Integration

- Public access for all packages
- GitHub changelog generation
- Links to `hieu1871998/style-guide` repository

## Key Files to Reference

- **`packages/eslint-plugin/src/index.js`** - Plugin structure and config exports
- **`packages/eslint-plugin/src/configs/base.js`** - Base flat config pattern
- **`turbo.json`** - Build pipeline and caching strategy
- **`apps/web/vitest.config.ts`** - Testing configuration example
- **`.changeset/config.json`** - Release management setup

## Common Tasks

When **adding new ESLint rules**: Add to appropriate file in `src/rules/`, import in relevant config file, and test in apps.

When **creating new configs**: Follow the pattern in `src/configs/`, export from `src/index.js`, and document usage.

When **updating dependencies**: Use `pnpm up` and test across all apps before publishing.

When **releasing**: Create changeset first, then run `pnpm release` from root.
