import type { OxlintConfig } from '../types.js';
import bestPracticeRules from '../rules/best-practice.js';
import es6Rules from '../rules/es6.js';
import importRules from '../rules/import.js';
import possibleErrorsRules from '../rules/possible-errors.js';
import stylisticRules from '../rules/stylistic.js';
import unicornRules from '../rules/unicorn.js';
import variablesRules from '../rules/variables.js';

/**
 * Base oxlint configuration.
 *
 * Includes core ESLint rules for best practices, ES6+, imports,
 * possible errors, stylistic preferences, variables, and unicorn.
 */
const config: OxlintConfig = {
	plugins: ['import', 'unicorn'],
	categories: {
		correctness: 'error',
	},
	rules: {
		...bestPracticeRules,
		...es6Rules,
		...importRules,
		...possibleErrorsRules,
		...stylisticRules,
		...variablesRules,
		...unicornRules,
	},
	ignorePatterns: [
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
};

export default config;
