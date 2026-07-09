/**
 * ESLint stylistic rules configuration.
 *
 * This object defines a set of stylistic rules for ESLint, including:
 * - Enforcing camel case naming conventions, with exceptions for certain patterns and destructuring.
 * - Requiring function expressions to have a name only when necessary.
 * - Enforcing capitalization for constructor functions.
 * - Warning when parentheses are omitted in constructor calls with no arguments.
 * - Disallowing the use of the Array constructor.
 * - Warning against lonely if statements within else blocks.
 * - Disallowing chained assignment expressions.
 * - Disallowing nested ternary expressions.
 * - Disallowing unnecessary ternary operators.
 * - Enforcing consistent blank lines between statements, especially around returns, variable declarations, and control flow statements.
 * - Preferring object spread syntax over Object.assign.
 * - Preferring arrow functions for callbacks.
 *
 * Some rules are fixable by ESLint, while others are not. See individual rule comments for details and references.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
const rules = {
  /**
   * Require camel case names.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/camelcase
   */
  camelcase: ['error', { allow: ['^UNSAFE_'], ignoreDestructuring: true, properties: 'never', ignoreImports: true }],
  /**
   * Require function expressions to have a name.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/func-names
   */
  'func-names': ['error', 'as-needed'],
  /**
   * Require a capital letter for constructors.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/new-cap
   */
  'new-cap': ['error', { capIsNew: false }],
  /**
   * Disallow the omission of parentheses when invoking a constructor with
   * no arguments.
   *
   * 🔧 Fixable - https://eslint.style/rules/default/new-parens
   */
  '@stylistic/new-parens': 'warn',
  /**
   * Disallow use of the Array constructor.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/no-array-constructor
   */
  'no-array-constructor': 'error',
  /**
   * Disallow use of bitwise operators.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/no-bitwise
   */
  'no-bitwise': 'error',
  /**
   * Disallow if as the only statement in an else block.
   *
   * 🔧 Fixable - https://eslint.org/docs/rules/no-lonely-if
   */
  'no-lonely-if': 'warn',
  /**
   * Disallow use of chained assignment expressions.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/no-multi-assign
   */
  'no-multi-assign': ['error'],
  /**
   * Disallow nested ternary expressions.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/no-nested-ternary
   */
  'no-nested-ternary': 'error',
  /**
   * Disallow ternary operators when simpler alternatives exist.
   *
   * 🚫 Not fixable - https://eslint.org/docs/rules/no-unneeded-ternary
   */
  'no-unneeded-ternary': 'error',
  /**
   * Enforces consistent blank lines between statements.
   *
   * 🔧 Fixable - https://eslint.style/rules/default/padding-line-between-statements
   */
  '@stylistic/padding-line-between-statements': [
    'warn',
    { blankLine: 'always', next: 'return', prev: '*' },
    { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
    { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
    { blankLine: 'always', next: ['if', 'try', 'switch', 'for', 'while'], prev: '*' },
    { blankLine: 'always', next: '*', prev: ['if', 'try', 'switch', 'for', 'while'] },
    { blankLine: 'always', next: 'block-like', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'block-like' },
  ],
  /**
   * Require use of an object spread over Object.assign.
   *
   * 🔧 Fixable - https://eslint.org/docs/rules/prefer-object-spread
   */
  'prefer-object-spread': 'warn',
  /**
   * Require using arrow functions for callbacks .
   *
   * 🔧 Fixable - https://eslint.org/docs/latest/rules/prefer-arrow-callback
   */
  'prefer-arrow-callback': 'warn',
  '@stylistic/spaced-comment': 'error',
};

export default rules;
