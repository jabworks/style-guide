# web-eslint

Integration app for the **ESLint toolchain** of this monorepo. It exists to verify that the published configs work together on a real Next.js app:

- [`@jabworks/eslint-plugin`](../../packages/eslint-plugin) — `plugin.configs.next` via `eslint.config.mjs`
- [`@jabworks/prettier-config`](../../packages/prettier-config) — via `prettier.config.mjs`
- [`@jabworks/stylelint-config`](../../packages/stylelint-config) — via `stylelint.config.mjs`
- [`@jabworks/typescript-config`](../../packages/typescript-config) — `nextjs.json`

Plus a Vitest browser-mode test suite (Playwright/chromium) exercising the sample component.

The oxc-toolchain counterpart is [`apps/web-oxc`](../web-oxc).

```bash
pnpm dev            # next dev on port 3000
pnpm lint           # eslint + stylelint
pnpm format:check   # prettier
pnpm test           # vitest browser tests
```
