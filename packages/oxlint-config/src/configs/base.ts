import type { OxlintConfig } from '../types.js';

/**
 * Base preset, ported from `@jabworks/eslint-plugin` configs.base.
 *
 * Dropped (no oxlint equivalent as of 1.58): no-floating-decimal,
 * no-implied-eval, no-octal-escape, prefer-regex-literals, object-shorthand,
 * no-unreachable-loop, camelcase, prefer-arrow-callback, no-undef-init,
 * import/newline-after-import, import/no-extraneous-dependencies,
 * import/no-relative-packages, import/no-useless-path-segments,
 * import/no-deprecated, simple-import-sort/*, eslint-comments/*, @stylistic/*.
 */
const base: OxlintConfig = {
  plugins: ['import', 'unicorn'],
  categories: {
    correctness: 'error',
  },
  env: {
    builtin: true,
  },
  rules: {
    // Best practices
    'eslint/array-callback-return': ['error', { allowImplicit: true }],
    'eslint/block-scoped-var': 'error',
    'eslint/curly': ['warn', 'multi-line'],
    'eslint/default-case-last': 'error',
    'eslint/eqeqeq': 'error',
    'eslint/grouped-accessor-pairs': 'error',
    'eslint/no-alert': 'error',
    'eslint/no-caller': 'error',
    'eslint/no-constructor-return': 'error',
    'eslint/no-else-return': 'warn',
    'eslint/no-eval': 'error',
    'eslint/no-extend-native': 'error',
    'eslint/no-extra-bind': 'error',
    'eslint/no-extra-label': 'error',
    'eslint/no-implicit-coercion': 'error',
    'eslint/no-iterator': 'error',
    'eslint/no-labels': 'error',
    'eslint/no-lone-blocks': 'error',
    'eslint/no-new': 'error',
    'eslint/no-new-func': 'error',
    'eslint/no-new-wrappers': 'error',
    'eslint/no-param-reassign': 'error',
    'eslint/no-proto': 'error',
    'eslint/no-return-assign': 'error',
    'eslint/no-script-url': 'error',
    'eslint/no-self-compare': 'error',
    'eslint/no-sequences': 'error',
    'eslint/no-useless-call': 'error',
    'eslint/no-useless-concat': 'error',
    'eslint/no-useless-return': 'warn',
    'eslint/prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'eslint/yoda': 'warn',
    // ES6
    'eslint/no-useless-computed-key': 'warn',
    'eslint/no-useless-rename': 'warn',
    'eslint/no-var': 'error',
    'eslint/prefer-const': 'warn',
    'eslint/prefer-numeric-literals': 'error',
    'eslint/prefer-rest-params': 'error',
    'eslint/prefer-spread': 'error',
    'eslint/prefer-template': 'warn',
    'eslint/symbol-description': 'error',
    // Possible errors
    'eslint/no-console': ['warn', { allow: ['error', 'warn'] }],
    'eslint/no-constant-binary-expression': 'error',
    'eslint/no-promise-executor-return': 'error',
    'eslint/no-template-curly-in-string': 'error',
    // Stylistic
    'eslint/func-names': ['error', 'as-needed'],
    'eslint/new-cap': ['error', { capIsNew: false }],
    'eslint/no-array-constructor': 'error',
    'eslint/no-bitwise': 'error',
    'eslint/no-lonely-if': 'warn',
    'eslint/no-multi-assign': 'error',
    'eslint/no-nested-ternary': 'error',
    'eslint/no-unneeded-ternary': 'error',
    'eslint/prefer-object-spread': 'warn',
    // Variables
    'eslint/no-label-var': 'error',
    'eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: false,
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    // Import
    'import/first': 'error',
    'import/no-absolute-path': 'error',
    'import/no-default-export': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',
    // This rule is the most taxing on performance, so we disable it by default.
    'import/no-cycle': 'off',
    'import/named': 'off',
    // Unicorn
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  },
  ignorePatterns: [
    'dist/**',
    'build/**',
    'out/**',
    'coverage/**',
    'node_modules/**',
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    '*.config.js',
    '*.config.mjs',
    '*.config.cjs',
  ],
};

export default base;
