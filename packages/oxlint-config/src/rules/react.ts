import type { OxlintRules } from '../types.js';

/**
 * React rules for oxlint.
 *
 * Maps eslint-plugin-react rules to their oxlint `react/` equivalents.
 */

const disabledRules = {
	'react/prop-types': 'off',
	'react/react-in-jsx-scope': 'off',
} satisfies OxlintRules;

const rules = {
	...disabledRules,
	/**
	 * Require an explicit type when using button elements.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type.html
	 */
	'react/button-has-type': 'warn',
	/**
	 * Require destructuring and symmetric naming of `useState` hook value and setter variables.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/hook-use-state.html
	 */
	// 'react/hook-use-state': 'warn',
	/**
	 * Require consistent boolean attributes notation in JSX.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-boolean-value.html
	 */
	'react/jsx-boolean-value': 'warn',
	/**
	 * Disallow unnecessary curly braces in JSX props and children.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-curly-brace-presence.html
	 */
	'react/jsx-curly-brace-presence': 'warn',
	/**
	 * Require using shorthand form for React fragments, unless required.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-fragments.html
	 */
	'react/jsx-fragments': 'warn',
	/**
	 * Prevent problematic leaked values from being rendered.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-leaked-render.html
	 */
	'react/jsx-no-leaked-render': 'warn',
	/**
	 * Prevents usage of unsafe `target='_blank'`.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank.html
	 */
	'react/jsx-no-target-blank': [
		'error',
		{
			allowReferrer: true,
		},
	],
	/**
	 * Disallow empty React fragments.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-useless-fragment.html
	 */
	'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
	/**
	 * Require the use of PascalCase for user-defined JSX components.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-pascal-case.html
	 */
	// 'react/jsx-pascal-case': 'warn',
	/**
	 * Disallow usage of Array index in keys.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/no-array-index-key.html
	 */
	'react/no-array-index-key': 'warn',
	/**
	 * Disallow creating unstable components inside components.
	 *
	 * 🚫 Not fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/no-unstable-nested-components.html
	 */
	'react/no-unstable-nested-components': 'error',
	/**
	 * Disallow closing tags for components without children.
	 *
	 * 🔧 Fixable - https://oxc.rs/docs/guide/usage/linter/rules/react/self-closing-comp.html
	 */
	'react/self-closing-comp': 'warn',
} satisfies OxlintRules;

export default rules;
