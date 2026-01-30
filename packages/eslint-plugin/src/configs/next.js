import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import jsxA11yRules from '../rules/jsx-a11y.js';

import reactRules from '../rules/react.js';
import baseConfig from './base.js';
import tseslintConfigs, { tseslintConfig } from './typescript.js';

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  importPlugin.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  ...tseslintConfigs,
  {
    name: '@jabworks/eslint-config-nextjs',
    plugins: {
      '@next/next': pluginNext,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended?.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': { node: {} },
      react: { version: 'detect' },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...pluginReactHooks.configs['recommended-latest'].rules,
      ...reactRules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...tseslintConfig.rules,
      ...jsxA11yRules,
    },
  },
  {
    files: [
      '*.config.ts',
      '**/*.d.ts',
      '**/*.stories.ts',
      '**/*.stories.tsx',
      'app/**/*error.tsx',
      'app/**/layout.tsx',
      'app/**/not-found.tsx',
      'app/**/opengraph-image.tsx',
      'app/**/page.tsx',
      'app/apple-icon.tsx',
      'app/robots.ts',
      'app/sitemap.ts',
      'next.config.mjs',
      'src/app/**/*error.tsx',
      'src/app/**/layout.tsx',
      'src/app/**/not-found.tsx',
      'src/app/**/opengraph-image.tsx',
      'src/app/**/page.tsx',
      'src/app/apple-icon.tsx',
      'src/app/robots.ts',
      'src/app/sitemap.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': ['error', { target: 'any' }],
    },
  },
  {
    ignores: ['.next/**'],
  },
];

export default configs;
