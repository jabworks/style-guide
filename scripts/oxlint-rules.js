#!/usr/bin/env node
/**
 * Snapshot of the rules each @jabworks/oxlint-config preset actually enables.
 *
 * Exists because an oxlint upgrade can change what a preset enforces without a
 * line of the preset changing. `base` sets the correctness category to error,
 * so every new correctness rule oxlint ships is switched on for consumers
 * (1.85 did this with the React Compiler rules). This resolves each preset with
 * `oxlint --print-config`, which expands categories into concrete rules, and
 * compares the result with the committed snapshot. A silent change becomes a
 * failing check that someone has to review.
 *
 * The JS-plugin layers (expoPlugin, reactNativePlugin) are recorded as written:
 * `--print-config` omits JS plugins and their rules (verified on 1.85), and
 * categories never reach JS plugins, so their rule sets only change when the
 * layer's own source does.
 *
 * Needs packages/oxlint-config built first.
 *
 * Usage: pnpm rules:check   (exit 1 on any difference)
 *        pnpm rules:update  (rewrite the snapshot after reviewing the change)
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const distEntry = join(repoRoot, 'packages/oxlint-config/dist/index.mjs');
const snapshotPath = join(repoRoot, 'packages/oxlint-config/rules.snapshot.json');
const oxlintBin = join(repoRoot, 'node_modules/.bin/oxlint');
const oxfmtBin = join(repoRoot, 'node_modules/.bin/oxfmt');
const isUpdate = process.argv.includes('--update');

const sortObject = object => Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)));

// `allow` and `off` rules are not enforced, so they carry no behaviour worth pinning.
const enforcedRules = (rules = {}) =>
  sortObject(
    Object.fromEntries(Object.entries(rules).filter(([, value]) => !['allow', 'off'].includes(severityOf(value)))),
  );

const severityOf = value => (Array.isArray(value) ? value[0] : value);

// JS plugin entries resolve to absolute paths on this machine; keep only what the preset names.
const jsPluginNames = entries => (entries ?? []).map(entry => (typeof entry === 'string' ? entry : entry.name)).sort();

const resolvePreset = (name, workDir) => {
  const configPath = join(workDir, `${name}.config.mjs`);

  writeFileSync(
    configPath,
    `import { ${name} } from ${JSON.stringify(pathToFileURL(distEntry).href)};\n\nexport default { extends: [${name}] };\n`,
  );

  const printed = JSON.parse(
    execFileSync(oxlintBin, ['-c', configPath, '--print-config'], { cwd: workDir, encoding: 'utf8' }),
  );

  return {
    plugins: [...(printed.plugins ?? [])].sort(),
    jsPlugins: jsPluginNames(printed.jsPlugins),
    rules: enforcedRules(printed.rules),
    overrides: (printed.overrides ?? []).map(override => ({
      files: override.files,
      ...(override.excludeFiles ? { excludeFiles: override.excludeFiles } : {}),
      rules: enforcedRules(override.rules),
    })),
  };
};

const recordLayer = layer => ({ jsPlugins: jsPluginNames(layer.jsPlugins), rules: enforcedRules(layer.rules) });

const { config } = await import(pathToFileURL(distEntry).href);
const workDir = mkdtempSync(join(tmpdir(), 'oxlint-rules-'));
const current = {};

try {
  for (const name of Object.keys(config.configs).sort()) {
    const preset = config.configs[name];

    current[name] = preset.jsPlugins?.length ? recordLayer(preset) : resolvePreset(name, workDir);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

const serialized = `${JSON.stringify(current, null, 2)}\n`;

if (isUpdate) {
  writeFileSync(snapshotPath, serialized);
  // Written through the repo formatter so the committed file passes format:check; the check below compares parsed
  // JSON, so formatting never affects it.
  execFileSync(oxfmtBin, [snapshotPath], { cwd: repoRoot });
  console.warn(`Wrote ${snapshotPath}`);
  process.exit(0);
}

let previous;

try {
  previous = JSON.parse(readFileSync(snapshotPath, 'utf8'));
} catch {
  console.error(`No snapshot at ${snapshotPath}. Run \`pnpm rules:update\` to create it.`);
  process.exit(1);
}

if (JSON.stringify(previous) === JSON.stringify(current)) process.exit(0);

// Summarise per preset so the failure says what moved, not just that something did.
for (const name of new Set([...Object.keys(previous), ...Object.keys(current)])) {
  const before = previous[name]?.rules ?? {};
  const after = current[name]?.rules ?? {};
  const added = Object.keys(after).filter(rule => !(rule in before));
  const removed = Object.keys(before).filter(rule => !(rule in after));
  const changed = Object.keys(after).filter(
    rule => rule in before && JSON.stringify(before[rule]) !== JSON.stringify(after[rule]),
  );
  const otherChanged =
    JSON.stringify({ ...previous[name], rules: undefined }) !== JSON.stringify({ ...current[name], rules: undefined });

  if (added.length + removed.length + changed.length === 0 && !otherChanged) continue;

  console.error(`\n${name}:`);
  for (const rule of added) console.error(`  + ${rule} ${JSON.stringify(after[rule])}`);
  for (const rule of removed) console.error(`  - ${rule}`);
  for (const rule of changed) {
    console.error(`  ~ ${rule} ${JSON.stringify(before[rule])} -> ${JSON.stringify(after[rule])}`);
  }
  if (otherChanged) console.error('  ~ plugins, jsPlugins, or overrides changed');
}

console.error(
  '\nThe presets resolve to a different rule set than packages/oxlint-config/rules.snapshot.json.' +
    '\nIf a new rule should not be on, set it explicitly in the preset. Otherwise run `pnpm rules:update`,' +
    '\nand give consumers a changeset that says what now fires.',
);
process.exit(1);
