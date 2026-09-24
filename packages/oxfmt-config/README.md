# @jabworks/oxfmt-config

Opinionated [oxfmt](https://oxc.rs/docs/guide/usage/formatter) configuration, ported from [@jabworks/prettier-config](../prettier-config).

## Installation

```bash
npm install -D oxfmt @jabworks/oxfmt-config
```

## Usage

Because oxfmt does not support `extends` in config files, consumers import the shared config directly in `oxfmt.config.ts`:

```ts
// oxfmt.config.ts
import { config } from '@jabworks/oxfmt-config';
export default config;
```

To extend or override settings:

```ts
// oxfmt.config.ts
import { config } from '@jabworks/oxfmt-config';
import { defineConfig } from 'oxfmt';

export default defineConfig({ ...config, printWidth: 80 });
```

> **Note:** `oxfmt.config.ts` requires Node.js v22.18+ or v24+.

## Config

| Option                   | Value         | Notes                                                  |
| ------------------------ | ------------- | ------------------------------------------------------ |
| `printWidth`             | `120`         |                                                        |
| `tabWidth`               | `2`           |                                                        |
| `useTabs`                | `false`       |                                                        |
| `semi`                   | `true`        |                                                        |
| `singleQuote`            | `true`        |                                                        |
| `jsxSingleQuote`         | `true`        |                                                        |
| `quoteProps`             | `"as-needed"` |                                                        |
| `trailingComma`          | `"all"`       |                                                        |
| `bracketSpacing`         | `true`        |                                                        |
| `bracketSameLine`        | `false`       |                                                        |
| `arrowParens`            | `"avoid"`     |                                                        |
| `endOfLine`              | `"lf"`        |                                                        |
| `singleAttributePerLine` | `true`        |                                                        |
| `sortImports`            | `true`        | Built-in import sorting for the oxlint+oxfmt toolchain |
| `sortPackageJson`        | `true`        | Built-in; replaces `prettier-plugin-packagejson`       |
| `sortTailwindcss`        | `true`        | Built-in; replaces `prettier-plugin-tailwindcss`       |

### Differences from `@jabworks/prettier-config`

- **No general JSON sorting** — oxfmt has no equivalent to `prettier-plugin-sort-json` for arbitrary JSON files. Only `package.json` is sorted (via `sortPackageJson`). Keep Prettier for `*.json` if sorted JSON matters to you.
- **Import sorting is oxfmt's, not simple-import-sort's** — `sortImports` is enabled so the oxlint+oxfmt toolchain sorts imports at all (oxlint has no `simple-import-sort` port), but the resulting order differs from the ESLint toolchain's custom groups.
- **`sortPackageJson` and `sortTailwindcss` are built-in** — no plugins to install.
- **Long unions break differently.** When a union type (of string literals, object types, or anything else) fits on one
  line after a break at `=`, Prettier keeps it there, and oxfmt puts one member per line. Seen on oxfmt 0.60 and 0.70, so
  it is not a regression.
- **`oxfmt` is still in beta** — API may change before a stable release.

## React Native / Expo

The config needs nothing React Native specific:

- **Native folders are skipped.** oxfmt honors `.gitignore`, and Expo's default one already covers `android/`, `ios/`,
  and `.expo/`.
- **`experimentalOperatorPosition`** (new in oxfmt 0.70) defaults to `"end"`, the same as Prettier, so it is left unset.
- **`sortTailwindcss`** does nothing in a project without Tailwind. With NativeWind it is untested.

Migrating an app from `@jabworks/prettier-config`: the first `oxfmt` run reorders imports and sorts `package.json`. On
one Expo app it changed 32 of 127 files. With import sorting off, only `package.json` and one file hitting the union
difference above changed.
