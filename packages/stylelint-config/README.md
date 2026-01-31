# @jabworks/stylelint-config

Shared Stylelint configuration used across the monorepo.

- Purpose: provide a consistent, shareable set of Stylelint rules and plugins for CSS/SCSS used by the `@jabworks` packages and apps.

## Install

Use your package manager to install Stylelint and this config as a dev dependency:

```
pnpm add -D stylelint @jabworks/stylelint-config
# or
npm install -D stylelint @jabworks/stylelint-config
```

## Usage

Create a Stylelint config file at the project root and extend this package:

CommonJS (`.stylelintrc.cjs`):

```js
module.exports = {
  extends: ['@jabworks/stylelint-config'],
};
```

ESM (`stylelint.config.cjs` / `stylelint.config.mjs`):

```js
export default {
  extends: ['@jabworks/stylelint-config'],
};
```

## What it includes

- Opinionated base rules for modern CSS and PostCSS environments
- Integrations for common patterns used in the monorepo (e.g. Next.js apps)

## CSS Modules naming

This config enforces a camelCase naming convention for CSS Modules (files ending with `.module.css`). Class names must start with a lowercase letter and use only letters and digits thereafter. The enforced regex is:

```
^[a-z][a-zA-Z0-9]*$
```

Example: `myButtonActive`

## Contributing

If you want to modify rules, update `packages/stylelint-config/index.js` and add tests or examples in the consuming apps. Run the repository scripts from the root to verify changes.

## License

See the repository root for license and contribution guidelines.
