---
'@jabworks/eslint-plugin': major
---

Migrate to eslint-plugin-import-x and fix config-application bugs.

**Breaking:**

- `eslint-plugin-import` is replaced by `eslint-plugin-import-x` (the maintained fork). `eslint-plugin-import@2.x` crashes under ESLint 10 (`context.parserOptions` was removed). All import rules are renamed `import/*` → `import-x/*` — update any rule overrides in consuming configs (e.g. `import/no-default-export` → `import-x/no-default-export`), and `settings['import/resolver']` → `settings['import-x/resolver']`.
- `TYPESCRIPT_FILES`/`JAVASCRIPT_FILES` globs now use `**/` so the custom TypeScript rules apply to nested files. Previously they only matched files in the project root for the `typescript`, `react`, `node`, and `library` configs — expect new findings in existing codebases.
- `react` and `next` configs now include `jsx-a11y` flat recommended (previously the plugin was registered but no rules were enabled).

**Fixes:**

- The `@stylistic` `customize()` layer no longer fights Prettier: `braceStyle` is `1tbs`, and `arrow-parens`, `operator-linebreak`, `quote-props`, `quotes`, and `jsx-quotes` are aligned with `@jabworks/prettier-config` output. The layering after `eslint-config-prettier` is documented as intentional broad stylistic enforcement.
- `next` config ordering fixed so base rule options (e.g. `no-unused-vars` ignore patterns) are no longer overridden by `eslint:recommended`.
- Removed deprecated `no-floating-decimal` (Prettier normalizes decimals) and the dead `tsdoc/syntax` entry.
- Dropped unused dependencies (`eslint-plugin-eslint-comments`, `eslint-plugin-jest`, `eslint-plugin-playwright`, `eslint-plugin-testing-library`, `eslint-plugin-turbo`, `eslint-import-resolver-alias`); moved `@types/node` to devDependencies.
