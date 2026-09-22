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

### 7. Migrate pocket-haven to the oxc toolchain (2026-09-22)

The end-to-end dogfood for the mobile presets: replace eslint-config-expo + prettier in pocket-haven with
@jabworks/oxlint-config (RN preset) + @jabworks/oxfmt-config once the preset ships. Belongs in pocket-haven's own docket
when started. It is noted here because it is the acceptance test for the RN preset items.

### 8. Non-oxc dependency follow-ups from Dependabot #58 (2026-09-22)

Held out of the oxc bump on purpose: tsdown 0.22 → 0.23, turbo 2.9 → 2.11, @changesets/cli 2 → 3 and changelog-github
0 → 1 (majors), pnpm 11 → 12.5, react 19.3, next 16.3. TypeScript 7 is still blocked: typescript-eslint peers typescript <6.1, and the Next 16.2 build
uses the TS JS API. #58 fails CI as a bundle, so split it rather than merging it whole.

## Loose threads

- `oxlint --rules` prints nothing, but `oxlint --rules --format=json` works (870 rules on 1.85, with scope, category and
  type_aware). That could bring back a cheap version-to-version rule diff next to the load-a-config drop-list check the
  README documents.
- `typescript/no-deprecated` (type-aware) exists in 1.85 as a possible stand-in for the dropped `import/no-deprecated`,
  though only under `--type-aware`.
