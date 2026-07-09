// These share identical configuration options, so we want to keep them in sync.
import noUnusedVarsRules from './variables.js';

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  /**
   * Require default parameters to be last.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/default-param-last/
   */
  '@typescript-eslint/default-param-last': 'error',
  /**
   * Disallow creation of functions within loops.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-loop-func/
   */
  '@typescript-eslint/no-loop-func': 'error',
  /**
   * Disallow variable declarations from shadowing variables declared in the
   * outer scope.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-shadow/
   */
  // '@typescript-eslint/no-shadow': 'error',
  /**
   * Disallow unused variables.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-unused-vars/
   */
  '@typescript-eslint/no-unused-vars': noUnusedVarsRules['no-unused-vars'],
  /**
   * Disallow unnecessary constructors.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-useless-constructor/
   */
  '@typescript-eslint/no-useless-constructor': 'error',
};

export default rules;
