import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import jsxA11yRules from '../rules/jsx-a11y.js';
import reactRules from '../rules/react.js';
import baseConfig from './base.js';
import tseslintConfig from './typescript.js';

/** @type {import("eslint").Linter.Config} */
export const reactConfig = {
  name: '@jabworks/eslint-config-react',
  languageOptions: {
    ...pluginReact.configs.flat.recommended?.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'react-hooks': pluginReactHooks,
    'jsx-a11y': jsxA11y,
  },
  settings: { react: { version: 'detect' } },
  rules: {
    ...pluginReactHooks.configs['recommended-latest'].rules,
    ...reactRules,
    ...jsxA11yRules,
    'import/no-cycle': 'error',
  },
};

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]}
 */
const configs = [
  js.configs.recommended,
  eslintConfigPrettier,
  importPlugin.flatConfigs.recommended,
  ...baseConfig,
  ...tseslintConfig,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactConfig,
];

export default configs;
