/**
 * Oxlint configuration object.
 */
export interface OxlintConfig {
	readonly plugins?: string[];
	readonly categories?: Record<string, string>;
	readonly rules?: Record<string, unknown>;
	readonly overrides?: ReadonlyArray<{
		readonly files: string[];
		readonly rules: Record<string, unknown>;
	}>;
	readonly ignorePatterns?: string[];
}

/**
 * Merge multiple oxlint config objects into one.
 */
export declare function mergeConfigs(...configs: OxlintConfig[]): OxlintConfig;

declare const config: {
	readonly meta: {
		readonly name: string;
		readonly version: string;
	};

	readonly configs: {
		readonly base: OxlintConfig;
		readonly next: OxlintConfig;
		readonly react: OxlintConfig;
		readonly typescript: OxlintConfig;
		readonly vitest: OxlintConfig;
	};

	readonly mergeConfigs: typeof mergeConfigs;
};

export { config };
