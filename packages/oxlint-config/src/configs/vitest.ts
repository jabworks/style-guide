import type { OxlintConfig, OxlintOverride } from '../types.js';

/**
 * Vitest preset, ported from `@jabworks/eslint-plugin` configs.vitest.
 * Scoped to test files via an override, like the original flat config.
 */
export const vitestOverride: OxlintOverride = {
  files: ['**/*.test.{js,ts,mjs,cjs,jsx,tsx}', '**/__tests__/**', '**/tests/**'],
  plugins: ['vitest'],
  env: {
    node: true,
    vitest: true,
  },
  rules: {
    'vitest/max-nested-describe': ['error', { max: 3 }],
    'vitest/no-commented-out-tests': 'error',
    'vitest/no-disabled-tests': 'error',
    'vitest/no-focused-tests': 'error',
    'vitest/no-identical-title': 'error',
  },
};

const vitest: OxlintConfig = {
  categories: {
    correctness: 'error',
  },
  overrides: [vitestOverride],
};

export default vitest;
