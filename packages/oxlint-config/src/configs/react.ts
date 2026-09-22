import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import typescript from './typescript.js';
import { vitestOverride } from './vitest.js';

/**
 * React preset, ported from `@jabworks/eslint-plugin` configs.react.
 * Includes the react-hooks rules (folded into oxlint's react plugin) and the
 * vitest override for test files.
 *
 * Dropped (no oxlint equivalent as of 1.85): jsx-no-leaked-render,
 * jsx-sort-props, react-hooks/config, react-hooks/gating.
 *
 * Split into renderer-agnostic rules and DOM rules so the react-native preset
 * can take the former without the latter.
 */
export const reactCoreRules: OxlintConfig = {
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/hook-use-state': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/jsx-pascal-case': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-unstable-nested-components': 'error',
    'react/self-closing-comp': 'warn',
    // react-hooks rules live under oxlint's react plugin.
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'warn',
    // React Compiler rules, mirroring eslint-plugin-react-hooks 7.1.1 `recommended-latest`. Most sit in oxlint's
    // correctness category and would be errors anyway. Two entries change behaviour: incompatible-library is held at
    // warn (the category would make it an error), and unsupported-syntax sits in restriction, so listing it turns it on.
    'react/error-boundaries': 'error',
    'react/globals': 'error',
    'react/immutability': 'error',
    'react/incompatible-library': 'warn',
    'react/preserve-manual-memoization': 'error',
    'react/purity': 'error',
    'react/refs': 'error',
    'react/set-state-in-effect': 'error',
    'react/set-state-in-render': 'error',
    'react/static-components': 'error',
    'react/unsupported-syntax': 'warn',
    'react/use-memo': 'error',
    'react/void-use-memo': 'error',
  },
  overrides: [vitestOverride],
};

/** Rules and globals that only make sense when rendering to the DOM. */
export const reactDomRules: OxlintConfig = {
  plugins: ['jsx-a11y'],
  // oxlint's `extends` drops top-level env, so the browser globals ride on a catch-all override instead.
  overrides: [{ files: ['**/*'], env: { browser: true } }],
  rules: {
    'react/button-has-type': 'warn',
    'react/jsx-no-target-blank': ['error', { allowReferrer: true }],
    'jsx-a11y/no-autofocus': 'off',
  },
};

export const reactRules: OxlintConfig = mergeConfigs(reactCoreRules, reactDomRules);

const react: OxlintConfig = mergeConfigs(typescript, reactRules);

export default react;
