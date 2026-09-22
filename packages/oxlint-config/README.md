# @jabworks/oxlint-config

Opinionated [oxlint](https://oxc.rs/docs/guide/usage/linter/) presets ported from [`@jabworks/eslint-plugin`](../eslint-plugin).

## Presets

| Preset        | Extends      | Use for                                                |
| ------------- | ------------ | ------------------------------------------------------ |
| `base`        | —            | Any JS/TS project                                      |
| `typescript`  | `base`       | TypeScript-only additions (some type-aware, see below) |
| `react`       | `typescript` | React libraries and apps                               |
| `next`        | `react`      | Next.js applications                                   |
| `reactNative` | `typescript` | Expo and React Native apps (oxlint-only)               |
| `node`        | `typescript` | Node.js backends and APIs                              |
| `library`     | `typescript` | Framework-agnostic utility libraries                   |
| `vitest`      | —            | Vitest test files (composable overlay)                 |

## Installation

```bash
npm install -D oxlint oxlint-tsgolint @jabworks/oxlint-config
```

## Usage

```ts
// oxlint.config.ts — pick the preset that matches your project
import { next } from '@jabworks/oxlint-config';
// or: import { node, library, react, reactNative, typescript } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [next],
});
```

```jsonc
// package.json
{
  "scripts": {
    "lint": "oxlint --type-aware --deny-warnings",
  },
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

### What survives `extends`

oxlint's `extends` keeps a preset's `rules`, `categories`, `plugins`, and `overrides`, but drops its top-level `env`,
`globals`, and `ignorePatterns` (verified on oxlint 1.85, and not mentioned in oxlint's docs). The presets are built
around that:

- **Globals** (`env.browser` in `react`/`next`, `env.node` in `node`, the React Native globals in `reactNative`) are
  delivered through a catch-all `files: ['**/*']` override, which does survive `extends`.
- **Tool config files** (`*.config.{js,mjs,cjs,ts,mts,cts}`, including `oxlint.config.ts` itself) get an override in
  `base` that allows their default export.
- **Ignore patterns** (`dist/`, `build/`, `coverage/`, `.next/`, `.expo/`, …) only apply when a preset is spread into
  your config or passed through `mergeConfigs`. With plain `extends`, rely on `.gitignore`, which oxlint honors by
  default and which normally covers these paths already, or add `ignorePatterns` to your own config.

## Type-aware rules

The typescript preset enables type-aware rules (`typescript/no-misused-promises`, `typescript/consistent-type-exports`, `typescript/restrict-template-expressions`, …). These require [`oxlint-tsgolint`](https://github.com/oxc-project/tsgolint) installed in the consuming project and running oxlint with `--type-aware`; without it they are silently skipped.

## React Native preset

`reactNative` is for Expo and bare React Native apps. It has no `@jabworks/eslint-plugin` counterpart.

It carries the same React rules as `react` (hooks, React Compiler rules, component style) but leaves out everything that
assumes a DOM: the `jsx-a11y` plugin, `env.browser`, `react/button-has-type`, and `react/jsx-no-target-blank`. On top of
that:

- **Globals.** oxlint has no react-native environment, so the preset enables `shared-node-browser` (fetch, timers, URL,
  console) and declares `__DEV__` and `process` (for Expo's inlined `process.env.EXPO_PUBLIC_*`) as read-only globals.
  `window` and `document` stay undefined.
- **expo-router routes.** Every file under `app/` or `src/app/` is a route, layout, or special file (`_layout`,
  `+not-found`, `+html`) that expo-router loads through its default export. There, `import/no-default-export` is off and
  `import/prefer-default-export` is on. API routes (`*+api.ts`) export named HTTP handlers and keep the house named-export
  rule. `*.config.{ts,mts,cts}` files, such as `app.config.ts`, get the same default-export allowance.
- **Ignores.** `.expo/`, `android/`, `ios/`, and `expo-env.d.ts`.

expo-router's file names (`[id].tsx`, `[...rest].tsx`, `+not-found.tsx`, `(tabs)/_layout.tsx`) and platform suffixes
(`card.ios.tsx`) already satisfy `unicorn/filename-case` in kebab case.

```ts
// oxlint.config.ts
import { reactNative } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({ extends: [reactNative] });
```

> **Note:** like every preset's ignore patterns, these only apply when the preset is spread or merged (see
> [What survives `extends`](#what-survives-extends)). Expo's default `.gitignore` already covers these paths.

### Imperative renderers (three.js / React Three Fiber)

Code that drives an imperative renderer from React (three.js through React Three Fiber, Skia, expo-gl) trips two React
Compiler rules on purpose:

- `react/refs` flags the "latest ref" pattern (`ref.current = value` during render), which frame loops use to read fresh
  props without re-subscribing every frame.
- `react/preserve-manual-memoization` only matters when the React Compiler runs, and it is usually off for such code.

`imperativeRenderOverride` turns both off for the globs you pass. Keep them narrow, so the rest of the app is still
checked:

```ts
// oxlint.config.ts
import { imperativeRenderOverride, reactNative } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [reactNative],
  overrides: [imperativeRenderOverride(['src/scene/**'])],
});
```

It works with any React preset, not only `reactNative`. R3F's JSX props (`args`, `castShadow`, …) need no override:
`react/no-unknown-property` is in oxlint's `restriction` category, which no preset enables.

## Node and library presets

### `node`

Sets `env.node: true` and enables the built-in `node` plugin with Node.js best practices:

- `unicorn/no-process-exit` — use `process.exitCode` instead of `process.exit()` (registered under oxlint's `unicorn` plugin)
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

> **Note:** `n/prefer-promises/fs`, `n/prefer-promises/dns`, and `n/prefer-global/*` from `eslint-plugin-n` have no oxlint built-in equivalent as of 1.85. Use the ESLint `node` config alongside for those rules.

### `library`

No environment globals — suitable for framework-agnostic packages (utility libraries, shared hooks, etc.). Activates `import/no-cycle` which is disabled in `base` for performance.

```ts
// oxlint.config.ts
import { library } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({ extends: [library] });
```

## Rules not ported from @jabworks/eslint-plugin

Unsupported by oxlint 1.85. Verify by loading a config that names the rule and
checking for `Rule '<name>' not found in plugin '<plugin>'` — `oxlint --rules`
prints nothing and cannot be used for this.

- Core: `no-octal-escape`, `camelcase`, `no-undef-init`
- Import: `no-extraneous-dependencies`, `no-relative-packages`, `no-useless-path-segments`, `no-deprecated`
- TypeScript: `naming-convention`
- React: `jsx-no-leaked-render`, `jsx-sort-props`, `react-hooks/config`, `react-hooks/gating` (the other twelve React
  Compiler rules from `react-hooks` `recommended-latest` are ported, at the same severities)
- Node: `n/prefer-promises/fs`, `n/prefer-promises/dns`, `n/no-callback-literal`, `n/prefer-global/*`
- Plugins with no oxlint equivalent: `simple-import-sort`, `eslint-comments`, `@stylistic` (formatting is Prettier's job)

Restored in oxlint 1.59–1.75 (previously dropped): `no-implied-eval`,
`prefer-regex-literals`, `prefer-arrow-callback`, `no-unreachable-loop`,
`typescript/method-signature-style`, `object-shorthand`,
`import/newline-after-import`, `import/prefer-default-export`,
`react/function-component-definition`, `react/hook-use-state`,
`react/no-unstable-nested-components`.
