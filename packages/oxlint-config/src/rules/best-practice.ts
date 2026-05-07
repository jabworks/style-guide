import type { OxlintRules } from '../types.js';

/**
 * Best practice rules for oxlint.
 *
 * Maps ESLint best practice rules to their oxlint equivalents.
 */
const rules = {
	/**
	 * Require return statements in array methods callbacks.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/array-callback-return.html
	 */
	'eslint/array-callback-return': ['error', { allowImplicit: true }],
	/**
	 * Require default clauses in switch statements to be last (if used).
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case-last.html
	 */
	'eslint/default-case-last': 'error',
	/**
	 * Require triple equals (`===` and `!==`).
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/eqeqeq.html
	 */
	'eslint/eqeqeq': 'error',
	/**
	 * Require grouped accessor pairs in object literals and classes.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/grouped-accessor-pairs.html
	 */
	'eslint/grouped-accessor-pairs': 'error',
	/**
	 * Disallow use of `alert()`.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-alert.html
	 */
	'eslint/no-alert': 'error',
	/**
	 * Disallow use of `caller`/`callee`.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-caller.html
	 */
	'eslint/no-caller': 'error',
	/**
	 * Disallow returning value in constructor.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constructor-return.html
	 */
	'eslint/no-constructor-return': 'error',
	/**
	 * Disallow using an `else` if the `if` block contains a return.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-else-return.html
	 */
	'eslint/no-else-return': 'warn',
	/**
	 * Disallow `eval()`.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eval.html
	 */
	'eslint/no-eval': 'error',
	/**
	 * Disallow unnecessary function binding.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-bind.html
	 */
	// 'eslint/no-extra-bind': 'error',
	/**
	 * Disallow unnecessary labels.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-label.html
	 */
	// 'eslint/no-extra-label': 'error',
	/**
	 * Disallow use of `eval()`-like methods.
	 *
	 * https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implied-eval.html
	 */
	// 'eslint/no-implied-eval': 'error',
	/**
	 * Disallow usage of `__iterator__` property.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-iterator.html
	 */
	'eslint/no-iterator': 'error',
	/**
	 * Disallow use of labels for anything other than loops and switches.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-labels.html
	 */
	// 'eslint/no-labels': 'error',
	/**
	 * Disallow unnecessary nested blocks.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lone-blocks.html
	 */
	// 'eslint/no-lone-blocks': 'error',
	/**
	 * Disallow `new` for side effects.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new.html
	 */
	'eslint/no-new': 'error',
	/**
	 * Disallow function constructors.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-func.html
	 */
	'eslint/no-new-func': 'error',
	/**
	 * Disallow primitive wrapper instances, such as `new String('foo')`.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-wrappers.html
	 */
	'eslint/no-new-wrappers': 'error',
	/**
	 * Disallow usage of the deprecated `__proto__` property.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-proto.html
	 */
	'eslint/no-proto': 'error',
	/**
	 * Disallow assignment in `return` statement.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-return-assign.html
	 */
	'eslint/no-return-assign': 'error',
	/**
	 * Disallow use of `javascript:` urls.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-script-url.html
	 */
	'eslint/no-script-url': 'error',
	/**
	 * Disallow comparisons where both sides are exactly the same.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-compare.html
	 */
	'eslint/no-self-compare': 'error',
	/**
	 * Disallow use of comma operator.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sequences.html
	 */
	'eslint/no-sequences': 'error',
	/**
	 * Disallow unnecessary `.call()` and `.apply()`.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-call.html
	 */
	'eslint/no-useless-call': 'error',
	/**
	 * Disallow unnecessary concatenation of strings.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-concat.html
	 */
	'eslint/no-useless-concat': 'error',
	/**
	 * Disallow use of the RegExp constructor in favor of regular expression literals.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-regex-literals.html
	 */
	// 'eslint/prefer-regex-literals': 'error',
	/**
	 * Disallow "Yoda conditions", ensuring the comparison.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/eslint/yoda.html
	 */
	'eslint/yoda': 'warn',
} satisfies OxlintRules;

export default rules;
