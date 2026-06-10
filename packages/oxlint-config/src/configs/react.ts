import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import typescript from './typescript.js';
import { vitestOverride } from './vitest.js';

/**
 * React preset, ported from `@jabworks/eslint-plugin` configs.react.
 * Includes the react-hooks rules (folded into oxlint's react plugin) and the
 * vitest override for test files.
 *
 * Dropped (no oxlint equivalent as of 1.58): function-component-definition,
 * hook-use-state, jsx-no-leaked-render, jsx-sort-props,
 * no-unstable-nested-components.
 */
export const reactRules: OxlintConfig = {
  plugins: ['react', 'jsx-a11y'],
  env: {
    browser: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-no-target-blank': ['error', { allowReferrer: true }],
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/jsx-pascal-case': 'warn',
    'react/no-array-index-key': 'warn',
    'react/self-closing-comp': 'warn',
    // react-hooks rules live under oxlint's react plugin.
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'warn',
    'jsx-a11y/no-autofocus': 'off',
  },
  overrides: [vitestOverride],
};

const react: OxlintConfig = mergeConfigs(typescript, reactRules);

export default react;
