import type { OxlintConfig } from '../types.js';
import { TEST_FILES } from '../lib/constants.js';
import vitestRules from '../rules/vitest.js';

/**
 * Vitest oxlint configuration.
 *
 * Applies vitest-specific rules to test files.
 * Should be merged with other configs using mergeConfigs().
 */
const config: OxlintConfig = {
	plugins: ['vitest'],
	overrides: [
		{
			files: TEST_FILES,
			rules: {
				...vitestRules,
			},
		},
	],
};

export default config;
