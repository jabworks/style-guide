import type { OxlintConfig as UpstreamConfig, OxlintOverride as UpstreamOverride } from 'oxlint';

export type OxlintSeverity = 'off' | 'warn' | 'error';

export type OxlintRuleEntry = OxlintSeverity | [OxlintSeverity, ...unknown[]];

// Derived from oxlint's own exported types (since the >=1.85 peer) rather than mirrored by hand, so fields such as
// `globals`, `jsPlugins`, and `excludeFiles` can no longer go missing when oxlint grows its schema.
export type OxlintPlugin = NonNullable<UpstreamConfig['plugins']>[number];

export type OxlintOverride = UpstreamOverride;

// Presets are flat: `mergeConfigs` resolves composition eagerly, so `extends` is left to the consumer's own config.
export type OxlintConfig = Omit<UpstreamConfig, 'extends'>;
