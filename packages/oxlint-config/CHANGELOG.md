# @jabworks/oxlint-config

## 0.4.1

### Patch Changes

- [#69](https://github.com/jabworks/style-guide/pull/69) [`c0aa033`](https://github.com/jabworks/style-guide/commit/c0aa033cfe84f0d43157a61a315d66fd768a7936) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Make the README examples app-neutral. The `imperativeRenderOverride` example no longer uses one app's folder name as if
  it were a convention, and the oxfmt migration note describes what to expect in general instead of quoting file counts
  from a single app.

## 0.4.0

### Minor Changes

- [#60](https://github.com/jabworks/style-guide/pull/60) [`053d318`](https://github.com/jabworks/style-guide/commit/053d318e6d83d5254cda06912818dd53e77eeacf) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Require oxlint >=1.85 and port the React Compiler rules to the `react` preset (and so `next`, which extends it).

  **Breaking:** the `oxlint` peer moves from `>=1.75.0` to `>=1.85.0`. The preset now names rules that older oxlint
  cannot parse (`Rule 'purity' not found in plugin 'react'`), so the lint run stops rather than warns.

  oxlint 1.85 ships the React Compiler rules. Eleven of the thirteen ported here sit in the `correctness` category, which
  `base` sets to `error`, so on oxlint 1.85 they would switch on for every `react`/`next` consumer whether this preset
  named them or not. The preset now lists all thirteen explicitly, at the severities `eslint-plugin-react-hooks` 7.1.1
  `recommended-latest` uses in `@jabworks/eslint-plugin`:

  - `error`: `error-boundaries`, `globals`, `immutability`, `preserve-manual-memoization`, `purity`, `refs`,
    `set-state-in-effect`, `set-state-in-render`, `static-components`, `use-memo`, `void-use-memo`
  - `warn`: `incompatible-library`, `unsupported-syntax`

  Two of those entries change behavior beyond the category default:

  - `incompatible-library` is held at `warn`. Left to the `correctness` category it would be an `error`, which is stricter
    than the ESLint preset.
  - `unsupported-syntax` is in oxlint's `restriction` category, which the preset does not enable, so listing it turns it
    **on** (as `warn`).

  `react-hooks/config` and `react-hooks/gating` have no oxlint equivalent yet.

  Expect new diagnostics on upgrade, most likely from `react/set-state-in-effect`, `react/refs`, and `react/purity`.
  Projects that drive imperative renderers through refs (three.js / React Three Fiber) or that do not run the React
  Compiler may want to turn off `react/refs` and `react/preserve-manual-memoization` for those files.

- [#64](https://github.com/jabworks/style-guide/pull/64) [`f6ac12f`](https://github.com/jabworks/style-guide/commit/f6ac12fa59f0a980205f7decea8b9a16c4913c0a) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Add `imperativeRenderOverride(files)` for code that drives an imperative renderer (three.js / React Three Fiber, Skia,
  expo-gl) from React.

  ```ts
  import { imperativeRenderOverride, reactNative } from '@jabworks/oxlint-config';
  import { defineConfig } from 'oxlint';

  export default defineConfig({
    extends: [reactNative],
    overrides: [imperativeRenderOverride(['src/scene/**'])],
  });
  ```

  It returns an override that turns off `react/refs` and `react/preserve-manual-memoization` for the given globs.
  `react/refs` flags the "latest ref" pattern (`ref.current = value` during render) that frame loops rely on, and
  `preserve-manual-memoization` only matters under the React Compiler. On an Expo + R3F app it clears the 4 `react/refs`
  hits in the scene directory, and the same pattern elsewhere is still flagged. It works in a root `overrides` array and
  when composed through `mergeConfigs`.

- [#61](https://github.com/jabworks/style-guide/pull/61) [`c46e2de`](https://github.com/jabworks/style-guide/commit/c46e2de53d278735e5ebed29848b9953785204b2) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Derive the exported config types from oxlint's own, and stop `mergeConfigs` from dropping `globals`, `jsPlugins`, and
  `options`.

  **`mergeConfigs` fix.** It merged only plugins, categories, rules, env, settings, overrides, and ignorePatterns, so any
  `globals`, `jsPlugins`, or `options` in a merged config was silently lost. It now shallow-merges `globals` and `options`
  (later configs win) and unions `jsPlugins` by specifier (a later entry for the same module wins).

  **Types.** `OxlintConfig`, `OxlintOverride`, and `OxlintPlugin` were hand-written copies of oxlint's schema and had
  fallen behind it, missing `globals`, `jsPlugins`, `options`, and `excludeFiles`. oxlint 1.85, the current peer floor,
  exports these types, so they are now derived from it:

  - `OxlintConfig` is oxlint's `OxlintConfig` without `extends`, since presets are flattened by `mergeConfigs`.
  - `OxlintOverride` is oxlint's `OxlintOverride`.
  - `OxlintPlugin` is the element type of oxlint's `plugins` array.

  `OxlintSeverity` and `OxlintRuleEntry` are unchanged.

  The types are stricter, which may surface type errors in code that builds configs against them. Severities, plugin
  names, `env`, `globals` values, `categories`, and `settings` are now checked against oxlint's schema (`'loud'` as a
  severity or `'react-native'` as a plugin no longer type-check). Rule _options_ under plugin-prefixed keys such as
  `eslint/curly` remain loosely typed, because oxlint types options only under unprefixed rule names.

- [#52](https://github.com/jabworks/style-guide/pull/52) [`81f5080`](https://github.com/jabworks/style-guide/commit/81f508027379b64ea45759d32a046fe266962af4) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Require oxlint >=1.75 and restore six rules that now have oxlint equivalents.

  **Breaking:** the `oxlint` peer moves from `>=1.73.0` to `>=1.75.0`. This is not
  advisory — on an older oxlint the config fails to _parse_ rather than warn
  (`Rule 'function-component-definition' not found in plugin 'react'`), so the
  whole lint run stops.

  Rules restored to parity with `@jabworks/eslint-plugin`:

  | Preset  | Rule                                  | Severity                                            |
  | ------- | ------------------------------------- | --------------------------------------------------- |
  | `base`  | `eslint/object-shorthand`             | `warn`                                              |
  | `base`  | `import/newline-after-import`         | `warn`                                              |
  | `react` | `react/function-component-definition` | `error` (arrow-function for named and unnamed)      |
  | `react` | `react/hook-use-state`                | `warn`                                              |
  | `react` | `react/no-unstable-nested-components` | `error`                                             |
  | `next`  | `import/prefer-default-export`        | `error` (`target: 'any'`, route-file override only) |

  Only `react/function-component-definition` is genuinely new in oxlint 1.75. The
  other five were already available and had been sitting in the drop-lists
  incorrectly — the previous audit relied on `oxlint --rules`, which prints
  nothing and silently produced an empty comparison. Drop-lists are now verified
  by loading a config that names each rule and checking for
  `Rule '<name>' not found in plugin '<plugin>'`; the README documents that
  method.

  Expect new diagnostics on upgrade, most likely from
  `react/function-component-definition` (function-declaration components) and
  `react/no-unstable-nested-components`.

  **Type-aware linting now runs TypeScript 7 semantics.** oxlint 1.75 requires
  `oxlint-tsgolint >=7.0.2001`, and tsgolint v7 embeds typescript-go 7.0.2
  rather than reading your installed `typescript` package. Projects still on
  TypeScript 6 will have `--type-aware` rules checked under 7.0.2 while `tsc`
  checks under 6.x. This preset does not choose that — it follows from oxlint's
  own peer chain — but the skew is worth knowing about.

- [#63](https://github.com/jabworks/style-guide/pull/63) [`5c694cd`](https://github.com/jabworks/style-guide/commit/5c694cd297d0797103222318b854baba222d4120) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Add a `reactNative` preset for Expo and React Native apps.

  ```ts
  import { reactNative } from '@jabworks/oxlint-config';
  import { defineConfig } from 'oxlint';

  export default defineConfig({ extends: [reactNative] });
  ```

  It has the same React rules as `react` (hooks, React Compiler rules, component style) without the DOM-only parts:
  `jsx-a11y`, `env.browser`, `react/button-has-type`, and `react/jsx-no-target-blank`. In their place:

  - `shared-node-browser` globals plus `__DEV__`, since oxlint has no react-native env. `window` and `document` stay
    undefined.
  - An expo-router override. Files under `app/` and `src/app/` must default-export (`import/prefer-default-export`)
    instead of being barred from it. `*+api.ts` API routes keep the named-export rule. `*.config.{ts,mts,cts}` files are
    allowed default exports.
  - Ignores for `.expo/`, `android/`, `ios/`, and `expo-env.d.ts`.

  Checked against a real Expo 57 / expo-router app. All 13 route-file `import/no-default-export` errors that the `react`
  preset reports go away, and the preset runs 35 fewer rules.

  oxlint's `extends` drops a config's top-level `env` and `globals`, so the preset delivers them through a catch-all
  override that does survive `extends`. The `react` preset now builds from two exported halves, `reactCoreRules` and
  `reactDomRules`. Its resolved config is unchanged.

### Patch Changes

- [#65](https://github.com/jabworks/style-guide/pull/65) [`5cc95a7`](https://github.com/jabworks/style-guide/commit/5cc95a7dcac3875b87a39c24e65a76314304b778) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Make the presets' environment and config-file handling survive oxlint's `extends`.

  oxlint's `extends` keeps a preset's rules, categories, plugins, and overrides, but silently drops its top-level `env`,
  `globals`, and `ignorePatterns` (verified on 1.85). Every preset is meant to be used through `extends`, so parts of them
  never reached consumers:

  - **Config files failed lint.** `base` relied on `ignorePatterns` to skip `*.config.{js,mjs,cjs}`. With `extends`, files
    such as `vite.config.js`, `eslint.config.js`, and your own `oxlint.config.ts` were linted and failed
    `import/no-default-export` under `base`, `typescript`, `react`, `node`, and `library`. `base` now has an override that
    allows default exports in `*.config.{js,mjs,cjs,ts,mts,cts}`.
  - **Environments were missing.** `react`/`next` (`env.browser`) and `node` (`env.node`) now deliver their globals
    through a catch-all override, the way `reactNative` already did.
  - **`reactNative` also declares `process`** (read-only), for Expo's inlined `process.env.EXPO_PUBLIC_*`.

  `ignorePatterns` cannot be delivered through an override. They still apply when a preset is spread or passed through
  `mergeConfigs`. With plain `extends`, `.gitignore` covers the usual paths. The README now has a "What survives
  `extends`" section.

  The only new behavior is fewer false errors. Nothing that passed before now fails.

## 0.3.1

### Patch Changes

- [#47](https://github.com/jabworks/style-guide/pull/47) [`e84734b`](https://github.com/jabworks/style-guide/commit/e84734bc2812074d9ddab7570dc9ed6534e58d4c) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Fix the `node` preset failing to parse: `no-process-exit` is registered under oxlint's `unicorn` plugin, not `node` — the preset previously made any consuming config error with "Rule 'no-process-exit' not found in plugin 'node'".

## 0.3.0

### Minor Changes

- [#44](https://github.com/jabworks/style-guide/pull/44) [`5b4444b`](https://github.com/jabworks/style-guide/commit/5b4444bf94c1104e9a9cd555a023f3bcca8f7f14) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Restore rules implemented by oxlint since 1.58 and require oxlint >=1.73:

  - `base`: `no-implied-eval`, `prefer-regex-literals`, `prefer-arrow-callback`, `no-unreachable-loop`
  - `typescript`: `method-signature-style`
  - Drop-list comments and README updated to reflect oxlint 1.73.
  - `plugins` is now typed as `OxlintPlugin[]` (mirroring oxlint 1.73's plugin-name union) instead of `string[]`, matching oxlint's tightened `defineConfig` types.

## 0.2.0

### Minor Changes

- [#38](https://github.com/jabworks/style-guide/pull/38) [`cf25f70`](https://github.com/jabworks/style-guide/commit/cf25f70db744c3dbce982a94754a18c4bbc81085) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Add `node` and `library` oxlint presets.

  - `node` — extends `typescript`, sets `env.node: true`, enables the built-in `node` plugin with rules for `no-process-exit`, `no-path-concat`, `no-new-require`, `no-exports-assign`, and `handle-callback-err`
  - `library` — extends `typescript`, no environment globals, enables `import/no-cycle` (disabled in base for performance) for tree-shakeable module graphs

## 0.1.1

### Patch Changes

- [#35](https://github.com/jabworks/style-guide/pull/35) [`2c04065`](https://github.com/jabworks/style-guide/commit/2c04065cf978940c5ba103b3e4b21a2c8762456f) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Update README with oxlint.config.ts usage

## 0.1.0

### Minor Changes

- [#32](https://github.com/jabworks/style-guide/pull/32) [`a24b48a`](https://github.com/jabworks/style-guide/commit/a24b48a52fb392c569789dababa3616e6f9f5bba) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Add new `@jabworks/oxlint-config` package with oxlint presets (base, typescript, react, next, vitest) ported from `@jabworks/eslint-plugin`. Rules without an oxlint equivalent are dropped; type-aware typescript rules require `oxlint-tsgolint` and `--type-aware`.
