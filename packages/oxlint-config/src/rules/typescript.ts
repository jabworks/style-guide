import type { OxlintRules } from '../types.js';

/**
 * TypeScript rules for oxlint.
 *
 * Maps @typescript-eslint rules to their oxlint `typescript/` equivalents.
 */
const rules = {
	/**
	 * Require consistent usage of type exports.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-exports.html
	 */
	'typescript/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
	/**
	 * Require consistent usage of type imports.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-imports.html
	 */
	'typescript/consistent-type-imports': [
		'warn',
		{
			disallowTypeAnnotations: true,
			fixStyle: 'inline-type-imports',
			prefer: 'type-imports',
		},
	],
	/**
	 * Require using function property types in method signatures.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/method-signature-style.html
	 */
	// 'typescript/method-signature-style': 'warn',
	/**
	 * Disallow Promises in places not designed to handle them.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-promises.html
	 */
	'typescript/no-misused-promises': [
		'error',
		{
			checksVoidReturn: {
				attributes: false,
			},
		},
	],
	/**
	 * Disallow members of unions and intersections that do nothing or override type information.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-redundant-type-constituents.html
	 */
	'typescript/no-redundant-type-constituents': 'warn',
	/**
	 * Disallow unnecessary namespace qualifiers.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-qualifier.html
	 */
	// 'typescript/no-unnecessary-qualifier': 'warn',
	/**
	 * Require using `RegExp.exec()` over `String.match()` for consistency.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-regexp-exec.html
	 */
	// 'typescript/prefer-regexp-exec': 'warn',
	/**
	 * Require Array#sort calls to provide a compare function.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-array-sort-compare.html
	 */
	// 'typescript/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
	/**
	 * Enforce template literal expressions to be of string type.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-template-expressions.html
	 */
	'typescript/restrict-template-expressions': [
		'error',
		{
			allowNumber: true,
		},
	],
	/**
	 * Require exhaustive checks when using union types in switch statements.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/switch-exhaustiveness-check.html
	 */
	// 'typescript/switch-exhaustiveness-check': 'warn',
	/**
	 * Disallow empty object types.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-object-type.html
	 */
	'typescript/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
} satisfies OxlintRules;

export default rules;
