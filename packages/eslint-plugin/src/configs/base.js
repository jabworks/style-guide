import eslintjs from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

import bestPractice from '../rules/best-practice.js';
import es6 from '../rules/es6.js';
import importConfig from '../rules/import.js';
import possibleErrors from '../rules/possible-errors.js';
import stylistic from '../rules/stylistic.js';
import unicornRules from '../rules/unicorn.js';
import variables from '../rules/variables.js';
import comments from './comments.js';

/** @type {import('eslint').Linter.Config} */
export const baseConfig = {
  name: '@jabworks/eslint-config-base',
  plugins: {
    unicorn,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    ...bestPractice,
    ...es6,
    ...importConfig,
    ...possibleErrors,
    ...stylistic,
    ...variables,
    ...unicornRules,
  },
};

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  eslintjs.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...comments,
  // Intentionally layered after eslint-config-prettier: @stylistic enforces a
  // broader stylistic surface than Prettier covers. Every rule below must agree
  // with the Prettier output produced by @jabworks/prettier-config, so the two
  // tools never fight.
  stylisticPlugin.configs.customize({
    semi: true,
    arrowParens: 'as-needed',
    braceStyle: '1tbs',
  }),
  {
    name: '@jabworks/eslint-config-base-stylistic-prettier-alignment',
    rules: {
      // Prettier arrowParens 'avoid' omits parens even for block bodies.
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      // Prettier breaks after binary/assignment operators, before ? and :.
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      // Prettier jsxSingleQuote uses single quotes in JSX attributes.
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      // Prettier quotes properties individually, not per-object.
      '@stylistic/quote-props': ['error', 'as-needed'],
      // Prettier uses double quotes when a string contains single quotes.
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always', avoidEscape: true }],
    },
  },
  baseConfig,
  {
    ignores: [
      'dist/**',
      'build/**',
      'out/**',
      'coverage/**',
      'node_modules/**',
      'eslint.config.js',
      'eslint.config.mjs',
      'eslint.config.cjs',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
    ],
  },
];

export default configs;
