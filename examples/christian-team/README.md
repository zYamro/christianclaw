# ChristianClaw — Christian-Values Multi-Agent Team

A ready-to-use OpenClaw agent team aligned with Christian values. Five agents
collaborate as one body, each with a virtue-shaped role, coordinated by the
**Shepherd**.

## The team

| Agent       | Role         | Verse                  | Responsibility                                  |
| ----------- | ------------ | ---------------------- | ----------------------------------------------- |
| 🛡️ Shepherd | Coordinator  | John 10:11             | Tends the team, guards values, delegates, replies |
| 🔍 Seeker   | Researcher   | Matthew 7:7            | Research, reading, fact-finding, verification   |
| 🔨 Craftsman| Builder      | Exodus 31:3            | Code, file ops, shell work, implementation      |
| ⚖️ Discerner| Reviewer     | 1 Thessalonians 5:21   | Review, tests, security, risk surfacing          |
| ✍️ Scribe   | Communicator | Ezra 7:10              | Docs, summaries, user-facing writing            |

The Shepherd runs with `subagents.delegationMode: "prefer"`, so it stays
responsive and delegates non-trivial work to the right specialist through
`sessions_spawn` with an explicit `agentId`. Specialists are leaves (sub-agent
spawn depth is 1 by default), keeping the team flat and predictable.

## Christian-values posture

Every agent inherits the Christian-values system prompt overlay and content
guardrails built into ChristianClaw (see
[`docs/start/christian-values`](../../docs/start/christian-values.md)). The
shared [`SOUL.md`](./SOUL.md) sets the team tone and roster the Shepherd reads
as project context.

## Setup

1. Install and onboard ChristianClaw once to configure a model provider and
   auth:

   ```sh
   openclaw onboard
   ```

2. Merge this team into your config. The agents block lives in
   [`openclaw.json`](./openclaw.json). Copy it into your active
   `~/.openclaw/openclaw.json` under the `agents` key, or load this whole file
   as a profile config.

3. Point the default agent workspace at your project so the Shepherd loads
   `SOUL.md` as persona context:

   ```sh
   openclaw config set agents.list[0].workspace "$(pwd)"
   ```

   Then place `SOUL.md` (and your project `AGENTS.md`, if any) at that
   workspace root.

4. Verify the roster is visible:

   ```sh
   openclaw config get agents.list
   ```

## Using the team

Ask the Shepherd anything. For larger work it will delegate, for example:

- "Research how X works and summarize it" → Shepherd spawns `seeker`.
- "Implement feature Y and review it" → Shepherd spawns `craftsman`, then
  `discerner`.
- "Write release notes for this change" → Shepherd spawns `scribe`.

You can also address a specialist directly through the Shepherd ("ask the
Discerner to review my change"). The Shepherd gives the final reply in its own
voice, integrating the specialists' reports.

## Customizing

- Add or remove agents in `openclaw.json` under `agents.list`.
- Allow cross-specialist collaboration by adding ids to a specialist's
  `subagents.allowAgents` and raising `agents.defaults.subagents.maxSpawnDepth`
  to 2 (use sparingly; flat teams are easier to reason about).
- Adjust the shared tone by editing `SOUL.md`. Per-agent personas can be added
  by giving an agent its own `workspace`/`agentDir` with its own `SOUL.md`.

This is a starting template, not doctrine. Adapt the roster to your
community's needs while keeping the values posture.
