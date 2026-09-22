import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import { reactCoreRules } from './react.js';
import typescript from './typescript.js';

/**
 * React Native preset for Expo and bare React Native apps. oxlint-only: there
 * is no `@jabworks/eslint-plugin` counterpart.
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
      },
    },
    {
      // expo-router loads every file under app/ as a route, layout, or special
      // file (+not-found, +html), each through its default export. API routes
      // export named HTTP-method handlers instead, so they stay under the
      // house named-export rule.
      files: [
        'app/**/*.{js,jsx,ts,tsx}',
        'src/app/**/*.{js,jsx,ts,tsx}',
        '*.config.ts',
        '*.config.mts',
        '*.config.cts',
      ],
      excludeFiles: ['**/*+api.{js,ts}'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': ['error', { target: 'any' }],
      },
    },
  ],
  // Also dropped by `extends`; effective when the preset is spread or passed
  // through mergeConfigs. Expo's default .gitignore covers these paths anyway.
  ignorePatterns: ['.expo/**', 'android/**', 'ios/**', 'expo-env.d.ts'],
});

export default reactNative;
