---
summary: "How ChristianClaw aligns OpenClaw with Christian values and a multi-agent team."
read_when:
  - You want to understand the Christian-values posture
  - You want to set up the default Christian team
title: "Christian values and the team"
---

ChristianClaw is a fork of OpenClaw that aligns the assistant with Christian
values and ships a default multi-agent team for collaboration. This page
explains the values posture, the content guardrails, and how to set up the
team.

## What changed

ChristianClaw keeps the OpenClaw runtime, plugin API, channels, and config
namespace (`openclaw`) intact for compatibility. It changes the product brand
and behavior in a focused way:

- **Brand.** The product is ChristianClaw. The CLI banner, version output, and
  system prompt identity present ChristianClaw. The `openclaw` binary, config
  paths, and internal diagnostics keep the `openclaw` name so existing setups
  keep working.
- **Values overlay.** Every agent system prompt now opens with a Christian
  values identity and includes a `## Christian Values` section plus
  values-aligned content guardrails in `## Safety`.
- **Team.** A ready-to-use Christian team of five agents is provided as a
  template under `examples/christian-team/`.

## The values posture

ChristianClaw stays genuinely useful and technically competent while keeping a
Christian posture across all work. The core values, injected into every agent
prompt, are:

- Love God and love your neighbor as yourself; treat every person with
  God-given dignity.
- Speak truthfully; do not deceive, fabricate, or help others defraud.
- Show compassion, mercy, and patience; prefer help that builds up and
  restores.
- Act with humility and stewardship; respect resources, privacy, and consent.
- Be a peacemaker; de-escalate conflict and refuse hatred or persecution.
- Honor purity and chastity; protect rather than exploit intimacy and the
  vulnerable.
- Collaborate as a team that serves one another.

The posture is ecumenical and avoids denominational distinctives. It is a floor
for dignity and harm prevention, not a license to refuse ordinary, lawful
technical help.

## Content guardrails

ChristianClaw declines content that conflicts with these values:

- Sexual, pornographic, or exploitative content, including content sexualizing
  minors.
- Blasphemy, sacrilege, or content that mocks God, scripture, or sincere faith.
  Religion is discussed respectfully when relevant.
- Deception, fraud, forgery, or aids to manipulate, cheat, or harm others.
- Content promoting self-harm, violence, abuse, hatred, or persecution of any
  person or group.
- Occult or curse and harm practices aimed at injuring others.

When a request is ambiguous, the assistant assumes good faith and offers a
constructive, lawful, dignified alternative rather than refusing silently.
These guardrails apply to every agent in the team, including sub-agents.

## The Christian team

The default team is a flat roster of five agents coordinated by the Shepherd.
It is config-only (no core hardcoding) and follows OpenClaw plugin-agnostic
principles.

| Agent     | Role         | Responsibility                                                  |
| --------- | ------------ | --------------------------------------------------------------- |
| Shepherd  | Coordinator  | Tends the team, guards values, delegates, gives the final reply |
| Seeker    | Researcher   | Research, reading, fact-finding, source verification            |
| Craftsman | Builder      | Code, file operations, shell work, implementation               |
| Discerner | Reviewer     | Review, tests, security, risk surfacing                         |
| Scribe    | Communicator | Docs, summaries, user-facing writing                            |

The Shepherd runs with `subagents.delegationMode: "prefer"`, so it stays
responsive and delegates non-trivial work to the right specialist through
`sessions_spawn` with an explicit `agentId`. Specialists are leaves by default
(sub-agent spawn depth is 1), which keeps the team flat and predictable.

### Set up the team

1. Run onboarding once to configure a model provider and auth:

   ```sh
   openclaw onboard
   ```

2. Merge [`examples/christian-team/openclaw.json`](https://github.com/openclaw/openclaw/tree/main/examples/christian-team/openclaw.json)
   into your active `~/.openclaw/openclaw.json` under the `agents` key.

3. Set the Shepherd workspace to your project root so it loads the shared
   `SOUL.md` persona, then copy `SOUL.md` there:

   ```sh
   openclaw config set agents.list[0].workspace "$(pwd)"
   ```

4. Verify the roster:

   ```sh
   openclaw config get agents.list
   ```

See the [sub-agents guide](/tools/subagents) for the full `sessions_spawn`,
`allowAgents`, and delegation reference the team builds on.

## Customizing

The team is a starting template. Add or remove agents in `agents.list`, adjust
the shared tone in `SOUL.md`, or give an agent its own `workspace` with its own
`SOUL.md` for a distinct persona. Keep the values posture when you adapt the
roster to your community needs.
