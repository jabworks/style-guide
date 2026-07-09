/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  /**
   * Disallow labels that share a name with a variable.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/no-label-var
   */
  'no-label-var': 'error',
  /**
   * Disallow initializing variables to `undefined`.
   *
   * 🔧 Fixable - https://eslint.org/docs/rules/no-undef-init
   */
  'no-undef-init': 'warn',
  /**
   * Disallow unused variables.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/no-unused-vars
   */ 'no-unused-vars': [
    'error',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      ignoreRestSiblings: false,
      vars: 'all',
      varsIgnorePattern: '^_',
    },
  ],
};

export default rules;
