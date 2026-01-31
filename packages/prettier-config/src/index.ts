import { type Config } from 'prettier';

import * as packageJson from 'prettier-plugin-packagejson';
import * as sortJson from 'prettier-plugin-sort-json';
import * as tailwindcss from 'prettier-plugin-tailwindcss';

export const config: Config = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: true,
  printWidth: 120,
  quoteProps: 'as-needed',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: [tailwindcss, sortJson, packageJson],
  overrides: [
    {
      files: ['package.json', '**/package.json'],
      options: {
        plugins: [packageJson],
      },
    },
    {
      files: ['**/*.json'],
      excludeFiles: ['package.json', '**/package.json'],
      options: {
        plugins: [sortJson],
      },
    },
  ],
};
