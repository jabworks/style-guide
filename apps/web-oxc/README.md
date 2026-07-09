# web-oxc

Integration app for the **oxc toolchain** of this monorepo. It exists to verify that the published configs work together on a real Next.js app:

- [`@jabworks/oxlint-config`](../../packages/oxlint-config) — `next` preset via `oxlint.config.ts`, run with `--type-aware` (`oxlint-tsgolint`)
- [`@jabworks/oxfmt-config`](../../packages/oxfmt-config) — via the repo-root `oxfmt.config.ts`
- [`@jabworks/typescript-config`](../../packages/typescript-config) — `nextjs.json`

Shares its app source with [`apps/web-eslint`](../web-eslint) (the ESLint-toolchain counterpart); the test suite lives there — it verifies the component, not the linter.

```bash
pnpm dev    # next dev on port 3001
pnpm lint   # oxlint --type-aware --deny-warnings
```
