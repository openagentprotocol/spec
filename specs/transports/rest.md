# REST Transport

**Version:** 2025-07-01

REST is the primary transport for web-based consumers including the OAP web UI. The full REST API is defined by the OpenAPI schemas referenced in each service's `rest.schema` URL.

## Content Type

All requests and responses use `application/json`.

## Error Responses

All endpoints use standard HTTP status codes with a consistent error body:

```json
{
  "error": {
    "code": "AGENT_NOT_FOUND",
    "message": "Agent 'negotiation' is not registered",
    "details": {}
  }
}
```

| Status | When |
|---|---|
| 200 | Success with body |
| 201 | Created (agent registration) |
| 202 | Accepted (async processing, e.g. event delivery) |
| 204 | Success with no body (pause, resume, delete) |
| 400 | Invalid request body (schema validation failure) |
| 404 | Resource not found (agent, trace) |
| 409 | Conflict (agent already registered) |
| 422 | Semantic error (capability not supported) |
| 500 | Internal runtime error |

## OpenAPI Specs

- [Agent Service OpenAPI](../../protocol/v1/services/agents/openapi.json)
- [Observability Service OpenAPI](../../protocol/v1/services/observability/openapi.json)
