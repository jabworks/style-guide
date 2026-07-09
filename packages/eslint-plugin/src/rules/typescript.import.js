/**
 * These are enabled by `import/recommended`, but are better handled by
 * TypeScript and `typescript-eslint`.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
const disabledRules = {
  'import-x/default': 'off',
  'import-x/export': 'off',
  'import-x/namespace': 'off',
  'import-x/no-unresolved': 'off',
};

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  ...disabledRules,
};

export default rules;
