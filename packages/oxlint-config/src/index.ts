import base from './configs/base.js';
import next from './configs/next.js';
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
    vitest,
  },
};

export { base, next, react, typescript, vitest };
