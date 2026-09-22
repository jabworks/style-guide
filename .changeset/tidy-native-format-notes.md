---
'@jabworks/oxfmt-config': patch
---

Document React Native / Expo use and a known formatting difference from Prettier. There are no config changes.

- **React Native / Expo:** no RN-specific settings are needed. oxfmt honors `.gitignore`, which already covers `android/`,
  `ios/`, and `.expo/` in an Expo app. oxfmt 0.70's `experimentalOperatorPosition` defaults to `"end"` like Prettier.
  `sortTailwindcss` is a no-op without Tailwind.
- **Migrating from `@jabworks/prettier-config`:** expect a one-time import reorder and a `package.json` sort. Measured on
  an Expo 57 app: 32 of 127 files change. With import sorting off, only `package.json` and one file hitting the
  difference below remain.
- **Known difference:** a string-literal union that fits on one line after `=` stays on that line in Prettier, while
  oxfmt splits it one member per line (oxfmt 0.60 and 0.70).
