import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import base from './base.js';

/**
 * TypeScript preset, ported from `@jabworks/eslint-plugin` configs.typescript.
 *
 * Type-aware rules (consistent-type-exports, no-misused-promises,
 * no-redundant-type-constituents, no-unnecessary-qualifier,
 * prefer-regexp-exec, require-array-sort-compare,
 * restrict-template-expressions, switch-exhaustiveness-check) only run when
 * `oxlint-tsgolint` is installed and oxlint runs with `--type-aware`.
 *
 * Dropped (no oxlint equivalent as of 1.58): method-signature-style,
 * naming-convention.
 */
export const typescriptRules: OxlintConfig = {
  plugins: ['typescript'],
  rules: {
    'typescript/consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
    'typescript/consistent-type-imports': [
      'warn',
      {
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
    'typescript/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
    'typescript/no-redundant-type-constituents': 'warn',
    'typescript/no-unnecessary-qualifier': 'warn',
    'typescript/prefer-regexp-exec': 'warn',
    'typescript/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    'typescript/restrict-template-expressions': ['error', { allowNumber: true }],
    'typescript/switch-exhaustiveness-check': ['warn', { considerDefaultExhaustiveForUnions: true }],
    'typescript/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
    // Extension rules: oxlint's eslint/* implementations handle TS sources.
    'eslint/default-param-last': 'error',
    'eslint/no-loop-func': 'error',
    'eslint/no-useless-constructor': 'error',
  },
};

const typescript: OxlintConfig = mergeConfigs(base, typescriptRules);

export default typescript;
