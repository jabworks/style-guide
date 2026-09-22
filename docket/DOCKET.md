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

#### Status 2026-09-22 — sized against pocket-haven with the new `reactNative` preset

With `reactNative` (#3), pocket-haven's scene code produces 4 × `react/refs` in `src/scene/placed-items.tsx`, and nothing
from `preserve-manual-memoization`. `react/no-unknown-property` is in oxlint's `restriction` category and is not enabled,
so R3F's JSX props (`args`, `castShadow`) already pass. The override needs only `refs` and
`preserve-manual-memoization`.

### 5. oxfmt-config fit for React Native projects (2026-09-22)

The oxfmt side is mostly already right: pocket-haven's prettier config uses the same option values as the house settings.
Open points: `sortTailwindcss: true` is a no-op without Tailwind (check that it is harmless, or relevant with NativeWind);
default ignores for `android/`, `ios/`, `.expo/`; and whether oxfmt 0.70's new `experimentalOperatorPosition` matters.
Verify by formatting pocket-haven's src with oxfmt and diffing against prettier output (read-only there).

### 9. Presets lose env, globals, and ignorePatterns through extends (2026-09-22)

Found while building #3 (2026-09-22) and verified on oxlint 1.85. `defineConfig({ extends: [preset] })` keeps the
preset's `rules`, `categories`, and `overrides`, but drops its top-level `env`, `globals`, and `ignorePatterns`. oxlint's
own docs only say configs are "merged from the first to the last", so this behavior is undocumented.

Presets affected today, all used through `extends` as the README shows:

- `base`: `env.builtin`, and its `ignorePatterns` (dist/build/out/coverage, `*.config.{js,mjs,cjs}`).
- `react`: `env.browser`.
- `node`: `env.node`.
- `next`: `.next/**`.

Practical impact is small today: `eslint/no-undef` is a nursery rule and off by default, and oxlint honors `.gitignore`.
But the README describes these settings as if they apply, and a consumer who enables `no-undef` gets false errors.

Fix pattern (already used in `reactNative`): move `env`/`globals` into a catch-all `overrides: [{ files: ['**/*'] }]`
entry. For `ignorePatterns`, either document spreading or `mergeConfigs` as the way to get them, or turn the
config-file ignores into an override that switches rules off. Also worth reporting upstream to oxc as a docs gap or bug.

### 10. oxlint react/purity flags impure calls inside event handlers (2026-09-22)

Found while building #3 (2026-09-22). oxlint 1.85 `react/purity` reports `Date.now()` in pocket-haven
`src/app/spike-notify.tsx`. The call is inside `scheduleTest`, an async press handler defined in the component body, not
during render. eslint-plugin-react-hooks 7.1.1, run on the same file with `react-hooks/purity` at error, reports nothing,
so this is a false positive in oxlint's port.

Also seen: `react/set-state-in-effect` flags a `setFailures` call in a `catch` block inside an effect
(`src/app/dev-thumbnails.tsx`) that react-hooks passes. That one is arguable, since the setState does run synchronously
in the effect.

Since #60 the `react`, `next`, and `reactNative` presets hold `purity` at error for parity. Options: keep parity and
report upstream, or drop `purity` to warn in the oxlint presets with a comment citing this item. Decide after checking
oxc's issue tracker; the repro is small (a component with an async handler that calls `Date.now()`).

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
