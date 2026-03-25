# Agent Registry — `io.oap.agents.registry`

**Version:** 2025-07-01

The agent registry capability provides CRUD operations for managing agents.

## Agent Descriptor

An **agent descriptor** is the identity card for an agent.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Globally unique agent identifier |
| `name` | string | yes | Human-readable name |
| `description` | string | no | What this agent does |
| `type` | string | no | Agent type classification |
| `accepts` | string[] | yes | Event types this agent accepts as input |
| `produces` | string[] | yes | Command types this agent can produce |
| `status` | string | yes | One of: `running`, `paused`, `stopped`, `error` |

### Example

```json
{
  "id": "negotiation",
  "name": "Contract Negotiation",
  "description": "Evaluates contract proposals and produces counter-offers",
  "type": "negotiator",
  "accepts": ["ContractProposed", "CounterOfferReceived", "TermsUpdated"],
  "produces": ["ProposeCounter", "AcceptContract", "RejectContract"],
  "status": "running"
}
```

## REST API

| Method | Path | Description |
|---|---|---|
| GET | `/agents` | List all registered agents |
| GET | `/agents/{id}` | Get agent detail |
| POST | `/agents` | Register a new agent |
| DELETE | `/agents/{id}` | Remove an agent |

### POST /agents

Request body is an agent descriptor without `status` (defaults to `stopped`).

Response: `201 Created` with the created agent descriptor.

### DELETE /agents/{id}

Response: `204 No Content`.

## Schema

See [registry.json](../../protocol/v1/schemas/agents/registry.json).
