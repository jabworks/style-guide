# @jabworks/oxlint-config

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
