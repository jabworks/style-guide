---
'@jabworks/oxlint-config': minor
---

Derive the exported config types from oxlint's own, and stop `mergeConfigs` from dropping `globals`, `jsPlugins`, and
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
