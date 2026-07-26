#!/usr/bin/env node
/**
 * Semver-verified dependency audit over pnpm-lock.yaml.
 *
 * Exists because `pnpm audit` is broken: the npm advisory endpoint returns
 * gzip without a `content-encoding` header, so pnpm's `JSON.parse` throws
 * `ERR_PNPM_AUDIT_BAD_RESPONSE` (pnpm/pnpm#13033). This reads the same bulk
 * endpoint and gunzips it manually.
 *
 * Every advisory range is checked against the installed version with semver,
 * so the output is what actually affects this repo rather than every advisory
 * ever filed against a package name.
 *
 * Usage: pnpm audit:deps [--json]
 * Exits 1 when anything is found, so it can gate CI.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

import semver from 'semver';

const ADVISORY_URL = 'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk';
const SEVERITY_ORDER = { critical: 0, high: 1, moderate: 2, low: 3 };

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const asJson = process.argv.includes('--json');

/** Parse `name@version` keys out of the lockfile's `packages:` section. */
const readLockfileGraph = () => {
  const lockfile = readFileSync(join(repoRoot, 'pnpm-lock.yaml'), 'utf8');
  const section = (lockfile.split(/\npackages:\n/)[1] ?? '').split(/\nsnapshots:\n/)[0];
  const entry = /^ {2}('?)((?:@[^/@\s]+\/)?[^@\s']+)@([^\s':()]+)\1:/gm;

  /** @type {Record<string, Set<string>>} */
  const graph = {};
  let match;
  while ((match = entry.exec(section)) !== null) {
    const [, , name, version] = match;
    graph[name] ??= new Set();
    graph[name].add(version);
  }
  return Object.fromEntries(Object.entries(graph).map(([name, set]) => [name, [...set]]));
};

const fetchAdvisories = async graph => {
  const response = await fetch(ADVISORY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'npm-command': 'audit' },
    body: JSON.stringify(graph),
  });
  if (!response.ok) throw new Error(`advisory endpoint returned ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  const isGzip = buffer[0] === 0x1f && buffer[1] === 0x8b;
  return JSON.parse(isGzip ? gunzipSync(buffer).toString('utf8') : buffer.toString('utf8'));
};

const main = async () => {
  const graph = readLockfileGraph();
  const advisories = await fetchAdvisories(graph);

  const findings = [];
  for (const [name, list] of Object.entries(advisories)) {
    for (const version of graph[name] ?? []) {
      const matched = list.filter(advisory => {
        try {
          return semver.satisfies(version, advisory.vulnerable_versions, {
            includePrerelease: true,
          });
        } catch {
          return false;
        }
      });
      if (matched.length > 0) findings.push({ name, version, advisories: matched });
    }
  }

  const worst = finding => Math.min(...finding.advisories.map(advisory => SEVERITY_ORDER[advisory.severity] ?? 9));
  findings.sort((a, b) => worst(a) - worst(b));

  if (asJson) {
    process.stdout.write(`${JSON.stringify(findings, null, 2)}\n`);
    process.exitCode = findings.length > 0 ? 1 : 0;
    return;
  }

  process.stdout.write(`Audited ${Object.keys(graph).length} packages from pnpm-lock.yaml\n`);
  if (findings.length === 0) {
    process.stdout.write('No known advisories.\n');
    return;
  }

  for (const { name, version, advisories: matched } of findings) {
    process.stdout.write(`\n${name}@${version}\n`);
    for (const advisory of matched) {
      process.stdout.write(`  [${advisory.severity}] ${advisory.title}\n`);
      process.stdout.write(`      vulnerable: ${advisory.vulnerable_versions}\n`);
      process.stdout.write(`      ${advisory.url}\n`);
    }
  }
  process.stdout.write(`\n${findings.length} vulnerable package(s).\n`);
  process.exitCode = 1;
};

await main();
