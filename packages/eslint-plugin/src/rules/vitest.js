/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  'vitest/max-nested-describe': ['error', { max: 3 }],
  'vitest/no-commented-out-tests': 'error',
  'vitest/no-disabled-tests': 'error',
  'vitest/no-focused-tests': 'error',
  'vitest/no-identical-title': 'error',
};

export default rules;
