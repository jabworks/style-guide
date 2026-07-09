import { node } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [node],
  rules: {
    // Rule and config modules export defaults by design.
    'import/no-default-export': 'off',
  },
});
