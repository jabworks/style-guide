import type { OxlintRules } from '../types.js';

/**
 * Import rules for oxlint.
 *
 * Maps ESLint import plugin rules to their oxlint equivalents.
 * Note: `simple-import-sort` rules are not available in oxlint.
 */

const disabledRules = {
	'import/named': 'off',
	'import/no-cycle': 'off',
	'import/order': 'off',
} satisfies OxlintRules;

const rules = {
	/**
	 * Disallow non-import statements appearing before import statements.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/import/first.html
	 */
	'import/first': 'error',
	/**
	 * Disallow import of modules using absolute paths.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/import/no-absolute-path.html
	 */
	// 'import/no-absolute-path': 'error',
	/**
	 * Disallow default exports.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/import/no-default-export.html
	 */
	'import/no-default-export': 'error',
	/**
	 * Disallow mutable exports.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/import/no-mutable-exports.html
	 */
	// 'import/no-mutable-exports': 'error',
	/**
	 * Disallow a module from importing itself.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/import/no-self-import.html
	 */
	'import/no-self-import': 'error',
	/**
	 * Forbid imported names marked with @deprecated documentation tag.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/import/no-deprecated.html
	 */
	// 'import/no-deprecated': 'error',
	/**
	 * Disallow the use of extraneous packages.
	 *
	 * Note: simple-import-sort rules are not available in oxlint.
	 */
	...disabledRules,
} satisfies OxlintRules;

export default rules;
