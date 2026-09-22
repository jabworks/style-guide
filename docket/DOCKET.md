# STYLE-GUIDE DOCKET

**Open items only.** Closed items move to `archive/<year>.md` with their
verification records. The id space is shared across open and archive and ids
are never reused — a "#N" in a commit subject refers to these numbers (this
docket is the tracker). When an item ships: stamp it ✅ with the date and
verification status, then move the entry to the archive in the same action.
Stale open markers cost real sessions — closing means moving.

## Committed

### 3. Add a react-native (Expo) preset to oxlint-config (2026-09-22)

Driven by pocket-haven (Expo 57, RN 0.86, expo-router, R3F/three.js), which today lints with eslint-config-expo. The
`react` preset is web-shaped, and each of these is wrong on RN:

- `env.browser: true` accepts `window`/`document`. oxlint 1.85 has no react-native env (only
  browser/node/serviceworker/shared-node-browser/worker), so use `shared-node-browser` plus `globals: { __DEV__: 'readonly' }`.
- The `jsx-a11y` plugin and `react/button-has-type`/`react/jsx-no-target-blank` target the DOM. Drop them from the RN preset.
- The expo-router `app/**` directory needs `import/no-default-export` off (plus `import/prefer-default-export`, as `next` does).
  Check that `unicorn/filename-case` kebabCase accepts `_layout.tsx`, `[id].tsx`, `+not-found.tsx`, `(tabs)/`.
- Ignore patterns: `.expo/**`, `android/**`, `ios/**`, `expo-env.d.ts`, `metro.config.js`, `app.config.ts`.
- Consider the `react-perf` plugin (4 rules). Inline objects/functions in props hurt RN lists.

Extend `react` via mergeConfigs; export as `reactNative` (name TBD). Dogfood with a fixture before publishing.

### 4. Imperative-renderer override for R3F / three.js files (2026-09-22)

pocket-haven's eslint config turns off `react-hooks/refs`, `react-hooks/preserve-manual-memoization` and
`react/no-unknown-property` inside `src/scene/**`. The scene drives three.js objects through refs from gesture callbacks,
and the React Compiler is disabled in app.json. With the compiler rules now ported (#1), R3F users
hit the same false positives in oxlint. Decide between a composable exported override (like `vitestOverride`, taking a
files glob) and README guidance. The scene-boundary `no-restricted-imports` stays project-level, not preset.

### 5. oxfmt-config fit for React Native projects (2026-09-22)

The oxfmt side is mostly already right: pocket-haven's prettier config uses the same option values as the house settings.
Open points: `sortTailwindcss: true` is a no-op without Tailwind (check that it is harmless, or relevant with NativeWind);
default ignores for `android/`, `ios/`, `.expo/`; and whether oxfmt 0.70's new `experimentalOperatorPosition` matters.
Verify by formatting pocket-haven's src with oxfmt and diffing against prettier output (read-only there).

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
