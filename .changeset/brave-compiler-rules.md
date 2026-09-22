---
'@jabworks/oxlint-config': minor
---

Require oxlint >=1.85 and port the React Compiler rules to the `react` preset (and so `next`, which extends it).

**Breaking:** the `oxlint` peer moves from `>=1.75.0` to `>=1.85.0`. The preset now names rules that older oxlint
cannot parse (`Rule 'purity' not found in plugin 'react'`), so the lint run stops rather than warns.

oxlint 1.85 ships the React Compiler rules. Eleven of the thirteen ported here sit in the `correctness` category, which
`base` sets to `error`, so on oxlint 1.85 they would switch on for every `react`/`next` consumer whether this preset
named them or not. The preset now lists all thirteen explicitly, at the severities `eslint-plugin-react-hooks` 7.1.1
`recommended-latest` uses in `@jabworks/eslint-plugin`:

- `error`: `error-boundaries`, `globals`, `immutability`, `preserve-manual-memoization`, `purity`, `refs`,
  `set-state-in-effect`, `set-state-in-render`, `static-components`, `use-memo`, `void-use-memo`
- `warn`: `incompatible-library`, `unsupported-syntax`

Two of those entries change behavior beyond the category default:

- `incompatible-library` is held at `warn`. Left to the `correctness` category it would be an `error`, which is stricter
  than the ESLint preset.
- `unsupported-syntax` is in oxlint's `restriction` category, which the preset does not enable, so listing it turns it
  **on** (as `warn`).

`react-hooks/config` and `react-hooks/gating` have no oxlint equivalent yet.

Expect new diagnostics on upgrade, most likely from `react/set-state-in-effect`, `react/refs`, and `react/purity`.
Projects that drive imperative renderers through refs (three.js / React Three Fiber) or that do not run the React
Compiler may want to turn off `react/refs` and `react/preserve-manual-memoization` for those files.
