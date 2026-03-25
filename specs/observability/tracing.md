# Execution Tracing — `io.oap.observability.tracing`

**Version:** 2025-07-01

An **execution trace** is the observable record of what happened when an agent processed an event. It captures the input, output, timing, and outcome — but NOT how the agent worked internally.

## Execution Trace Shape

| Field | Type | Required | Description |
|---|---|---|---|
| `traceId` | string | yes | Unique trace identifier |
| `agentId` | string | yes | Which agent processed the event |
| `inputEvent` | Event | yes | The event that triggered processing |
| `outputCommands` | Command[] | yes | Commands produced (may be empty) |
| `startedAt` | datetime | yes | ISO 8601 timestamp |
| `completedAt` | datetime | yes | ISO 8601 timestamp |
| `duration` | duration | yes | ISO 8601 duration |
| `succeeded` | boolean | yes | Whether processing completed without error |
| `error` | string | no | Error message if failed |
| `steps` | TraceStep[] | no | Optional named steps (implementation-specific) |

### TraceStep (optional)

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Step name |
| `duration` | duration | no | How long this step took |
| `succeeded` | boolean | no | Whether this step succeeded |
| `detail` | object | no | Opaque, implementation-specific detail |

### Example

```json
{
  "traceId": "trace-001",
  "agentId": "negotiation",
  "inputEvent": {
    "type": "ContractProposed",
    "data": { "salary": 95000 },
    "metadata": { "correlationId": "abc-123" }
  },
  "outputCommands": [
    {
      "type": "ProposeCounter",
      "data": { "salary": 100000 },
      "metadata": { "agentId": "negotiation", "traceId": "trace-001", "correlationId": "abc-123" }
    }
  ],
  "startedAt": "2025-07-01T10:30:00Z",
  "completedAt": "2025-07-01T10:30:01.234Z",
  "duration": "PT1.234S",
  "succeeded": true,
  "steps": [
    { "name": "salary-reasoning", "duration": "PT0.800S", "succeeded": true, "detail": { "note": "Proposed salary is 12% below market median" } },
    { "name": "start-date-validation", "duration": "PT0.050S", "succeeded": true }
  ]
}
```

## REST API

| Method | Path | Description |
|---|---|---|
| GET | `/traces` | List recent traces (optional `?agentId=` filter) |
| GET | `/traces/{traceId}` | Get a specific trace |
| GET | `/agents/{id}/traces` | List traces for an agent |
| GET | `/agents/{id}/traces/latest` | Get the latest trace for an agent |

## Schema

See [tracing.json](../../protocol/v1/schemas/observability/tracing.json).
