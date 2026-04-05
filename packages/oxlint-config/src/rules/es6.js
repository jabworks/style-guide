/**
 * ES6+ rules for oxlint.
 *
 * Maps ESLint ES6 rules to their oxlint equivalents.
 */
const rules = {
	/**
	 * Disallow useless computed property keys.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-computed-key.html
	 */
	'eslint/no-useless-computed-key': 'warn',
	/**
	 * Disallow renaming import, export, and destructured assignments to the
	 * same name.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-rename.html
	 */
	'eslint/no-useless-rename': 'warn',
	/**
	 * Require `let` or `const` instead of `var`.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-var.html
	 */
	'eslint/no-var': 'error',
	/**
	 * Require object literal shorthand syntax.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/object-shorthand.html
	 */
	'eslint/object-shorthand': 'warn',
	/**
	 * Require default to `const` instead of `let`.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-const.html
	 */
	'eslint/prefer-const': 'warn',
	/**
	 * Disallow parseInt() in favor of binary, octal, and hexadecimal literals.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-numeric-literals.html
	 */
	'eslint/prefer-numeric-literals': 'error',
	/**
	 * Require using rest parameters instead of `arguments`.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-rest-params.html
	 */
	'eslint/prefer-rest-params': 'error',
	/**
	 * Require using spread syntax instead of `.apply()`.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-spread.html
	 */
	'eslint/prefer-spread': 'error',
	/**
	 * Require using template literals instead of string concatenation.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-template.html
	 */
	// 'eslint/prefer-template': 'warn',
	/**
	 * Require a `Symbol` description.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/symbol-description.html
	 */
	'eslint/symbol-description': 'error',
};

export default rules;
