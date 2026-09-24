---
'@jabworks/oxfmt-config': patch
---

Correct the README's note on how oxfmt and Prettier break long unions. It applies to any union type, including unions of
object types, not only string-literal unions as 0.2.1 said. Found migrating a second batch of Expo app code.
