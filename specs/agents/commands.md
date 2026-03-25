# Command Log — `io.oap.agents.commands`

**Version:** 2025-07-01

Agents **produce** commands but **do not execute** them. Commands are handled by external actuators, which then emit new events — closing the loop.

## Command Shape

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | string | yes | Command type identifier |
| `data` | object | yes | The command payload (domain-specific) |
| `metadata` | object (string→string) | yes | Key-value metadata |

### Example

```json
{
  "type": "ProposeCounter",
  "data": { "salary": 100000, "startDate": "2025-09-01" },
  "metadata": { "agentId": "negotiation", "traceId": "trace-001", "correlationId": "abc-123" }
}
```

## REST API

| Method | Path | Description |
|---|---|---|
| GET | `/commands` | List recently produced commands (optional `?type=` or `?agentId=` filter) |

## Schema

See [commands.json](../../protocol/v1/schemas/agents/commands.json).
