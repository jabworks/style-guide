/* oxlint-disable no-console -- CLI script, console output is the point */
/**
 * Smoke-test script: imports @jabworks/oxlint-config via workspace link,
 * merges the "next" preset, and writes a valid .oxlintrc.json to this directory.
 *
 * Run: node scripts/generate-oxlintrc.mjs
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from '@jabworks/oxlint-config';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use the "next" preset (base + typescript + react + next)
const oxlintrc = {
	$schema: './node_modules/oxlint/configuration_schema.json',
	...config.configs.next,
};

// Validate it serializes cleanly
const json = JSON.stringify(oxlintrc, null, 2);
const outPath = join(__dirname, '..', '.oxlintrc.json');
writeFileSync(outPath, json, 'utf8');

console.log('Generated .oxlintrc.json:');
console.log(json);
console.log('\nPlugins:', oxlintrc.plugins);
console.log('Rule count:', Object.keys(oxlintrc.rules ?? {}).length);
console.log('Ignore patterns:', oxlintrc.ignorePatterns);
