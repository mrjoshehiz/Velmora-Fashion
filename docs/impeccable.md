# Impeccable for Velmora

The official Codex skill payload from https://github.com/pbakaus/impeccable is vendored in `.agents/skills/impeccable/`, including its launcher, command references and Apache 2.0 license. It is development tooling, not a storefront runtime dependency. The design pass follows its distill and craft-floor guidance.

The launcher pins engine 0.1.11. The engine is installed in the local versioned cache and `impeccable context` runs successfully. Detection is run manually; no automatic hook manifest is installed.

To refresh the installed skill in another checkout:

```sh
npx impeccable install --providers=codex --scope=project
```

Reload Codex to discover the skill. If you choose to install the optional hook, open `/hooks` and approve it as required by Codex. Then use `$impeccable critique`, `$impeccable distill`, or `$impeccable polish` for subsequent design work.

Source: https://impeccable.style and the upstream repository. The upstream license is retained in the skill directory.
