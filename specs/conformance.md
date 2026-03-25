# Conformance

**Version:** 2025-07-01

## Minimal OAP Compliance

A OAP-compliant endpoint **must**:

1. Expose `GET /.well-known/oap` returning a valid manifest
2. Include at least one service in the manifest
3. List all supported capabilities with valid schema URLs
4. Implement the REST API for every listed capability
5. Return valid JSON conforming to the referenced schemas
6. Use standard HTTP status codes and the OAP error response format

## Capability-Level Compliance

For each capability an endpoint claims to support:

| Capability | Required Endpoints |
|---|---|
| `agents.registry` | GET/POST /agents, GET/DELETE /agents/{id} |
| `agents.lifecycle` | POST /agents/{id}/pause, POST /agents/{id}/resume |
| `agents.events` | POST /events, GET /events |
| `agents.commands` | GET /commands |
| `agents.memory` | GET /agents/{id}/memory |
| `observability.tracing` | GET /traces, GET /traces/{traceId} |

## What Compliance Does NOT Require

- A specific programming language or framework
- A specific internal architecture
- A specific event transport (Kafka, RabbitMQ, etc.)
- MCP or A2A support (REST is the baseline)
- AI/LLM capabilities (agents can be purely deterministic, human-operated, or anything else)
