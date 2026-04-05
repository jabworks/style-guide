import jsxA11yRules from '../rules/jsx-a11y.js';
import reactRules from '../rules/react.js';
import { mergeConfigs } from '../lib/utils.js';
import baseConfig from './base.js';
import typescriptConfig from './typescript.js';

/**
 * React oxlint configuration.
 *
 * Includes base + TypeScript configs plus React-specific rules.
 * Suitable for React library projects with TypeScript.
 */
const reactOnlyConfig = {
	plugins: ['react', 'jsx-a11y'],
	rules: {
		...reactRules,
		...jsxA11yRules,
		'import/no-cycle': 'error',
	},
};

const config = mergeConfigs(baseConfig, typescriptConfig, reactOnlyConfig);

export default config;
