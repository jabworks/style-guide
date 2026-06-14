import base from './configs/base.js';
import library from './configs/library.js';
import next from './configs/next.js';
import node from './configs/node.js';
import react from './configs/react.js';
import typescript from './configs/typescript.js';
import vitest from './configs/vitest.js';

export { mergeConfigs } from './lib/merge.js';
export type { OxlintConfig, OxlintOverride, OxlintRuleEntry, OxlintSeverity } from './types.js';

export const config = {
  configs: {
    base,
    typescript,
    react,
    next,
    node,
    library,
    vitest,
  },
};

export { base, library, next, node, react, typescript, vitest };
