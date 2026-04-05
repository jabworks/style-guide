import type { OxlintRules } from '../types.js';

/**
 * Variable rules for oxlint.
 *
 * Maps ESLint variable rules to their oxlint equivalents.
 */
const rules = {
	/**
	 * Disallow labels that share a name with a variable.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-label-var.html
	 */
	'eslint/no-label-var': 'error',
	/**
	 * Disallow initializing variables to `undefined`.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undef-init.html
	 */
	// 'eslint/no-undef-init': 'warn',
	/**
	 * Disallow unused variables.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-vars.html
	 */
	'eslint/no-unused-vars': [
		'error',
		{
			args: 'after-used',
			argsIgnorePattern: '^_',
			ignoreRestSiblings: false,
			vars: 'all',
			varsIgnorePattern: '^_',
		},
	],
} satisfies OxlintRules;

export default rules;
