# STYLE-GUIDE DOCKET

**Open items only.** Closed items move to `archive/<year>.md` with their
verification records. The id space is shared across open and archive and ids
are never reused — a "#N" in a commit subject refers to these numbers (this
docket is the tracker). When an item ships: stamp it ✅ with the date and
verification status, then move the entry to the archive in the same action.
Stale open markers cost real sessions — closing means moving.

## Committed

## Someday

### 6. Evaluate RN/Expo rules via oxlint jsPlugins (2026-09-22)

oxlint `jsPlugins` can run ESLint plugins (alpha, not semver). Candidates: `oxlint-plugin-react-native` 0.2.35 and
`eslint-plugin-react-native` 5.0.0 (no-unused-styles, no-inline-styles, no-color-literals, split-platform-components,
no-raw-text), and eslint-plugin-expo from eslint-config-expo (no-dynamic-env-var, no-env-var-destructuring). Measure the
speed cost against the native rules before shipping anything in a preset. Alpha status argues for README-documented
opt-in over a default.

#### Status 2026-09-23 — jsPlugins proven on a real plugin, with one sharp edge

The pocket-haven migration (#7) runs `eslint-plugin-i18next`'s `no-literal-string` through `jsPlugins` on oxlint 1.85,
with its full options. Probed both ways: copy is flagged, and numbers, emoji, separators, and value props are not.

- **Options are serialized as JSON.** A RegExp option (`/^\p{Emoji}+$/u`) arrives as `{}`, and the plugin threw on every
  file. Write regex options as strings. Plugins that compile strings without the `u` flag cannot take `\p{…}` classes;
  use explicit ranges instead.
- `eslint-disable` comments that name `react-hooks/…` rules are honoured for oxlint's `react/…` equivalents.

### 7. Migrate pocket-haven to the oxc toolchain (2026-09-22)

The end-to-end dogfood for the mobile presets: replace eslint-config-expo + prettier in pocket-haven with
@jabworks/oxlint-config (RN preset) + @jabworks/oxfmt-config once the preset ships. Belongs in pocket-haven's own docket
when started. It is noted here because it is the acceptance test for the RN preset items.

#### Status 2026-09-23 — done on a pocket-haven branch, awaiting merge there

After releasing oxlint-config 0.4.0 and oxfmt-config 0.2.1: pocket-haven branch `chore/oxc-toolchain` (worktree
`../pocket-haven-oxc`, cut from `feat/mvp-loop` at 61faa59), 4 commits, all four gates green (types, lint with
`--type-aware --deny-warnings`, format, 241 tests). `reactNative` + `imperativeRenderOverride` covered the route and
scene cases with no project-level rule changes. What the dogfood surfaced for this repo:

- oxlint's `no-restricted-imports` `group` patterns are not ESLint's: `@react-three/*` does not match
  `@react-three/fiber/native`; `@react-three/**` does. Worth a README note wherever the presets suggest the rule.
- Type-aware lint found a real bug there (an un-awaited `File.copy()` that hid failures) on its first run.
- The `consistent-type-imports` autofix contradicted a code comment. tsc proved the comment stale, not the fix.

Close when the branch lands in pocket-haven.

#### Status 2026-09-24 — refreshed onto 18 newer pocket-haven commits

The branch was stale: `feat/mvp-loop` had gained the free-building and scene-motion work. I dropped the style commit,
rebased the other three onto `b317495` (one conflict in room-fill.test, where upstream had added
`structure`/`getPiece`), and regenerated the style commit. The new code produced 4 findings, one of them a real test
smell: a bare numeric `.sort()`, which compares as strings. It is now 5 commits, all gates green (339 tests), still a
fast-forward. The regenerated format showed the union-break difference also applies to object-type unions; the
oxfmt-config README is corrected.

### 8. Non-oxc dependency follow-ups from Dependabot #58 (2026-09-22)

Held out of the oxc bump on purpose: tsdown 0.22 → 0.23, turbo 2.9 → 2.11, @changesets/cli 2 → 3 and changelog-github
0 → 1 (majors), pnpm 11 → 12.5, react 19.3, next 16.3. TypeScript 7 is still blocked: typescript-eslint peers typescript <6.1, and the Next 16.2 build
uses the TS JS API. #58 fails CI as a bundle, so split it rather than merging it whole.

#### Status 2026-09-24 — Dependabot #62 (successor to #58) split into groups; A and D shipped

- **A, build tooling** (PR #70): turbo 2.11, tsdown 0.23, rolldown 1.2.9, @types/node 26. Every published build was
  compared before and after, and consumers see no change. PR #72 renamed the tsdown configs to `.mts` to silence the
  ESM warning.
- **D, framework** (PR #71): next 16.3.6 and react 19.3 in the demo apps. Both build on Turbopack.
- **Open:** B (changesets 3 and changelog-github 1, the release pipeline; dry-run `changeset version` first), C (vitest
  5, jsdom 30; overlaps #11), E (the ESLint/Prettier side: typescript-eslint 8.70, unicorn 66 → 76, simple-import-sort
  14; on hold while the focus is oxc), F (TypeScript 7, still blocked). pnpm 12 is not in Dependabot's scope. The Next
  side of the TS 7 blocker (`experimental.useTypeScriptCli`, previously only in 16.3 previews) should be re-checked
  against 16.3.6 stable before the next TS 7 attempt.

#### Status 2026-09-24 — group C shipped with #11

- **C, test harness** (PR #74): vitest 5.0.1 cluster, jsdom 30, playwright 1.63, vite 8.3, plugin-react 6.1,
  vitest-browser-react 2.3. The browser suite and a coverage run pass, with no config changes.
- Dependabot closed #62 and opened #73 in its place. Once it rebases, what remains is B (changesets 3), E (the
  ESLint/Prettier side, on hold), and F (TypeScript 7, blocked).

## Loose threads

- `oxlint --rules` prints nothing, but `oxlint --rules --format=json` works (870 rules on 1.85, with scope, category and
  type_aware). That could bring back a cheap version-to-version rule diff next to the load-a-config drop-list check the
  README documents.
- `typescript/no-deprecated` (type-aware) exists in 1.85 as a possible stand-in for the dropped `import/no-deprecated`,
  though only under `--type-aware`.
