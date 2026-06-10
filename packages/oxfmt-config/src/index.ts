import { defineConfig, type FormatOptions } from 'oxfmt';

export const config: FormatOptions = defineConfig({
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
  sortPackageJson: true,
  sortTailwindcss: true,
});
