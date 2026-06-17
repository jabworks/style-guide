# @jabworks/eslint-plugin

## 2.1.1

### Patch Changes

- [#40](https://github.com/jabworks/style-guide/pull/40) [`70e0d8d`](https://github.com/jabworks/style-guide/commit/70e0d8d83bc6117928fb2cb3506806428c9b16d5) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Add `node` and `library` to the TypeScript type declaration for `plugin.configs`.

## 2.1.0

### Minor Changes

- [#38](https://github.com/jabworks/style-guide/pull/38) [`cf25f70`](https://github.com/jabworks/style-guide/commit/cf25f70db744c3dbce982a94754a18c4bbc81085) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Add `node` and `library` ESLint configs.

  - `node` — extends `base` + `typescript`, sets `globals.node`, enables `eslint-plugin-n` with rules for `no-process-exit`, `prefer-promises/fs`, `prefer-promises/dns`, `no-path-concat`, `no-callback-literal`, `handle-callback-err`, and `prefer-global/*`
  - `library` — extends `base` + `typescript`, no environment globals, enforces `import/no-default-export` and enables `import/no-cycle` (disabled in base for performance)

## 2.0.0

### Major Changes

- [#20](https://github.com/jabworks/style-guide/pull/20) [`2775687`](https://github.com/jabworks/style-guide/commit/27756872257128af32c13363e3a0b17e2fd9f163) Thanks [@dependabot](https://github.com/apps/dependabot)! - Bump `eslint` peer dependency from `^9.x` to `^10.2.0`. This is a breaking change for consumers still on ESLint v9. Please upgrade to ESLint 10 before updating to this version of `@jabworks/eslint-plugin`.

## 1.1.8

### Patch Changes

- [#17](https://github.com/jabworks/style-guide/pull/17) [`5ba5ba0`](https://github.com/jabworks/style-guide/commit/5ba5ba0c6d5a1970fbb94194cfeffd14ddce057d) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Downgrade eslint version to v9

## 1.1.7

### Patch Changes

- Update deps

## 1.1.6

### Patch Changes

- Fix files inclusion in package.json

## 1.1.5

### Patch Changes

- Add `@typescript-eslint/parser` to dependencies

## 1.1.4

### Patch Changes

- Add `@typescript-eslint/eslint-plugin` to dependencies

## 1.1.3

### Patch Changes

- Tweak package dependencies

## 1.1.2

### Patch Changes

- Update peer deps

## 1.1.1

### Patch Changes

- Tweak eslint configs

## 1.1.0

### Minor Changes

- Bump deps version
- Update react rules in next config

## 1.0.6

### Patch Changes

- Update dependencies to latest

## 1.0.5

### Patch Changes

- Update README.md

## 1.0.4

### Patch Changes

- Fix stylistic rule typo

## 1.0.3

### Patch Changes

- Tweak stylistic rules

## 1.0.2

### Patch Changes

- Move workspace dep to dev dep

## 1.0.1

### Patch Changes

- Change dev deps to regular deps

## 1.0.0

### Major Changes

- Initial release
