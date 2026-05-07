import type { OxlintConfig } from '../types.js';

/**
 * Deep merge multiple oxlint config objects into one.
 * Arrays are concatenated, objects are deeply merged, and primitives are overwritten.
 */
export function mergeConfigs(...configs: (OxlintConfig | undefined | null)[]): OxlintConfig {
	const result: Required<OxlintConfig> = {
		plugins: [],
		categories: {},
		rules: {},
		overrides: [],
		ignorePatterns: [],
	};

	for (const config of configs) {
		if (!config) continue;

		if (config.plugins) {
			for (const plugin of config.plugins) {
				if (!result.plugins.includes(plugin)) {
					result.plugins.push(plugin);
				}
			}
		}

		if (config.categories) {
			Object.assign(result.categories, config.categories);
		}

		if (config.rules) {
			Object.assign(result.rules, config.rules);
		}

		if (config.overrides) {
			result.overrides.push(...config.overrides);
		}

		if (config.ignorePatterns) {
			for (const pattern of config.ignorePatterns) {
				if (!result.ignorePatterns.includes(pattern)) {
					result.ignorePatterns.push(pattern);
				}
			}
		}
	}

	return result;
}
