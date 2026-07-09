/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  /**
   * Require consistent usage of type exports.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-exports/
   */
  '@typescript-eslint/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
  /**
   * Require consistent usage of type imports.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-imports/
   */
  '@typescript-eslint/consistent-type-imports': [
    'warn',
    {
      disallowTypeAnnotations: true,
      fixStyle: 'inline-type-imports',
      prefer: 'type-imports',
    },
  ],
  /**
   * Require explicit return types on functions and class methods.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
   */
  // '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
  /**
   * Require using function property types in method signatures.
   *
   * These have enhanced typechecking, whereas method signatures do not.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/method-signature-style/
   */
  '@typescript-eslint/method-signature-style': 'warn',
  /**
   * Require consistent naming conventions.
   *
   * Improves IntelliSense suggestions and avoids name collisions.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/naming-convention/
   */
  '@typescript-eslint/naming-convention': [
    'error',
    // Anything type-like should be written in PascalCase.
    {
      format: ['PascalCase'],
      selector: ['typeLike', 'enumMember'],
    },
    // Interfaces cannot be prefixed with `I`, or have restricted names.
    {
      custom: {
        match: false,
        regex: '^I[A-Z]|^(Interface|Props|State)$',
      },
      format: ['PascalCase'],
      selector: 'interface',
    },
  ],
  /**
   * Disallow Promises in places not designed to handle them.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-misused-promises/
   */
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksVoidReturn: {
        attributes: false,
      },
    },
  ],
  /**
   * Disallow members of unions and intersections that do nothing or override type information.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-redundant-type-constituents/
   */
  '@typescript-eslint/no-redundant-type-constituents': 'warn',
  /**
   * Disallow unnecessary namespace qualifiers.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/no-unnecessary-qualifier/
   */
  '@typescript-eslint/no-unnecessary-qualifier': 'warn',
  /**
   * Require using `RegExp.exec()` over `String.match()` for consistency.
   *
   * 🔧 Fixable - https://typescript-eslint.io/rules/prefer-regexp-exec/
   */
  '@typescript-eslint/prefer-regexp-exec': 'warn',
  /**
   * Require Array#sort calls to provide a compare function.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/require-array-sort-compare/
   */
  '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
  /**
   * Enforce template literal expressions to be of string type.
   *
   * The default settings of this rule intentionally do not allow objects with a custom toString() method to be used in template literals, because the stringification result may not be user-friendly.
   *
   * Number is allowed because it is a common use case to use numbers in template literals.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/restrict-template-expressions/
   */
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowNumber: true,
    },
  ],
  /**
   * Require exhaustive checks when using union types in switch statements.
   *
   * This ensures cases are considered when items are later added to a union.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
   */
  '@typescript-eslint/switch-exhaustiveness-check': [
    'warn',
    {
      considerDefaultExhaustiveForUnions: true,
    },
  ],
  /**
   * Disallow empty object types.
   *
   * This rule is useful to prevent the accidental creation of empty interfaces or types that do not provide any value.
   *
   * Allow empty interfaces that extend from a single base interface.
   *
   * 🚫 Not fixable - https://typescript-eslint.io/rules/no-empty-object-type/
   */
  '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
};

export default rules;
