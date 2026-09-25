import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import { reactCoreRules } from './react.js';
import typescript from './typescript.js';

/**
 * React Native preset for any React Native app, bare or framework-based.
 * oxlint-only: there is no `@jabworks/eslint-plugin` counterpart. Expo apps
 * use the `expo` preset, which extends this one with expo-router's
 * conventions.
 *
 * Takes the renderer-agnostic half of the react preset and leaves out the DOM
 * half (jsx-a11y, `env.browser`, button-has-type, jsx-no-target-blank), none of
 * which applies to native views.
 *
 * oxlint has no react-native env, so the RN-specific global is declared
 * directly. Everything else RN provides at runtime (fetch, timers, console,
 * URL) is covered by `shared-node-browser`.
 */
const reactNative: OxlintConfig = mergeConfigs(typescript, reactCoreRules, {
  overrides: [
    {
      // oxlint's `extends` drops top-level `env` and `globals` (verified on 1.85),
      // but keeps overrides, so a catch-all override is the only way these reach
      // a consumer's `defineConfig({ extends: [reactNative] })`.
      files: ['**/*'],
      env: {
        'shared-node-browser': true,
      },
      globals: {
        __DEV__: 'readonly',
        // React Native's bundler inlines `process.env` reads (NODE_ENV, and Expo's EXPO_PUBLIC_*) at build time.
        process: 'readonly',
      },
    },
  ],
  // Also dropped by `extends`; effective when the preset is spread or passed
  // through mergeConfigs. A React Native app's .gitignore usually covers the
  // native build output anyway.
  ignorePatterns: ['android/**', 'ios/**'],
});

export default reactNative;
