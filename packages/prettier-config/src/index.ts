import { type Config } from 'prettier';

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
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-sort-json', 'prettier-plugin-packagejson'],
  overrides: [
    {
      files: ['package.json', '**/package.json'],
      options: {
        plugins: ['prettier-plugin-packagejson'],
      },
    },
    {
      files: ['**/*.json'],
      excludeFiles: ['package.json', '**/package.json'],
      options: {
        plugins: ['prettier-plugin-sort-json'],
      },
    },
  ],
};
