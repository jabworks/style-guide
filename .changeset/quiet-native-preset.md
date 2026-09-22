---
'@jabworks/oxlint-config': minor
---

Add a `reactNative` preset for Expo and React Native apps.

```ts
import { reactNative } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({ extends: [reactNative] });
```

It has the same React rules as `react` (hooks, React Compiler rules, component style) without the DOM-only parts:
`jsx-a11y`, `env.browser`, `react/button-has-type`, and `react/jsx-no-target-blank`. In their place:

- `shared-node-browser` globals plus `__DEV__`, since oxlint has no react-native env. `window` and `document` stay
  undefined.
- An expo-router override. Files under `app/` and `src/app/` must default-export (`import/prefer-default-export`)
  instead of being barred from it. `*+api.ts` API routes keep the named-export rule. `*.config.{ts,mts,cts}` files are
  allowed default exports.
- Ignores for `.expo/`, `android/`, `ios/`, and `expo-env.d.ts`.

Checked against a real Expo 57 / expo-router app. All 13 route-file `import/no-default-export` errors that the `react`
preset reports go away, and the preset runs 35 fewer rules.

oxlint's `extends` drops a config's top-level `env` and `globals`, so the preset delivers them through a catch-all
override that does survive `extends`. The `react` preset now builds from two exported halves, `reactCoreRules` and
`reactDomRules`. Its resolved config is unchanged.
