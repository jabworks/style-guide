---
'@jabworks/oxlint-config': minor
---

Add two opt-in layers for mobile apps that run ESLint-style plugins through oxlint's JS plugin support.

```ts
import { expoPlugin, reactNative, reactNativePlugin } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({ extends: [reactNative, expoPlugin, reactNativePlugin] });
```

- `expoPlugin` (install `eslint-plugin-expo`): `no-dynamic-env-var`, `no-env-var-destructuring`, and `use-dom-exports`
  at error. Expo inlines only literal `process.env.EXPO_PUBLIC_*` reads, so the other shapes are `undefined` at
  runtime.
- `reactNativePlugin` (install `oxlint-plugin-react-native`): `no-raw-text` at error, since a string outside `<Text>`
  is a runtime error on native. `no-color-literals`, `no-inline-styles`, `no-single-element-style-arrays`, and
  `no-unused-styles` at warn.

Both plugins are new optional peer dependencies, which lets pnpm link them where the preset can resolve them. Nothing
changes for projects that do not opt in: the `reactNative` preset does not include either layer.
