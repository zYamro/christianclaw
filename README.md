# 🕊️ ChristianClaw

**A Christian-values multi-agent team — a fork of [OpenClaw](https://github.com/openclaw/openclaw).**

<p align="center"><strong>Serve one another in love. — Galatians 5:13</strong></p>

<p align="center">
  <a href="https://github.com/zYamro/christianclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/zYamro/christianclaw/ci.yml?branch=main&style=for-the-badge" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/fork%20of-OpenClaw-8A2BE2?style=for-the-badge" alt="Fork of OpenClaw">
</p>

> **Fork notice.** ChristianClaw is an independent community fork of [OpenClaw](https://github.com/openclaw/openclaw). It is not affiliated with, endorsed by, or sponsored by the OpenClaw project or its sponsors. The `openclaw` CLI, config paths, and plugin namespace are retained for runtime compatibility; the product brand and behavior are ChristianClaw.

ChristianClaw runs on your own devices and answers you on the channels you already use — with a **team of agents that serve one another in love**. Every agent shares a Christian-values posture (love, truth, grace, humility, stewardship) with content guardrails, and the default team coordinates a **Shepherd** with specialist agents for research, building, review, and writing.

It inherits OpenClaw's full multi-channel AI gateway: WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Microsoft Teams, Matrix, and more; voice on macOS/iOS/Android; a live Canvas; and a local-first Gateway.

## What this fork changes

ChristianClaw keeps the OpenClaw runtime, plugin API, channels, and config namespace intact. It adds:

- **Christian-values system prompt overlay** — every agent prompt opens with a ChristianClaw identity and a `## Christian Values` section plus values-aligned content guardrails (`src/agents/christian-values.ts`).
- **Default Christian team** — a flat, ready-to-use team of five agents under [`examples/christian-team/`](examples/christian-team/).
- **ChristianClaw branding** — banner, version output, taglines (Colossians 3:23), and a `christianclaw` CLI alias.
- **Comprehensive CI** — a self-contained GitHub Actions workflow (install, typecheck, lint, build, full test suite) replacing the upstream Crabbox/Testbox-dependent workflows.

Full details: [Christian values and the team](docs/start/christian-values.md).

## The Christian team

| Agent | Role | Responsibility |
| --- | --- | --- |
| 🛡️ Shepherd | Coordinator | Tends the team, guards values, delegates, gives the final reply |
| 🔍 Seeker | Researcher | Research, reading, fact-finding, source verification |
| 🔨 Craftsman | Builder | Code, file operations, shell work, implementation |
| ⚖️ Discerner | Reviewer | Review, tests, security, risk surfacing |
| ✍️ Scribe | Communicator | Docs, summaries, user-facing writing |

The Shepherd runs with `subagents.delegationMode: "prefer"` and delegates non-trivial work to the right specialist via `sessions_spawn`. See the [team README](examples/christian-team/README.md).

## Install

Runtime: **Node 24 (recommended) or Node 22.19+**.

```bash
npm install -g openclaw@latest        # or: pnpm add -g openclaw@latest
openclaw onboard --install-daemon      # guided setup + Gateway daemon
```

> The npm package and binary stay `openclaw` for compatibility; `christianclaw` is also installed as a CLI alias.

## Quick start

```bash
openclaw onboard --install-daemon      # first run: configure model + channels
openclaw gateway status                # check the Gateway daemon

# Talk to the assistant
openclaw agent --message "Ship checklist" --thinking high
```

Foreground/debug mode:

```bash
openclaw gateway stop
openclaw gateway --port 18789 --verbose
```

To use the team, merge [`examples/christian-team/openclaw.json`](examples/christian-team/openclaw.json) into `~/.openclaw/openclaw.json` under `agents`, set the Shepherd workspace, and ask it anything — it will delegate across the team.

Upgrading? Run `openclaw doctor` and see the [updating guide](https://docs.openclaw.ai/install/updating).

## Highlights

- **Local-first Gateway** — single control plane for sessions, channels, tools, and events.
- **Multi-channel inbox** — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Teams, Matrix, Feishu, LINE, and more.
- **Multi-agent routing** — route channels/accounts/peers to isolated agents.
- **Voice + Canvas** — wake words and continuous voice on macOS/iOS/Android; an agent-driven Canvas.
- **First-class tools** — browser, canvas, nodes, cron, sessions, and sub-agents.
- **Companion apps** — Windows Hub, macOS menu bar, and iOS/Android nodes.

## Security

OpenClaw connects to real messaging surfaces; treat inbound DMs as **untrusted input**. Defaults pair unknown senders (`dmPolicy="pairing"`) and can sandbox non-`main` sessions. Before remote exposure, read the [Security](https://docs.openclaw.ai/gateway/security) and [Exposure runbook](https://docs.openclaw.ai/gateway/security/exposure-runbook) docs, and run `openclaw doctor`.

## Configuration

Minimal `~/.openclaw/openclaw.json`:

```json5
{
  agent: { model: "<provider>/<model-id>" },
  // add the Christian team:
  // agents: { ...see examples/christian-team/openclaw.json }
}
```

[Full configuration reference.](https://docs.openclaw.ai/gateway/configuration)

## From source (development)

Use `pnpm` (the repo is a pnpm workspace):

```bash
git clone https://github.com/zYamro/christianclaw.git
cd christianclaw
pnpm install
pnpm openclaw setup      # first run only
pnpm gateway:watch       # dev loop with auto-reload
```

Build a `dist/`:

```bash
pnpm build && pnpm ui:build
```

### CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on push/PR on Linux Node 24:

| Job | Command |
| --- | --- |
| Lint | `pnpm lint` (oxlint) |
| Typecheck | `pnpm tsgo` + `pnpm tsgo:test` |
| Build | `pnpm build` |
| Test | `pnpm test` (full Vitest suite) |

Lint, typecheck, and build are hard gates. The full test suite runs for comprehensive signal (non-blocking, since the upstream suite has a few env-specific tests designed for sharded Testbox runs).

## Docs

Runtime docs live at **[docs.openclaw.ai](https://docs.openclaw.ai)** and apply to ChristianClaw. Fork-specific docs:

- [Christian values and the team](docs/start/christian-values.md)
- [The Christian team template](examples/christian-team/README.md)
- [Vision](VISION.md)

## Acknowledgements

ChristianClaw builds on [**OpenClaw**](https://github.com/openclaw/openclaw) by Peter Steinberger and the OpenClaw community, licensed MIT. All credit for the runtime, plugin API, channels, and tooling belongs to the upstream project; ChristianClaw only adds the Christian-values layer, the default team, branding, and CI. See the upstream repository for its sponsors and contributors.

## License

[MIT](LICENSE) — same as OpenClaw.
