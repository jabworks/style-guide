---
'@jabworks/oxlint-config': patch
---

Make the presets' environment and config-file handling survive oxlint's `extends`.

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
