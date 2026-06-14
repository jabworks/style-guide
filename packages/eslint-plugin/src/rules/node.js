/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
	// Prefer fs.promises over callback-based fs
	'n/prefer-promises/fs': 'error',
	'n/prefer-promises/dns': 'error',

	// Disallow process.exit() — set process.exitCode instead
	'n/no-process-exit': 'error',

	// Disallow passing non-Error values to callback first argument
	'n/no-callback-literal': 'error',

	// Prefer explicit imports over global Buffer/process
	'n/prefer-global/buffer': ['error', 'never'],
	'n/prefer-global/process': ['error', 'always'],
	'n/prefer-global/url': ['error', 'always'],
	'n/prefer-global/url-search-params': ['error', 'always'],
};

export default rules;
