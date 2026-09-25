import base from './configs/base.js';
import expoPlugin from './configs/expo-plugin.js';
import expo from './configs/expo.js';
import library from './configs/library.js';
import next from './configs/next.js';
import node from './configs/node.js';
import reactNativePlugin from './configs/react-native-plugin.js';
import reactNative from './configs/react-native.js';
import react from './configs/react.js';
import typescript from './configs/typescript.js';
import vitest from './configs/vitest.js';

export { imperativeRenderOverride } from './configs/imperative-render.js';
export { mergeConfigs } from './lib/merge.js';
export type { OxlintConfig, OxlintOverride, OxlintPlugin, OxlintRuleEntry, OxlintSeverity } from './types.js';

export const config = {
  configs: {
    base,
    typescript,
    react,
    reactNative,
    expo,
    next,
    node,
    library,
    vitest,
    expoPlugin,
    reactNativePlugin,
  },
};

export { base, expo, expoPlugin, library, next, node, react, reactNative, reactNativePlugin, typescript, vitest };
