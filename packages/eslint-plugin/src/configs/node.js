import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginN from 'eslint-plugin-n';
import globals from 'globals';

import nodeRules from '../rules/node.js';
import baseConfig from './base.js';
import tseslintConfig from './typescript.js';

/** @type {import('eslint').Linter.Config} */
export const nodeConfig = {
	name: '@jabworks/eslint-config-node',
	languageOptions: {
		globals: {
			...globals.node,
		},
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},
	plugins: {
		n: pluginN,
	},
	rules: {
		...nodeRules,
	},
};

/**
 * A custom ESLint configuration for Node.js backend projects.
 *
 * @type {import('eslint').Linter.Config[]}
 */
const configs = [
	eslintConfigPrettier,
	importPlugin.flatConfigs.recommended,
	...baseConfig,
	...tseslintConfig,
	pluginN.configs['flat/recommended-module'],
	nodeConfig,
];

export default configs;
