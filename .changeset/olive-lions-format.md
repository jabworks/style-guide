---
'@jabworks/oxfmt-config': minor
---

Enable `sortImports` so the oxlint+oxfmt toolchain sorts imports (oxlint has no `simple-import-sort` equivalent). Note the sort order differs from the ESLint toolchain's custom `simple-import-sort` groups. Also migrate to the non-deprecated `FormatConfig` type.
