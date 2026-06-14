---
"@jabworks/eslint-plugin": minor
---

Add `node` and `library` ESLint configs.

- `node` — extends `base` + `typescript`, sets `globals.node`, enables `eslint-plugin-n` with rules for `no-process-exit`, `prefer-promises/fs`, `prefer-promises/dns`, `no-path-concat`, `no-callback-literal`, `handle-callback-err`, and `prefer-global/*`
- `library` — extends `base` + `typescript`, no environment globals, enforces `import/no-default-export` and enables `import/no-cycle` (disabled in base for performance)
