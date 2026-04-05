import vitestRules from '../rules/vitest.js';

/**
 * Vitest oxlint configuration.
 *
 * Applies vitest-specific rules to test files.
 * Should be merged with other configs using mergeConfigs().
 */
const config = {
	plugins: ['vitest'],
	overrides: [
		{
			files: ['**/*.test.{js,ts,mjs,cjs,jsx,tsx}', '**/__tests__/**', '**/tests/**'],
			rules: {
				...vitestRules,
			},
		},
	],
};

export default config;
