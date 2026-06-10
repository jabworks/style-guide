import type { OxlintConfig } from '../types.js';

/**
 * Merge oxlint configs left-to-right into a single standalone config.
 *
 * Plugins and ignorePatterns are unioned, categories/rules/env/settings are
 * shallow-merged (later configs win), and overrides are concatenated.
 */
export const mergeConfigs = (...configs: OxlintConfig[]): OxlintConfig => {
  const result: OxlintConfig = {};

  for (const config of configs) {
    if (config.plugins) result.plugins = [...new Set([...(result.plugins ?? []), ...config.plugins])];

    if (config.categories) result.categories = { ...result.categories, ...config.categories };

    if (config.rules) result.rules = { ...result.rules, ...config.rules };

    if (config.env) result.env = { ...result.env, ...config.env };

    if (config.settings) result.settings = { ...result.settings, ...config.settings };

    if (config.overrides) result.overrides = [...(result.overrides ?? []), ...config.overrides];

    if (config.ignorePatterns)
      result.ignorePatterns = [...new Set([...(result.ignorePatterns ?? []), ...config.ignorePatterns])];
  }

  return result;
};
