import eslintjs from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
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
  stylisticPlugin.configs.customize({
    semi: true,
    arrowParens: 'as-needed',
  }),
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
