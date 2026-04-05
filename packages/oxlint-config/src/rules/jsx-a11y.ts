import type { OxlintRules } from '../types.js';

/**
 * JSX accessibility rules for oxlint.
 *
 * Maps eslint-plugin-jsx-a11y rules to their oxlint `jsx-a11y/` equivalents.
 */
const rules = {
	'jsx-a11y/no-autofocus': 'off',
} satisfies OxlintRules;

export default rules;
