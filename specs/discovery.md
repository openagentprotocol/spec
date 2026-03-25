# Discovery — `/.well-known/oap`

**Version:** 2025-07-01

Every OAP-compliant endpoint exposes a standard discovery URL:

```
GET /.well-known/oap
Content-Type: application/json
```

This returns a JSON manifest describing the available agents, services, capabilities, and transport bindings. No prior configuration is needed — a consumer hits the URL and learns everything it needs to interact.

## Discovery Flow

1. Consumer hits `/.well-known/oap`
2. Reads the structured manifest
3. Discovers available agents, services, capabilities, and transport bindings
4. Starts interacting without any hard-coded integration

## Manifest Structure

```
/.well-known/oap                   → what can I do? (discovery)
/schemas/event.json                → what does an event look like? (contract)
/specs/agents/event-delivery       → how does event delivery work? (documentation)
```

## Manifest Root

```json
{
  "oap": {
    "version": "2025-07-01",
    "services": { ... },
    "capabilities": [ ... ],
    "agents": [ ... ]
  }
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `version` | string | yes | OAP spec version (date-based: `"YYYY-MM-DD"`) |
| `services` | object | yes | Service definitions with transport bindings |
| `capabilities` | array | yes | Supported capabilities with schema URLs |
| `agents` | array | no | Currently registered agents |

## Services

Services are top-level domains. Each service has its own version, spec URL, and transport bindings.

| Service | Namespace | Description |
|---|---|---|
| Agents | `io.oap.agents` | Agent management, event delivery, command observation |
| Observability | `io.oap.observability` | Execution traces and audit trail |

## Capabilities

Capabilities are composable building blocks within a service.

| Capability | Description | Extends |
|---|---|---|
| `io.oap.agents.registry` | Register, remove, list, get agents | — |
| `io.oap.agents.lifecycle` | Pause and resume agents | `agents.registry` |
| `io.oap.agents.events` | Send events, list recent events | — |
| `io.oap.agents.commands` | List produced commands | — |
| `io.oap.agents.memory` | View agent memory state | `agents.registry` |
| `io.oap.observability.tracing` | Execution traces | — |

An OAP endpoint **selectively exposes** only the capabilities it supports. Consumers discover what's available by reading the manifest.

## Transport Bindings

Each service declares how it can be reached:

```json
"rest": {
  "schema": "https://openagentprotocol.io/v1/services/agents/openapi.json",
  "endpoint": "http://localhost:5100/"
},
"mcp": {
  "transport": "stdio",
  "server": "oap-mcp"
},
"a2a": {
  "agent_card_url": "http://localhost:5100/.well-known/agent.json"
}
```

| Transport | Primary consumer | Protocol |
|---|---|---|
| **REST** | Web UIs, traditional services, monitoring tools | HTTP/JSON |
| **MCP** | LLM clients (ChatGPT, Copilot, Gemini, Claude) | JSON-RPC over stdio/SSE |
| **A2A** | Other agents (Google Agent-to-Agent protocol) | HTTP/JSON |
| **gRPC** | Internal native runtime (optional) | Protocol Buffers |

## Schema

See [discovery.json](../protocol/v1/schemas/discovery.json) for the full JSON Schema.

## Full Example

See [well-known-oap.json](../protocol/v1/examples/well-known-oap.json) for a complete manifest example.
