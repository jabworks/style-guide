export type OxlintSeverity = 'off' | 'warn' | 'error';

export type OxlintRuleEntry = OxlintSeverity | [OxlintSeverity, ...unknown[]];

/**
 * Mirrors oxlint's (unexported) `LintPluginOptionsSchema` union as of 1.75.
 */
export type OxlintPlugin =
  | 'eslint'
  | 'react'
  | 'unicorn'
  | 'typescript'
  | 'oxc'
  | 'import'
  | 'jsdoc'
  | 'jest'
  | 'vitest'
  | 'jsx-a11y'
  | 'nextjs'
  | 'react-perf'
  | 'promise'
  | 'node'
  | 'vue';

export interface OxlintOverride {
  files: string[];
  plugins?: OxlintPlugin[];
  rules?: Record<string, OxlintRuleEntry>;
  env?: Record<string, boolean>;
}

export interface OxlintConfig {
  $schema?: string;
  plugins?: OxlintPlugin[];
  categories?: Record<string, OxlintSeverity>;
  rules?: Record<string, OxlintRuleEntry>;
  overrides?: OxlintOverride[];
  ignorePatterns?: string[];
  env?: Record<string, boolean>;
  settings?: Record<string, unknown>;
}
