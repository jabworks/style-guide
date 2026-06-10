# @jabworks/oxlint-config

Opinionated [oxlint](https://oxc.rs/docs/guide/usage/linter/) presets ported from [`@jabworks/eslint-plugin`](../eslint-plugin). Each preset is a complete, JSON-serializable `.oxlintrc` object.

## Presets

- `base` — JS best practices, ES6, import hygiene, `unicorn/filename-case`, with `correctness` category on
- `typescript` — base + typescript rules (some type-aware, see below)
- `react` — typescript + react / react-hooks / jsx-a11y + vitest test-file override
- `next` — react + nextjs plugin, default-export overrides for Next.js special files, ignores `.next/`
- `vitest` — standalone test-file override preset

## Usage

`.oxlintrc.json` cannot extend an npm package, so serialize a preset:

```js
// scripts/generate-oxlintrc.mjs
import { config } from '@jabworks/oxlint-config';
import { writeFileSync } from 'node:fs';

writeFileSync(
  '.oxlintrc.json',
  JSON.stringify({ $schema: './node_modules/oxlint/configuration_schema.json', ...config.configs.next }, null, 2),
);
```

Then lint with:

```bash
oxlint --type-aware --deny-warnings
```

You can also compose presets with the exported `mergeConfigs` helper.

## Type-aware rules

The typescript preset enables type-aware rules (`typescript/no-misused-promises`, `typescript/consistent-type-exports`, `typescript/restrict-template-expressions`, …). These require [`oxlint-tsgolint`](https://github.com/oxc-project/tsgolint) installed in the consuming project and running oxlint with `--type-aware`; without it they are silently skipped.

## Rules not ported from @jabworks/eslint-plugin

Unsupported by oxlint 1.58 (verified with `oxlint --rules` and `@oxlint/migrate --details`):

- Core: `no-floating-decimal`, `no-implied-eval`, `no-octal-escape`, `prefer-regex-literals`, `object-shorthand`, `no-unreachable-loop`, `camelcase`, `prefer-arrow-callback`, `no-undef-init`
- Import: `newline-after-import`, `no-extraneous-dependencies`, `no-relative-packages`, `no-useless-path-segments`, `no-deprecated`
- TypeScript: `method-signature-style`, `naming-convention`
- React: `function-component-definition`, `hook-use-state`, `jsx-no-leaked-render`, `jsx-sort-props`, `no-unstable-nested-components`
- Plugins with no oxlint equivalent: `simple-import-sort`, `eslint-comments`, `@stylistic` (formatting is Prettier's job)
