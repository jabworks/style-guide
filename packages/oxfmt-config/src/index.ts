import { defineConfig, type FormatConfig } from 'oxfmt';

export const config: FormatConfig = defineConfig({
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
  // Sort order differs from eslint-plugin's simple-import-sort custom groups;
  // in the oxlint+oxfmt toolchain this is the only import sorting available.
  sortImports: true,
  sortPackageJson: true,
  sortTailwindcss: true,
});
