import type { OxlintConfig } from '../types.js';
import { TYPESCRIPT_FILES } from '../lib/constants.js';
import typescriptExtensionRules from '../rules/typescript.extension.js';
import typescriptRules from '../rules/typescript.js';

/**
 * TypeScript oxlint configuration.
 *
 * Applies strict TypeScript type-checking rules.
 * Should be used together with the base config.
 */
const config: OxlintConfig = {
	plugins: ['typescript'],
	rules: {
		...typescriptRules,
		...typescriptExtensionRules,
	},
	overrides: [
		{
			files: TYPESCRIPT_FILES,
			rules: {
				// Disable base ESLint rules that are handled by TypeScript equivalents
				'eslint/no-unused-vars': 'off',
			},
		},
	],
};

export default config;
