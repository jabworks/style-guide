export type OxlintSeverity = 'off' | 'warn' | 'error';

export type OxlintRuleEntry = OxlintSeverity | [OxlintSeverity, ...unknown[]];

export interface OxlintOverride {
  files: string[];
  plugins?: string[];
  rules?: Record<string, OxlintRuleEntry>;
  env?: Record<string, boolean>;
}

export interface OxlintConfig {
  $schema?: string;
  plugins?: string[];
  categories?: Record<string, OxlintSeverity>;
  rules?: Record<string, OxlintRuleEntry>;
  overrides?: OxlintOverride[];
  ignorePatterns?: string[];
  env?: Record<string, boolean>;
  settings?: Record<string, unknown>;
}
