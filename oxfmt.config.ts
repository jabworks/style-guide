import { config } from '@jabworks/oxfmt-config';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...config,
  ignorePatterns: [
    // web-eslint verifies the Prettier toolchain and formats itself.
    'apps/web-eslint/**',
    'pnpm-lock.yaml',
    '**/next-env.d.ts',
    // Owned by the docket CLI, which rewrites it on every add/close.
    'docket/docket.json',
  ],
});
