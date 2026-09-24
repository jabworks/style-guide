# @jabworks/oxfmt-config

## 0.2.2

### Patch Changes

- [#67](https://github.com/jabworks/style-guide/pull/67) [`02e3496`](https://github.com/jabworks/style-guide/commit/02e34960964ef8b916e5e24f294ce2cf8f5ea20f) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Correct the README's note on how oxfmt and Prettier break long unions. It applies to any union type, including unions of
  object types, not only string-literal unions as 0.2.1 said. Found migrating a second batch of Expo app code.

- [#69](https://github.com/jabworks/style-guide/pull/69) [`c0aa033`](https://github.com/jabworks/style-guide/commit/c0aa033cfe84f0d43157a61a315d66fd768a7936) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Make the README examples app-neutral. The `imperativeRenderOverride` example no longer uses one app's folder name as if
  it were a convention, and the oxfmt migration note describes what to expect in general instead of quoting file counts
  from a single app.

## 0.2.1

### Patch Changes

- [#66](https://github.com/jabworks/style-guide/pull/66) [`0f4a2f0`](https://github.com/jabworks/style-guide/commit/0f4a2f0de32c670157a62a777f23053af2840517) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Document React Native / Expo use and a known formatting difference from Prettier. There are no config changes.

  - **React Native / Expo:** no RN-specific settings are needed. oxfmt honors `.gitignore`, which already covers `android/`,
    `ios/`, and `.expo/` in an Expo app. oxfmt 0.70's `experimentalOperatorPosition` defaults to `"end"` like Prettier.
    `sortTailwindcss` is a no-op without Tailwind.
  - **Migrating from `@jabworks/prettier-config`:** expect a one-time import reorder and a `package.json` sort. Measured on
    an Expo 57 app: 32 of 127 files change. With import sorting off, only `package.json` and one file hitting the
    difference below remain.
  - **Known difference:** a string-literal union that fits on one line after `=` stays on that line in Prettier, while
    oxfmt splits it one member per line (oxfmt 0.60 and 0.70).

## 0.2.0

### Minor Changes

- [#44](https://github.com/jabworks/style-guide/pull/44) [`3cbc9ff`](https://github.com/jabworks/style-guide/commit/3cbc9ffa9234d093c9127065c4d7644b9c72b151) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Enable `sortImports` so the oxlint+oxfmt toolchain sorts imports (oxlint has no `simple-import-sort` equivalent). Note the sort order differs from the ESLint toolchain's custom `simple-import-sort` groups. Also migrate to the non-deprecated `FormatConfig` type.

## 0.1.0

### Minor Changes

- [#32](https://github.com/jabworks/style-guide/pull/32) [`a24b48a`](https://github.com/jabworks/style-guide/commit/a24b48a52fb392c569789dababa3616e6f9f5bba) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Initial release of `@jabworks/oxfmt-config` — opinionated oxfmt formatter configuration ported from `@jabworks/prettier-config`.
