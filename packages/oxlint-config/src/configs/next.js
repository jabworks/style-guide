import jsxA11yRules from '../rules/jsx-a11y.js';
import reactRules from '../rules/react.js';
import typescriptExtensionRules from '../rules/typescript.extension.js';
import typescriptRules from '../rules/typescript.js';
import { mergeConfigs } from '../lib/utils.js';
import baseConfig from './base.js';
import typescriptConfig from './typescript.js';

/**
 * Next.js oxlint configuration.
 *
 * Includes base + TypeScript + React + Next.js-specific rules.
 * This is the recommended config for Next.js applications.
 */
const nextOnlyConfig = {
	plugins: ['react', 'jsx-a11y', 'nextjs'],
	rules: {
		...reactRules,
		...jsxA11yRules,
		...typescriptRules,
		...typescriptExtensionRules,
	},
	overrides: [
		{
			files: [
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
};

const config = mergeConfigs(baseConfig, typescriptConfig, nextOnlyConfig);

export default config;
