/**
 * Severity level for an oxlint rule.
 */
export type RuleSeverity = 'off' | 'warn' | 'error';

/**
 * A rule value can be a severity string or an array with severity and options.
 */
export type RuleValue = RuleSeverity | [RuleSeverity, ...unknown[]];

/**
 * A record of oxlint rule names to their configuration values.
 */
export type OxlintRules = Record<string, RuleValue>;

/**
 * An override entry for oxlint configuration.
 */
export interface OxlintOverride {
	readonly files: string[];
	readonly rules: OxlintRules;
}

/**
 * Oxlint configuration object.
 */
export interface OxlintConfig {
	readonly plugins?: string[];
	readonly categories?: Record<string, RuleSeverity>;
	readonly rules?: OxlintRules;
	readonly overrides?: OxlintOverride[];
	readonly ignorePatterns?: string[];
}
