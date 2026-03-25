# Event Delivery — `io.oap.agents.events`

**Version:** 2025-07-01

Events are immutable observed facts. They are the **input** to agents.

## Event Shape

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | string | yes | Event type identifier |
| `data` | object | yes | The event payload (domain-specific) |
| `metadata` | object (string→string) | yes | Key-value metadata |

Events are:
- **Immutable** — once produced, they cannot be changed
- **Externally produced** — agents receive events, they don't create them
- **Semantically opaque** — the protocol does not interpret `data`

### Example

```json
{
  "type": "ContractProposed",
  "data": { "salary": 95000, "startDate": "2025-09-01", "benefits": ["health", "dental"] },
  "metadata": { "correlationId": "abc-123", "source": "hr-system", "timestamp": "2025-07-01T10:30:00Z" }
}
```

## REST API

| Method | Path | Description |
|---|---|---|
| POST | `/events` | Send an event to the runtime |
| GET | `/events` | List recent events (optional `?type=` filter) |

### POST /events

Response: `202 Accepted` — the runtime routes the event to matching agents asynchronously.

## Schema

See [events.json](../../protocol/v1/schemas/agents/events.json).
