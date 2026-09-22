import type { OxlintConfig } from '../types.js';

type JsPluginEntry = NonNullable<OxlintConfig['jsPlugins']>[number];

// A JS plugin is identified by the module it loads, whether given as a bare specifier or as `{ name, specifier }`.
const jsPluginKey = (entry: JsPluginEntry) => (typeof entry === 'string' ? entry : entry.specifier);

const unionJsPlugins = (current: JsPluginEntry[], next: JsPluginEntry[]) => {
  const byKey = new Map(current.map(entry => [jsPluginKey(entry), entry]));

  for (const entry of next) byKey.set(jsPluginKey(entry), entry);

  return [...byKey.values()];
};

/**
 * Merge oxlint configs left-to-right into a single standalone config.
 *
 * Plugins, jsPlugins, and ignorePatterns are unioned (a later jsPlugins entry
 * for the same specifier wins), categories/rules/env/globals/settings/options
 * are shallow-merged (later configs win), and overrides are concatenated.
 */
export const mergeConfigs = (...configs: OxlintConfig[]): OxlintConfig => {
  const result: OxlintConfig = {};

  for (const config of configs) {
    if (config.plugins) result.plugins = [...new Set([...(result.plugins ?? []), ...config.plugins])];

    if (config.jsPlugins) result.jsPlugins = unionJsPlugins(result.jsPlugins ?? [], config.jsPlugins);

    if (config.categories) result.categories = { ...result.categories, ...config.categories };

    if (config.rules) result.rules = { ...result.rules, ...config.rules };

    if (config.env) result.env = { ...result.env, ...config.env };

    if (config.globals) result.globals = { ...result.globals, ...config.globals };

    if (config.settings) result.settings = { ...result.settings, ...config.settings };

    if (config.options) result.options = { ...result.options, ...config.options };

    if (config.overrides) result.overrides = [...(result.overrides ?? []), ...config.overrides];

    if (config.ignorePatterns) {
      result.ignorePatterns = [...new Set([...(result.ignorePatterns ?? []), ...config.ignorePatterns])];
    }
  }

  return result;
};
