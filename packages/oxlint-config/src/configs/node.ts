import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import typescript from './typescript.js';
import { vitestOverride } from './vitest.js';

/**
 * Node.js preset, ported from `@jabworks/eslint-plugin` configs.node.
 *
 * Dropped (no oxlint equivalent as of 1.69): n/prefer-promises/fs,
 * n/prefer-promises/dns, n/no-callback-literal, n/prefer-global/*.
 */
export const nodeRules: OxlintConfig = {
  plugins: ['node'],
  env: {
    node: true,
  },
  rules: {
    'node/no-process-exit': 'error',
    'node/no-path-concat': 'error',
    'node/no-new-require': 'error',
    'node/no-exports-assign': 'error',
    'node/handle-callback-err': 'error',
    // process.env access is allowed — use a secrets manager or dotenv in practice
    'node/no-process-env': 'off',
  },
  overrides: [vitestOverride],
};

const node: OxlintConfig = mergeConfigs(typescript, nodeRules);

export default node;
