/**
 * Vitest rules for oxlint.
 *
 * Maps @vitest/eslint-plugin rules to their oxlint `vitest/` equivalents.
 */
const rules = {
	'vitest/max-nested-describe': ['error', { max: 3 }],
	'vitest/no-commented-out-tests': 'error',
	'vitest/no-disabled-tests': 'error',
	'vitest/no-focused-tests': 'error',
	'vitest/no-identical-title': 'error',
};

export default rules;
