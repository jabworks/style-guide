import type { OxlintOverride } from '../types.js';

/**
 * Override for code that drives an imperative renderer (three.js / React
 * Three Fiber, Skia, expo-gl) from React components. Not a preset: pass the
 * globs where that code lives and add the result to your own `overrides`.
 *
 * Two React Compiler rules misfire on this style of code:
 *
 * - `react/refs` flags the "latest ref" pattern (`ref.current = value` during
 *   render), which frame loops rely on to read fresh props without
 *   re-subscribing every frame.
 * - `react/preserve-manual-memoization` only matters when the React Compiler
 *   runs, and apps with imperative scenes usually keep it off for them.
 */
export const imperativeRenderOverride = (files: string[]): OxlintOverride => ({
  files,
  rules: {
    'react/refs': 'off',
    'react/preserve-manual-memoization': 'off',
  },
});
