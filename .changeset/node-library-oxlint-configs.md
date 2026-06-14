---
"@jabworks/oxlint-config": minor
---

Add `node` and `library` oxlint presets.

- `node` — extends `typescript`, sets `env.node: true`, enables the built-in `node` plugin with rules for `no-process-exit`, `no-path-concat`, `no-new-require`, `no-exports-assign`, and `handle-callback-err`
- `library` — extends `typescript`, no environment globals, enables `import/no-cycle` (disabled in base for performance) for tree-shakeable module graphs
