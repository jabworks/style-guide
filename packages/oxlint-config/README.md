# @jabworks/oxlint-config

Opinionated [oxlint](https://oxc.rs/docs/guide/usage/linter/) presets ported from [`@jabworks/eslint-plugin`](../eslint-plugin).

## Presets

| Preset | Extends | Use for |
|---|---|---|
| `base` | — | Any JS/TS project |
| `typescript` | `base` | TypeScript-only additions (some type-aware, see below) |
| `react` | `typescript` | React libraries and apps |
| `next` | `typescript` | Next.js applications |
| `node` | `typescript` | Node.js backends and APIs |
| `library` | `typescript` | Framework-agnostic utility libraries |
| `vitest` | — | Vitest test files (composable overlay) |

## Installation

```bash
npm install -D oxlint oxlint-tsgolint @jabworks/oxlint-config
```

## Usage

```ts
// oxlint.config.ts — pick the preset that matches your project
import { next } from '@jabworks/oxlint-config';
// or: import { node, library, react, typescript } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [next],
});
```

```jsonc
// package.json
{
  "scripts": {
    "lint": "oxlint --type-aware --deny-warnings"
  }
}
```

> **Note:** `oxlint.config.ts` requires Node.js v22.18+ or v24+.

To compose or override, use the exported `mergeConfigs` helper:

```ts
import { mergeConfigs, typescript } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

const custom = mergeConfigs(typescript, {
  rules: { 'no-console': 'warn' },
});

export default defineConfig({ extends: [custom] });
```

## Type-aware rules

The typescript preset enables type-aware rules (`typescript/no-misused-promises`, `typescript/consistent-type-exports`, `typescript/restrict-template-expressions`, …). These require [`oxlint-tsgolint`](https://github.com/oxc-project/tsgolint) installed in the consuming project and running oxlint with `--type-aware`; without it they are silently skipped.

## Node and library presets

### `node`

Sets `env.node: true` and enables the built-in `node` plugin with Node.js best practices:

- `node/no-process-exit` — use `process.exitCode` instead of `process.exit()`
- `node/no-path-concat` — use `path.join()` or `path.resolve()` over string concatenation
- `node/no-new-require` — disallow `new require(…)`
- `node/no-exports-assign` — disallow reassigning `exports`
- `node/handle-callback-err` — enforce error handling in callbacks

Also includes a vitest test-file override (same as `react`).

```ts
// oxlint.config.ts
import { node } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({ extends: [node] });
```

> **Note:** `n/prefer-promises/fs`, `n/prefer-promises/dns`, and `n/prefer-global/*` from `eslint-plugin-n` have no oxlint built-in equivalent as of 1.69. Use the ESLint `node` config alongside for those rules.

### `library`

No environment globals — suitable for framework-agnostic packages (utility libraries, shared hooks, etc.). Activates `import/no-cycle` which is disabled in `base` for performance.

```ts
// oxlint.config.ts
import { library } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({ extends: [library] });
```

## Rules not ported from @jabworks/eslint-plugin

Unsupported by oxlint 1.69 (verified with `oxlint --rules` and `@oxlint/migrate --details`):

- Core: `no-floating-decimal`, `no-implied-eval`, `no-octal-escape`, `prefer-regex-literals`, `object-shorthand`, `no-unreachable-loop`, `camelcase`, `prefer-arrow-callback`, `no-undef-init`
- Import: `newline-after-import`, `no-extraneous-dependencies`, `no-relative-packages`, `no-useless-path-segments`, `no-deprecated`
- TypeScript: `method-signature-style`, `naming-convention`
- React: `function-component-definition`, `hook-use-state`, `jsx-no-leaked-render`, `jsx-sort-props`, `no-unstable-nested-components`
- Node: `n/prefer-promises/fs`, `n/prefer-promises/dns`, `n/no-callback-literal`, `n/prefer-global/*`
- Plugins with no oxlint equivalent: `simple-import-sort`, `eslint-comments`, `@stylistic` (formatting is Prettier's job)
