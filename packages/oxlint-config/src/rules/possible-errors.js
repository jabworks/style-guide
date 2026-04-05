/**
 * Possible error rules for oxlint.
 *
 * Maps ESLint possible error rules to their oxlint equivalents.
 */
const rules = {
	/**
	 * Disallow the use of console.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-console.html
	 */
	'eslint/no-console': ['warn', { allow: ['error', 'warn'] }],
	/**
	 * Disallow expressions where the operation doesn't affect the value.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-binary-expression.html
	 */
	'eslint/no-constant-binary-expression': 'error',
	/**
	 * Disallow returning values from Promise executor functions.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-promise-executor-return.html
	 */
	// 'eslint/no-promise-executor-return': 'error',
	/**
	 * Disallow template literal placeholder syntax in regular strings, as these are likely errors.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-template-curly-in-string.html
	 */
	'eslint/no-template-curly-in-string': 'error',
	/**
	 * Disallow loops with a body that allows only one iteration.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable-loop.html
	 */
	// 'eslint/no-unreachable-loop': 'error',
};

export default rules;
