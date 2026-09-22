import type { OxlintConfig } from '../types.js';

/**
 * Base preset, ported from `@jabworks/eslint-plugin` configs.base.
 *
 * Dropped (no oxlint equivalent as of 1.85): no-octal-escape, camelcase,
 * no-undef-init, import/no-extraneous-dependencies,
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
    'eslint/no-implied-eval': 'error',
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
    'eslint/prefer-regex-literals': 'error',
    'eslint/yoda': 'warn',
    // ES6
    'eslint/no-useless-computed-key': 'warn',
    'eslint/no-useless-rename': 'warn',
    'eslint/no-var': 'error',
    'eslint/object-shorthand': 'warn',
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
    'eslint/no-unreachable-loop': 'error',
    // Stylistic
    'eslint/func-names': ['error', 'as-needed'],
    'eslint/new-cap': ['error', { capIsNew: false }],
    'eslint/no-array-constructor': 'error',
    'eslint/no-bitwise': 'error',
    'eslint/no-lonely-if': 'warn',
    'eslint/no-multi-assign': 'error',
    'eslint/no-nested-ternary': 'error',
    'eslint/no-unneeded-ternary': 'error',
    'eslint/prefer-arrow-callback': 'warn',
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
    'import/newline-after-import': 'warn',
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
  overrides: [
    {
      // Tool configs (oxlint.config.ts, vite.config.ts, eslint.config.js, …) must default-export. The ignorePatterns
      // below used to cover the JS ones, but oxlint's `extends` drops a preset's ignorePatterns, so an override (which
      // does survive `extends`) is what keeps consumers' config files from failing no-default-export.
      files: ['*.config.js', '*.config.mjs', '*.config.cjs', '*.config.ts', '*.config.mts', '*.config.cts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  // Only effective when the preset is spread or passed through mergeConfigs: `extends` drops ignorePatterns.
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
