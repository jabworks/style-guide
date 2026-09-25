---
'@jabworks/oxlint-config': minor
---

Split Expo's conventions out of `reactNative` into a new `expo` preset.

**Action for Expo apps:** switch `extends: [reactNative]` to `extends: [expo]`. `expo` resolves to exactly the rules
`reactNative` did in 0.5.0, so nothing else changes.

`reactNative` is now for any React Native app, bare or framework-based. It dropped the expo-router route override, which
turned on `import/prefer-default-export` for everything under `app/` and `src/app/`. In a bare React Native app those are
ordinary folders of named-export modules, so every file there failed. It also dropped the `.expo/` and `expo-env.d.ts`
ignores. Everything else stays in `reactNative`: the React and React Compiler rules, the DOM exclusions, the `__DEV__`
and `process` globals, and the `android/` and `ios/` ignores.

`expo` extends `reactNative` and adds back exactly what was dropped. `expoPlugin` and `reactNativePlugin` remain separate
opt-ins: `extends: [expo, expoPlugin, reactNativePlugin]`.
