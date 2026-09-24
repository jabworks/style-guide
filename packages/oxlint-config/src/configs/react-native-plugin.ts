import type { OxlintConfig } from '../types.js';

/**
 * Opt-in layer for React Native apps, running `oxlint-plugin-react-native`
 * (the oxlint port of eslint-plugin-react-native's rules) through oxlint's JS
 * plugin support. Needs the plugin installed in the consuming project, and
 * costs the JS plugin runtime on every run, which is why it is not part of
 * the `reactNative` preset.
 *
 * `sort-styles` is left out: it only orders style keys.
 */
const reactNativePlugin: OxlintConfig = {
  jsPlugins: [{ name: 'react-native', specifier: 'oxlint-plugin-react-native' }],
  rules: {
    // A string outside <Text> is a runtime error on native, not a style issue.
    'react-native/no-raw-text': 'error',
    // Colours belong to theme tokens, never literals in components.
    'react-native/no-color-literals': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-single-element-style-arrays': 'warn',
    'react-native/no-unused-styles': 'warn',
  },
};

export default reactNativePlugin;
