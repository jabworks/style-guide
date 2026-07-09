import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import { TYPESCRIPT_FILES } from '../lib/constants.js';
import typescriptExtensionRules from '../rules/typescript.extension.js';
import typescriptImportRules from '../rules/typescript.import.js';
import typescriptRules from '../rules/typescript.js';

/** @type {import('eslint').Linter.Config} */
export const tseslintConfig = {
  name: '@jabworks/eslint-config-typescript',
  files: TYPESCRIPT_FILES,
  rules: {
    ...typescriptRules,
    ...typescriptExtensionRules,
    ...typescriptImportRules,
  },
};

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs.typescript,
  eslintConfigPrettier,
  tseslintConfig,
];

export default configs;
