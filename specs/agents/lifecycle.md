# Agent Lifecycle — `io.oap.agents.lifecycle`

**Version:** 2025-07-01  
**Extends:** `io.oap.agents.registry`

The lifecycle capability adds pause and resume operations to the agent registry.

## REST API

| Method | Path | Description |
|---|---|---|
| POST | `/agents/{id}/pause` | Pause a running agent |
| POST | `/agents/{id}/resume` | Resume a paused agent |

Both return `204 No Content` on success.

## Schema

See [lifecycle.json](../../protocol/v1/schemas/agents/lifecycle.json).
