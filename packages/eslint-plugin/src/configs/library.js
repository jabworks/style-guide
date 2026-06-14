import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

import baseConfig from './base.js';
import tseslintConfig from './typescript.js';

/** @type {import('eslint').Linter.Config} */
export const libraryConfig = {
	name: '@jabworks/eslint-config-library',
	// No environment globals — libraries should be environment-agnostic
	rules: {
		// Prevent circular dependencies which break tree-shaking
		'import/no-cycle': 'error',
		// Named exports keep tree-shaking effective
		'import/no-default-export': 'error',
	},
};

/**
 * A custom ESLint configuration for framework-agnostic reusable libraries.
 *
 * @type {import('eslint').Linter.Config[]}
 */
const configs = [
	eslintConfigPrettier,
	importPlugin.flatConfigs.recommended,
	...baseConfig,
	...tseslintConfig,
	libraryConfig,
];

export default configs;
