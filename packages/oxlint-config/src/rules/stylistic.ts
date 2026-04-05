import type { OxlintRules } from '../types.js';

/**
 * Stylistic rules for oxlint.
 *
 * Maps ESLint stylistic rules to their oxlint equivalents.
 * Note: @stylistic/eslint-plugin rules are not available in oxlint.
 */
const rules = {
	/**
	 * Require camel case names.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/camelcase.html
	 */
	'eslint/camelcase': ['error', { allow: ['^UNSAFE_'], ignoreDestructuring: true, properties: 'never', ignoreImports: true }],
	/**
	 * Disallow use of the Array constructor.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-array-constructor.html
	 */
	'eslint/no-array-constructor': 'error',
	/**
	 * Disallow use of bitwise operators.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-bitwise.html
	 */
	'eslint/no-bitwise': 'error',
	/**
	 * Disallow if as the only statement in an else block.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lonely-if.html
	 */
	'eslint/no-lonely-if': 'warn',
	/**
	 * Disallow nested ternary expressions.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nested-ternary.html
	 */
	'eslint/no-nested-ternary': 'error',
	/**
	 * Disallow ternary operators when simpler alternatives exist.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unneeded-ternary.html
	 */
	'eslint/no-unneeded-ternary': 'error',
	/**
	 * Require use of an object spread over Object.assign.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-spread.html
	 */
	'eslint/prefer-object-spread': 'warn',
	/**
	 * Require using arrow functions for callbacks.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-arrow-callback.html
	 */
	// 'eslint/prefer-arrow-callback': 'warn',
} satisfies OxlintRules;

export default rules;
