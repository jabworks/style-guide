import { mergeConfigs } from '../lib/merge.js';
import type { OxlintConfig } from '../types.js';
import react from './react.js';

/**
 * Next.js preset, ported from `@jabworks/eslint-plugin` configs.next.
 * The nextjs plugin's recommended/core-web-vitals rules are enabled through
 * the `correctness` category.
 */
const next: OxlintConfig = mergeConfigs(react, {
  plugins: ['nextjs'],
  overrides: [
    {
      files: [
        '*.config.js',
        '*.config.mjs',
        '*.config.cjs',
        '*.config.ts',
        '**/*.d.ts',
        '**/*.stories.ts',
        '**/*.stories.tsx',
        'app/**/*error.tsx',
        'app/**/layout.tsx',
        'app/**/not-found.tsx',
        'app/**/opengraph-image.tsx',
        'app/**/page.tsx',
        'app/apple-icon.tsx',
        'app/robots.ts',
        'app/sitemap.ts',
        'next.config.mjs',
        'src/app/**/*error.tsx',
        'src/app/**/layout.tsx',
        'src/app/**/not-found.tsx',
        'src/app/**/opengraph-image.tsx',
        'src/app/**/page.tsx',
        'src/app/apple-icon.tsx',
        'src/app/robots.ts',
        'src/app/sitemap.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  ignorePatterns: ['.next/**'],
});

export default next;
