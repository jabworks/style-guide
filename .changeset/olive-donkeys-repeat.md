---
'@jabworks/oxlint-config': minor
---

Require oxlint >=1.75 and restore six rules that now have oxlint equivalents.

**Breaking:** the `oxlint` peer moves from `>=1.73.0` to `>=1.75.0`. This is not
advisory — on an older oxlint the config fails to _parse_ rather than warn
(`Rule 'function-component-definition' not found in plugin 'react'`), so the
whole lint run stops.

Rules restored to parity with `@jabworks/eslint-plugin`:

| Preset  | Rule                                  | Severity                                            |
| ------- | ------------------------------------- | --------------------------------------------------- |
| `base`  | `eslint/object-shorthand`             | `warn`                                              |
| `base`  | `import/newline-after-import`         | `warn`                                              |
| `react` | `react/function-component-definition` | `error` (arrow-function for named and unnamed)      |
| `react` | `react/hook-use-state`                | `warn`                                              |
| `react` | `react/no-unstable-nested-components` | `error`                                             |
| `next`  | `import/prefer-default-export`        | `error` (`target: 'any'`, route-file override only) |

Only `react/function-component-definition` is genuinely new in oxlint 1.75. The
other five were already available and had been sitting in the drop-lists
incorrectly — the previous audit relied on `oxlint --rules`, which prints
nothing and silently produced an empty comparison. Drop-lists are now verified
by loading a config that names each rule and checking for
`Rule '<name>' not found in plugin '<plugin>'`; the README documents that
method.

Expect new diagnostics on upgrade, most likely from
`react/function-component-definition` (function-declaration components) and
`react/no-unstable-nested-components`.

**Type-aware linting now runs TypeScript 7 semantics.** oxlint 1.75 requires
`oxlint-tsgolint >=7.0.2001`, and tsgolint v7 embeds typescript-go 7.0.2
rather than reading your installed `typescript` package. Projects still on
TypeScript 6 will have `--type-aware` rules checked under 7.0.2 while `tsc`
checks under 6.x. This preset does not choose that — it follows from oxlint's
own peer chain — but the skew is worth knowing about.
