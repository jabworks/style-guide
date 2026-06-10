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

| Option | Value | Notes |
|---|---|---|
| `printWidth` | `120` | |
| `tabWidth` | `2` | |
| `useTabs` | `false` | |
| `semi` | `true` | |
| `singleQuote` | `true` | |
| `jsxSingleQuote` | `true` | |
| `quoteProps` | `"as-needed"` | |
| `trailingComma` | `"all"` | |
| `bracketSpacing` | `true` | |
| `bracketSameLine` | `false` | |
| `arrowParens` | `"avoid"` | |
| `endOfLine` | `"lf"` | |
| `singleAttributePerLine` | `true` | |
| `sortPackageJson` | `true` | Built-in; replaces `prettier-plugin-packagejson` |
| `sortTailwindcss` | `true` | Built-in; replaces `prettier-plugin-tailwindcss` |

### Differences from `@jabworks/prettier-config`

- **No general JSON sorting** — oxfmt has no equivalent to `prettier-plugin-sort-json` for arbitrary JSON files. Only `package.json` is sorted (via `sortPackageJson`).
- **`sortPackageJson` and `sortTailwindcss` are built-in** — no plugins to install.
- **`oxfmt` is still in beta** — API may change before a stable release.
