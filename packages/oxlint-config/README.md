# @jabworks/oxlint-config

Opinionated [oxlint](https://oxc.rs/) configuration for JavaScript, TypeScript, React, and Next.js projects. This package mirrors the rule philosophy of [`@jabworks/eslint-plugin`](../eslint-plugin) but targets the oxlint linter.

## Installation

```bash
pnpm add -D @jabworks/oxlint-config oxlint
```

## Usage

This package exports pre-built oxlint config objects that can be used to generate `.oxlintrc.json` files or be used programmatically.

### Generate a config file

Create a script (e.g., `generate-oxlint-config.mjs`) to write the config:

```js
import { writeFileSync } from 'node:fs';
import { config } from '@jabworks/oxlint-config';

// Use the Next.js config (includes base + typescript + react + next rules)
const oxlintConfig = {
  $schema: './node_modules/oxlint/configuration_schema.json',
  ...config.configs.next,
};

writeFileSync('.oxlintrc.json', JSON.stringify(oxlintConfig, null, 2));
```

### Available Configs

| Config       | Description                                              |
| ------------ | -------------------------------------------------------- |
| `base`       | Core JS/TS rules: best practices, ES6+, imports, style   |
| `typescript` | TypeScript-specific strict rules (use with `base`)        |
| `react`      | React + TypeScript + base rules for React libraries       |
| `next`       | Next.js + React + TypeScript + base rules (recommended)   |
| `vitest`     | Vitest testing rules (merge with any other config)        |

### Merging Configs

Use the `mergeConfigs` utility to compose configs:

```js
import { config } from '@jabworks/oxlint-config';

const { mergeConfigs } = config;

// Combine base + typescript + vitest
const myConfig = mergeConfigs(
  config.configs.base,
  config.configs.typescript,
  config.configs.vitest,
);
```

### Config Hierarchy

The configs are layered, similar to the ESLint plugin:

```
base (JS/TS foundation)
  └── typescript (strict TS checking)
        └── react (React + a11y rules)
              └── next (Next.js specific)

vitest (standalone, merge with any config)
```

## Rule Mapping

Rules are mapped from their ESLint equivalents to oxlint naming conventions:

| ESLint Prefix                         | Oxlint Prefix    |
| ------------------------------------- | ---------------- |
| (core rules)                          | `eslint/`        |
| `@typescript-eslint/`                 | `typescript/`    |
| `react/`                              | `react/`         |
| `jsx-a11y/`                           | `jsx-a11y/`      |
| `import/`                             | `import/`        |
| `unicorn/`                            | `unicorn/`       |
| `@next/next/`                         | `nextjs/`        |
| `vitest/`                             | `vitest/`        |

> **Note:** Some ESLint rules from plugins like `@stylistic/eslint-plugin`, `simple-import-sort`, and `eslint-plugin-eslint-comments` do not have direct oxlint equivalents and are omitted.

## License

MIT
