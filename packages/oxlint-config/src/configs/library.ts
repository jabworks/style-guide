import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import typescript from './typescript.js';

/**
 * Framework-agnostic library preset (e.g. utility libraries, shared packages).
 *
 * No env globals — libraries should be environment-agnostic.
 * Enables import/no-cycle (disabled in base for performance) since library
 * consumers depend on clean, tree-shakeable module graphs.
 */
export const libraryRules: OxlintConfig = {
  rules: {
    'import/no-cycle': 'error',
  },
};

const library: OxlintConfig = mergeConfigs(typescript, libraryRules);

export default library;
