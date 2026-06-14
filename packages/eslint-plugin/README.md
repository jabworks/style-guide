# @jabworks/eslint-plugin

[![NPM Version](https://img.shields.io/npm/v/%40jabworks%2Feslint-plugin?style=flat-square&logo=npm)](https://www.npmjs.com/package/@jabworks/eslint-plugin)

A custom ESLint plugin and shareable config for JavaScript, TypeScript, React, Next.js, Node.js, and library projects. This package provides a set of curated rules and configurations to help enforce code quality, consistency, and best practices across your codebase.

## Features

- **Comprehensive rule sets** for JavaScript, TypeScript, React, Next.js, Node.js, and framework-agnostic libraries
- **Opinionated import sorting** with `simple-import-sort`
- **Best practices** and stylistic rules
- **Prettier integration** for code formatting
- **Support for modern ECMAScript features**
- **Flat config support** (ESLint v9+)

## Installation

```bash
pnpm add -D @jabworks/eslint-plugin
# or
yarn add -D @jabworks/eslint-plugin
# or
npm install --save-dev @jabworks/eslint-plugin
```

## Usage

Add the plugin to your ESLint configuration. Example using the flat config format (recommended for ESLint v9+):

```js
// eslint.config.js or eslint.config.mjs
import { plugin as jabworksPlugin } from '@jabworks/eslint-plugin';

export default [
	...jabworksPlugin.configs.base,
	// or pick the config that matches your project:
	// ...jabworksPlugin.configs.react,
	// ...jabworksPlugin.configs.next,
	// ...jabworksPlugin.configs.node,
	// ...jabworksPlugin.configs.library,
	// ...jabworksPlugin.configs.typescript,
	// ...jabworksPlugin.configs.vitest,
];
```

Legacy `.eslintrc` configs are not provided. Use flat config with ESLint v9+.

## Available Configs

| Config | Extends | Use for |
|---|---|---|
| `base` | — | Any JS/TS project |
| `comments` | — | ESLint directive comments |
| `typescript` | `base` | TypeScript-only additions |
| `react` | `base` + `typescript` | React libraries and apps |
| `next` | `base` + `typescript` + `react` | Next.js applications |
| `node` | `base` + `typescript` | Node.js backends and APIs |
| `library` | `base` + `typescript` | Framework-agnostic utility libraries |
| `vitest` | — | Vitest test files (composable overlay) |

### `node`

Sets `globals.node`, enables [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n), and enforces Node.js best practices:

- `n/no-process-exit` — use `process.exitCode` instead
- `n/prefer-promises/fs` and `n/prefer-promises/dns` — prefer `fs.promises` over callbacks
- `n/no-path-concat`, `n/no-callback-literal`, `n/handle-callback-err`

```js
// eslint.config.mjs
import { plugin } from '@jabworks/eslint-plugin';
export default plugin.configs.node;
```

### `library`

No environment globals (environment-agnostic). Enforces named exports and cycle-free module graphs suitable for tree-shakeable packages like utility libraries.

- `import/no-default-export` — named exports only
- `import/no-cycle` — error (enabled; disabled in `base` for performance)

```js
// eslint.config.mjs
import { plugin } from '@jabworks/eslint-plugin';
export default plugin.configs.library;
```

## Example: Import Sorting

This plugin enforces a consistent import order using `simple-import-sort`. Example:

```js
import React from 'react';
import express from 'express';
import lodash from 'lodash';
import myUtil from '@/utils/myUtil';
import helper from './helper';
import styles from './styles.css';
```

## Compatibility

- **ESLint**: >=9.39.2

## License

MIT
