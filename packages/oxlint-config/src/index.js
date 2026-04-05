import pkg from '../package.json' with { type: 'json' };
import base from './configs/base.js';
import next from './configs/next.js';
import react from './configs/react.js';
import typescript from './configs/typescript.js';
import vitest from './configs/vitest.js';
import { mergeConfigs } from './lib/utils.js';

const { name, version } = pkg;

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
		name,
		version,
	},
	configs: {
		base,
		next,
		react,
		typescript,
		vitest,
	},
	mergeConfigs,
};
