// These share identical configuration options, so we want to keep them in sync.
import noUnusedVarsRules from './variables.js';

/**
 * TypeScript extension rules for oxlint.
 *
 * Maps @typescript-eslint extension rules to their oxlint `typescript/` equivalents.
 */
const rules = {
	/**
	 * Require default parameters to be last.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/default-param-last.html
	 */
	'typescript/default-param-last': 'error',
	/**
	 * Disallow creation of functions within loops.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-loop-func.html
	 */
	'typescript/no-loop-func': 'error',
	/**
	 * Disallow unused variables.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unused-vars.html
	 */
	'typescript/no-unused-vars': noUnusedVarsRules['eslint/no-unused-vars'],
	/**
	 * Disallow unnecessary constructors.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-constructor.html
	 */
	'typescript/no-useless-constructor': 'error',
};

export default rules;
