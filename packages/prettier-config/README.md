# @jabworks/prettier-config

[![NPM Version](https://img.shields.io/npm/v/%40jabworks%2Fprettier-config?style=flat-square&logo=npm)](https://www.npmjs.com/package/@jabworks/prettier-config)

Opinionated Prettier configuration with essential plugins for modern JavaScript, TypeScript, and JSON formatting.

## Features

- **Modern formatting rules** optimized for readability and consistency
- **Plugin integration** for enhanced formatting capabilities:
  - 🎨 **Tailwind CSS** - Automatic class sorting and optimization
  - 📦 **Package.json** - Consistent package.json formatting
  - 🔤 **JSON sorting** - Alphabetical key sorting for better diffs
- **TypeScript support** with proper import/export handling
- **Configurable overrides** for different file types

## Installation

```bash
# npm
npm install -D @jabworks/prettier-config

# pnpm
pnpm add -D @jabworks/prettier-config

# yarn
yarn add -D @jabworks/prettier-config
```

### Peer Dependencies

This package requires the following peer dependencies to be installed:

```bash
npm install -D prettier prettier-plugin-packagejson prettier-plugin-sort-json prettier-plugin-tailwindcss
```

## Usage

### Method 1: Prettier Configuration File (Recommended)

Create a `prettier.config.mjs` file in your project root:

```javascript
import { config } from '@jabworks/prettier-config';

export default config;
```

Or using CommonJS:

```javascript
const { config } = require('@jabworks/prettier-config');

module.exports = config;
```

### Method 2: Package.json

Add to your `package.json`:

```json
{
	"prettier": "@jabworks/prettier-config"
}
```

**Note:** This method doesn't support extending or customizing the configuration.

### Method 3: Custom Configuration

Extend the base configuration with your own rules:

```javascript
import { config } from '@jabworks/prettier-config';

export default {
	...config,
	// Your custom overrides
	printWidth: 100,
	semi: false,
};
```

## Configuration Details

This configuration includes the following settings:

### Formatting Rules

```javascript
{
  arrowParens: 'avoid',           // (a) => a instead of (a) => a
  bracketSameLine: false,         // Closing > on new line
  bracketSpacing: true,           // { foo } instead of {foo}
  endOfLine: 'lf',               // Unix line endings
  jsxSingleQuote: true,          // Single quotes in JSX
  printWidth: 120,               // Line length limit
  quoteProps: 'as-needed',       // Quote object properties only when needed
  semi: true,                    // Always add semicolons
  singleAttributePerLine: true,  // Each JSX attribute on its own line
  singleQuote: true,             // Single quotes for strings
  tabWidth: 2,                   // 2 spaces for indentation
  trailingComma: 'all',          // Trailing commas everywhere
  useTabs: false,                // Use spaces instead of tabs
}
```

### Plugins

- **prettier-plugin-tailwindcss**: Automatically sorts Tailwind CSS classes
- **prettier-plugin-sort-json**: Sorts JSON object keys alphabetically (except package.json)
- **prettier-plugin-packagejson**: Formats package.json with standard key order

### File-Specific Overrides

- **JSON files** (excluding package.json): Uses `prettier-plugin-sort-json` for key sorting
- **Package.json files**: Uses `prettier-plugin-packagejson` for standard formatting

## Examples

### Before/After Formatting

**JavaScript/TypeScript:**

```javascript
// Before
const example = { c: 1, a: 2, b: 3, longKey: 4 };
function test( a,  b, c ) {
	return a + b + c;
}

// After
const example = { c: 1, a: 2, b: 3, longKey: 4 };
function test(a, b, c) {
	return a + b + c;
}
```

**JSON:**

```json
// Before
{
  "version": "1.0.0",
  "name": "my-package",
  "dependencies": {
    "z-lib": "1.0.0",
    "a-lib": "2.0.0"
  }
}

// After
{
  "name": "my-package",
  "version": "1.0.0",
  "dependencies": {
    "a-lib": "2.0.0",
    "z-lib": "1.0.0"
  }
}
```

**Tailwind CSS:**

```jsx
// Before
<div className="text-red-500 p-4 bg-blue-100 hover:bg-blue-200 flex items-center">

// After
<div className="flex items-center bg-blue-100 p-4 text-red-500 hover:bg-blue-200">
```

## IDE Integration

### VS Code

1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Add to your VS Code settings:

```json
{
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[json]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true
}
```

## Scripts

Add these scripts to your `package.json`:

```json
{
	"scripts": {
		"format": "prettier --write .",
		"format:check": "prettier --check ."
	}
}
```

## Compatibility

- **Prettier**: >=3.8.1

## License

MIT

## Contributing

This package is part of the [@jabworks style guide monorepo](https://github.com/jabworks/style-guide). Please refer to the main repository for contribution guidelines.
