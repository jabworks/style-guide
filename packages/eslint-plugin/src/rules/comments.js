/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  '@eslint-community/eslint-comments/disable-enable-pair': 'off',
  /**
   * Require comments on ESlint disable directives.
   *
   * 🚫 Not fixable - https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/require-description.html
   */
  '@eslint-community/eslint-comments/require-description': 'error',
};

export default rules;
