/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  /**
   * Require consistent filename case for all linted files.
   *
   * 🚫 Not fixable - https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
   */
  'unicorn/filename-case': [
    'error',
    {
      case: 'kebabCase',
    },
  ],
};

export default rules;
