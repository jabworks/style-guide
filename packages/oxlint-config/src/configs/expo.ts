import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import reactNative from './react-native.js';

/**
 * Expo preset: `reactNative` plus expo-router's file conventions. oxlint-only:
 * there is no `@jabworks/eslint-plugin` counterpart.
 *
 * Kept apart from `reactNative` because the route override would misfire in a
 * bare React Native app, where an `app/` folder holds ordinary named-export
 * modules.
 */
const expo: OxlintConfig = mergeConfigs(reactNative, {
  overrides: [
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
  ignorePatterns: ['.expo/**', 'expo-env.d.ts'],
});

export default expo;
