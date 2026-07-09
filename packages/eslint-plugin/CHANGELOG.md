# @jabworks/eslint-plugin

## 3.0.0

### Major Changes

- [#44](https://github.com/jabworks/style-guide/pull/44) [`1f3ce13`](https://github.com/jabworks/style-guide/commit/1f3ce13350fc52e6c934640458df772a583232b0) Thanks [@vi-hieu](https://github.com/vi-hieu)! - Migrate to eslint-plugin-import-x and fix config-application bugs.

  **Breaking:**

  - `eslint-plugin-import` is replaced by `eslint-plugin-import-x` (the maintained fork). `eslint-plugin-import@2.x` crashes under ESLint 10 (`context.parserOptions` was removed). All import rules are renamed `import/*` → `import-x/*` — update any rule overrides in consuming configs (e.g. `import/no-default-export` → `import-x/no-default-export`), and `settings['import/resolver']` → `settings['import-x/resolver']`.
  - `TYPESCRIPT_FILES`/`JAVASCRIPT_FILES` globs now use `**/` so the custom TypeScript rules apply to nested files. Previously they only matched files in the project root for the `typescript`, `react`, `node`, and `library` configs — expect new findings in existing codebases.
  - `react` and `next` configs now include `jsx-a11y` flat recommended (previously the plugin was registered but no rules were enabled).

  **Fixes:**

  - The `@stylistic` `customize()` layer no longer fights Prettier: `braceStyle` is `1tbs`, and `arrow-parens`, `operator-linebreak`, `quote-props`, `quotes`, and `jsx-quotes` are aligned with `@jabworks/prettier-config` output. The layering after `eslint-config-prettier` is documented as intentional broad stylistic enforcement.
  - `next` config ordering fixed so base rule options (e.g. `no-unused-vars` ignore patterns) are no longer overridden by `eslint:recommended`.
  - Removed deprecated `no-floating-decimal` (Prettier normalizes decimals) and the dead `tsdoc/syntax` entry.
  - Dropped unused dependencies (`eslint-plugin-eslint-comments`, `eslint-plugin-jest`, `eslint-plugin-playwright`, `eslint-plugin-testing-library`, `eslint-plugin-turbo`, `eslint-import-resolver-alias`); moved `@types/node` to devDependencies.

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
