/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-css-modules'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        /** Ignore TailwindCSS V4 at-rules */
        ignoreAtRules: ['theme', 'source', 'utility', 'variant', 'custom-variant', 'apply', 'reference'],
      },
    ],
  },
  overrides: [
    {
      files: '**/*.module.css',
      rules: {
        /** Enforce camelCase class names for CSS Modules */
        'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
      },
    },
  ],
};

export default config;
