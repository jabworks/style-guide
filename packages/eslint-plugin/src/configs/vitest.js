import vitest from '@vitest/eslint-plugin';
import globals from 'globals';

import vitestRules from '../rules/vitest.js';

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  {
    name: '@jabworks/eslint-config-vitest',
    files: ['**/*.test.{js,ts,mjs,cjs,jsx,tsx}', '**/__tests__/**', '**/tests/**'],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
        vi: 'readonly',
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...vitestRules,
    },
  },
];

export default configs;
