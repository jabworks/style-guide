import { config } from '@jabworks/oxfmt-config';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...config,
  ignorePatterns: [
    // web-eslint verifies the Prettier toolchain and formats itself.
    'apps/web-eslint/**',
    'pnpm-lock.yaml',
    '**/next-env.d.ts',
  ],
});
