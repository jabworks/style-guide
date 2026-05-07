import type { OxlintConfig } from './types.js';
import base from './configs/base.js';
import next from './configs/next.js';
import react from './configs/react.js';
import typescript from './configs/typescript.js';
import vitest from './configs/vitest.js';
import { mergeConfigs } from './lib/utils.js';

export type { OxlintConfig, OxlintOverride, OxlintRules, RuleSeverity, RuleValue } from './types.js';
export { mergeConfigs } from './lib/utils.js';

/**
 * @jabworks/oxlint-config
 *
 * Opinionated oxlint configuration for JS, TS, React, and Next.js projects.
 *
 * Each config is a partial oxlint config object that can be used directly
 * or merged with other configs using the `mergeConfigs` utility.
 */
export const config = {
	meta: {
		name: '@jabworks/oxlint-config',
		version: '0.1.0',
	},
	configs: {
		base,
		next,
		react,
		typescript,
		vitest,
	},
	mergeConfigs,
} as const satisfies {
	meta: { name: string; version: string };
	configs: Record<string, OxlintConfig>;
	mergeConfigs: typeof mergeConfigs;
};
