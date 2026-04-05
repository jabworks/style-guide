/**
 * Unicorn rules for oxlint.
 *
 * Maps eslint-plugin-unicorn rules to their oxlint `unicorn/` equivalents.
 */
const rules = {
	/**
	 * Require consistent filename case for all linted files.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/unicorn/filename-case.html
	 */
	'unicorn/filename-case': [
		'error',
		{
			case: 'kebabCase',
		},
	],
};

export default rules;
