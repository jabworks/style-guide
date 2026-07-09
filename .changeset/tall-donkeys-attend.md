---
'@jabworks/oxlint-config': minor
---

Restore rules implemented by oxlint since 1.58 and require oxlint >=1.73:

- `base`: `no-implied-eval`, `prefer-regex-literals`, `prefer-arrow-callback`, `no-unreachable-loop`
- `typescript`: `method-signature-style`
- Drop-list comments and README updated to reflect oxlint 1.73.
- `plugins` is now typed as `OxlintPlugin[]` (mirroring oxlint 1.73's plugin-name union) instead of `string[]`, matching oxlint's tightened `defineConfig` types.
