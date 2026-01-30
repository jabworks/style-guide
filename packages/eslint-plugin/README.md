# @jabworks/eslint-plugin

[![NPM Version](https://img.shields.io/npm/v/%40jabworks%2Feslint-plugin?style=flat-square&logo=npm)](https://www.npmjs.com/package/@jabworks/eslint-plugin)

A custom ESLint plugin and shareable config for JavaScript, TypeScript, React, and Next.js projects. This package provides a set of curated rules and configurations to help enforce code quality, consistency, and best practices across your codebase.

## Features

- **Comprehensive rule sets** for JavaScript, TypeScript, React, and Next.js
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
	// or for React/Next.js/TypeScript/Vitest:
	// ...jabworksPlugin.configs.react,
	// ...jabworksPlugin.configs.next,
	// ...jabworksPlugin.configs.typescript,
	// ...jabworksPlugin.configs.vitest,
];
```

Legacy `.eslintrc` configs are not provided. Use flat config with ESLint v9+.

## Available Configs

- `base` – General JavaScript/TypeScript rules
- `comments` – Rules for ESLint directive comments
- `react` – React-specific rules
- `next` – Next.js-specific rules
- `typescript` – TypeScript-specific rules
- `vitest` – Vitest-specific rules

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
