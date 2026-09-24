import type { OxlintConfig } from '../types.js';

/**
 * Opt-in layer for Expo apps, running the official `eslint-plugin-expo`
 * through oxlint's JS plugin support. Needs `eslint-plugin-expo` installed
 * in the consuming project, and costs the JS plugin runtime on every run,
 * which is why it is not part of the `reactNative` preset.
 *
 * `prefer-box-shadow` is left out: it is a styling preference, not a bug.
 */
const expoPlugin: OxlintConfig = {
  jsPlugins: [{ name: 'expo', specifier: 'eslint-plugin-expo' }],
  rules: {
    // Expo inlines only literal `process.env.EXPO_PUBLIC_*` reads at build time; any other shape is undefined at runtime.
    'expo/no-dynamic-env-var': 'error',
    'expo/no-env-var-destructuring': 'error',
    // Silent unless a file opts into `'use dom'`, where it enforces the export shape Expo requires.
    'expo/use-dom-exports': 'error',
  },
};

export default expoPlugin;
