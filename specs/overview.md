# OAP Protocol Overview

**Version:** 2025-07-01

## What is OAP?

OAP (Open Agent Protocol) is an open protocol that standardises **agent interoperability** — how agents discover each other, exchange events and commands, and observe what happened, across distributed systems.

> OAP lets **anyone expose skills, services, or capabilities** to any agent — without building bespoke integrations.

## Who is OAP For

Anyone who has something to offer — a person, a business, a service, an AI agent, a sensor — can expose an OAP manifest describing what they accept and what they produce. Instead of (or alongside) building a website, they expose a `/.well-known/oap` endpoint that any agent in the world can discover and interact with.

| Who | Accepts (events) | Produces (commands) |
|---|---|---|
| Freelance translator | `TranslationRequested` | `TranslationCompleted` |
| Contract negotiator | `ContractProposed`, `CounterOfferReceived` | `ProposeCounter`, `AcceptContract` |
| IoT temperature sensor | — (pushes events) | `TemperatureReading` |
| Pricing engine | `DemandSignalReceived`, `CompetitorPriceChanged` | `AdjustPrice`, `FlagAnomaly` |
| Code reviewer | `PullRequestOpened` | `ReviewCompleted`, `RequestChanges` |
| Approval workflow | `ApprovalRequested` | `ApprovalGranted`, `ApprovalDenied` |

**OAP doesn't care how the agent works internally.** It only cares about the interaction surface: what events go in, what commands come out, and how to discover the agent.

## Design Principles

1. **Protocol-first** — define the spec before the implementation; derive code from the protocol, not the other way around
2. **Compose, don't invent** — build on existing standards (MCP, A2A, JSON Schema) rather than creating proprietary wire formats
3. **Discoverable by default** — every OAP endpoint exposes a `/.well-known/oap` manifest so consumers can dynamically discover capabilities
4. **Transport-agnostic** — the same agent semantics work over REST, MCP, A2A, or gRPC
5. **Modular capabilities** — implementers choose which capabilities to support; consumers discover what's available at runtime
6. **LLM-readable** — JSON Schema is the canonical format because LLMs can read, generate, and reason about JSON natively
7. **Implementation-agnostic** — OAP defines the interaction surface (events in, commands out); it never prescribes how an agent processes events internally

## Protocol Stack

```
Layer 4: OAP Agent Semantics
         Agent, Event, Command, Execution Trace
         Defined as JSON Schema

Layer 3: Agent Coordination
         A2A (Google Agent-to-Agent) for multi-agent collaboration

Layer 2: LLM / Tool Interface
         MCP (Model Context Protocol) for LLM access

Layer 1: Transport
         JSON-RPC over stdio/SSE | HTTP/REST | gRPC
```

## Core Primitives

| Primitive | Description |
|---|---|
| **Agent** | Something that accepts events and produces commands |
| **Event** | An immutable observed fact sent to an agent |
| **Command** | An intent produced by an agent (not executed by the agent) |
| **Execution Trace** | Observable record of what happened (input, output, duration, success) |

## Protocol Scope

### What OAP Owns

- Interaction primitives — Agent, Event, Command, Execution Trace
- Message shapes — JSON Schema definitions for every protocol message
- Discovery mechanism — `/.well-known/oap` manifest structure
- Service taxonomy — `io.oap.agents`, `io.oap.observability`
- Capability model — composable capabilities with extensions
- REST API surface — HTTP endpoints for agent management, event delivery, observability
- Transport bindings — how services map to REST, MCP, and A2A
- Conformance requirements — what it means to be OAP-compliant

### What OAP Does NOT Own

- Internal agent architecture (how an agent processes events)
- Internal memory model (how an agent stores state)
- Internal policies (how an agent filters events or arbitrates commands)
- Runtime implementation
- Event transport infrastructure (Kafka, RabbitMQ, EventStore)
- Domain models (what events and commands mean in a specific business)
- AI/LLM provider integration
- Actuator execution (what happens when a command is dispatched)

## Comparison to Google UCP

| | UCP (Google) | OAP |
|---|---|---|
| **Domain** | Commerce | Agent interoperability |
| **Discovery** | `/.well-known/ucp` | `/.well-known/oap` |
| **Canonical format** | JSON Schema | JSON Schema |
| **Transports** | REST, MCP, A2A | REST, MCP, A2A |
| **Namespace convention** | `dev.ucp.*` | `io.oap.*` |

## Versioning

OAP uses date-based versioning: `"2025-07-01"`. Consumers should ignore unknown fields (forward compatibility). Multiple versions can coexist in a manifest.

## Next Steps

- [Discovery](./discovery.md) — How agents are discovered
- [Agent Registry](./agents/registry.md) — How agents are registered and managed
- [Events](./agents/events.md) — How events are delivered
- [Commands](./agents/commands.md) — How commands are observed
- [Tracing](./observability/tracing.md) — How execution is traced
- [Transports](./transports/rest.md) — REST, MCP, and A2A bindings
- [Conformance](./conformance.md) — What it means to be OAP-compliant
