# Style Guide Configurations

[![ESLint Plugin](https://img.shields.io/npm/v/%40jabworks%2Feslint-plugin?style=flat-square&logo=npm&label=%40jabworks%2Feslint-plugin)](https://www.npmjs.com/package/@jabworks/eslint-plugin)
[![Prettier Config](https://img.shields.io/npm/v/%40jabworks%2Fprettier-config?style=flat-square&logo=npm&label=%40jabworks%2Fprettier-config)](https://www.npmjs.com/package/@jabworks/prettier-config)
[![Stylelint Config](https://img.shields.io/npm/v/%40jabworks%2Fstylelint-config?style=flat-square&logo=npm&label=%40jabworks%2Fstylelint-config)](https://www.npmjs.com/package/@jabworks/stylelint-config)

A comprehensive **Turborepo monorepo** containing shareable configurations for linting, formatting, and TypeScript compilation. These opinionated configurations provide a consistent development experience across JavaScript, TypeScript, React, and Next.js projects.

## What's inside?

This repository includes the following packages:

### Packages

- **`@jabworks/eslint-plugin`**: Comprehensive ESLint plugin with modular flat configs for JavaScript, TypeScript, React, Next.js, and Vitest. Features zero-tolerance for warnings and support for modern development patterns.
- **`@jabworks/prettier-config`**: Opinionated Prettier configuration with essential plugins for Tailwind CSS class sorting, JSON formatting, and package.json organization.
- **`@jabworks/typescript-config`**: Shared TypeScript configurations (`base`, `nextjs`, `react-library`) with strict settings and modern module resolution.
- **`@jabworks/stylelint-config`**: Shareable Stylelint configuration for modern CSS, PostCSS, and CSS Modules. Tailwind-aware defaults and sensible ordering rules.

### Apps

- **`apps/web/`**: Next.js demo application showcasing all configurations with Vitest browser testing setup
- **`apps/docs/`**: Documentation site for the style guide packages

All packages are built with modern tooling and 100% [TypeScript](https://www.typescriptlang.org/) support.

## Quick Start

### Using the ESLint Plugin

```bash
npm install -D @jabworks/eslint-plugin
```

```javascript
// eslint.config.mjs
import { plugin } from '@jabworks/eslint-plugin';

export default [
  {
    plugins: { '@jabworks/eslint-plugin': plugin },
  },
  ...plugin.configs.next, // or .base, .react, .typescript
];
```

### Using the Prettier Config

```bash
npm install -D @jabworks/prettier-config
```

```javascript
// prettier.config.js
import { config } from '@jabworks/prettier-config';

export default config;
```

### Using the Stylelint Config

```bash
npm install -D stylelint @jabworks/stylelint-config
```

CommonJS (`.stylelintrc.cjs`):

```js
module.exports = {
  extends: ['@jabworks/stylelint-config'],
};
```

ESM (`stylelint.config.mjs`):

```js
export default {
  extends: ['@jabworks/stylelint-config'],
};
```

### Using TypeScript Configs

```bash
npm install -D @jabworks/typescript-config
```

```json
// tsconfig.json
{
  "extends": "@jabworks/typescript-config/base.json"
}
```

## Development

This monorepo uses [Turborepo](https://turbo.build/) for efficient task orchestration and [pnpm](https://pnpm.io/) for package management.

### Setup

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Build all packages
pnpm build

# Lint everything
pnpm lint

# Type check all packages
pnpm check-types
```

### Tools & Standards

- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking with strict configuration
- **[ESLint](https://eslint.org/)** - Code linting with zero tolerance for warnings
- **[Prettier](https://prettier.io)** - Code formatting with plugin ecosystem
- **[Turborepo](https://turbo.build/)** - Monorepo orchestration and caching
- **[Changesets](https://github.com/changesets/changesets)** - Version management and publishing
- **[Vitest](https://vitest.dev/)** - Fast unit testing with browser mode support
