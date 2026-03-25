# OAP — Open Agent Protocol

An open standard for agent interoperability — how agents discover each other, exchange events and commands, and observe what happened, across distributed systems.

[Documentation](https://openagentprotocol.io/) | [Specification](specs/overview.md)

---

## Overview

OAP lets **anyone expose skills, services, or capabilities** to any agent — without building bespoke integrations.

OAP doesn't care how the agent works internally. It only cares about the interaction surface: what events go in, what commands come out, and how to discover the agent.

## Repository Structure

```
protocol/v1/           Protocol artifacts (source of truth)
├── schemas/            JSON Schema files for all capabilities
├── services/           OpenAPI specs for REST transport
└── examples/           Example manifests and payloads

specs/                  Human-readable specification (Markdown)
├── overview.md         Protocol overview
├── discovery.md        /.well-known/oap manifest
├── agents/             Agent capabilities (registry, lifecycle, events, commands, memory)
├── observability/      Tracing capability
├── transports/         REST, MCP, A2A transport bindings
├── versioning.md       Version strategy
└── conformance.md      Compliance requirements

website/                Public website (SvelteKit, dark theme)
├── src/routes/         Pages (landing, docs, playground)
└── src/lib/components/ Reusable UI components

scripts/                Validation tooling
```

## Core Concepts

| Primitive | Description |
|---|---|
| **Agent** | Something that accepts events and produces commands |
| **Event** | An immutable observed fact sent to an agent |
| **Command** | An intent produced by an agent (not executed by it) |
| **Execution Trace** | Observable record of what happened |
| **Discovery** | `/.well-known/oap` manifest |

## Quick Start

```bash
# Validate protocol schemas
node scripts/validate-schemas.mjs

# Validate example payloads
node scripts/validate-examples.mjs

# Run the website
cd website && npm install && npm run dev
```

## License

[Apache-2.0](LICENSE)
