---
'@jabworks/oxlint-config': patch
---

Fix the `node` preset failing to parse: `no-process-exit` is registered under oxlint's `unicorn` plugin, not `node` — the preset previously made any consuming config error with "Rule 'no-process-exit' not found in plugin 'node'".
