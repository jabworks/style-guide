---
'@jabworks/oxlint-config': minor
---

Add `imperativeRenderOverride(files)` for code that drives an imperative renderer (three.js / React Three Fiber, Skia,
expo-gl) from React.

```ts
import { imperativeRenderOverride, reactNative } from '@jabworks/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [reactNative],
  overrides: [imperativeRenderOverride(['src/scene/**'])],
});
```

It returns an override that turns off `react/refs` and `react/preserve-manual-memoization` for the given globs.
`react/refs` flags the "latest ref" pattern (`ref.current = value` during render) that frame loops rely on, and
`preserve-manual-memoization` only matters under the React Compiler. On an Expo + R3F app it clears the 4 `react/refs`
hits in the scene directory, and the same pattern elsewhere is still flagged. It works in a root `overrides` array and
when composed through `mergeConfigs`.
