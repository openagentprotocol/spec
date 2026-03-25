<script>
	import Hero from '$lib/components/Hero.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>OAP — Open Agent Protocol</title>
</svelte:head>

<!-- Hero -->
<Hero />

<!-- Features -->
<section id="features" class="py-24 px-6">
	<div class="max-w-6xl mx-auto">
		<p class="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">Capabilities</p>
		<h2 class="text-3xl font-bold mb-4">Built for agent interoperability</h2>
		<p class="text-[var(--color-text-muted)] mb-16 max-w-2xl">
			OAP defines composable capabilities that any agent can expose and any consumer can discover — over REST, MCP, or A2A.
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<FeatureCard
				icon="📋"
				title="Agent Registry"
				description="Register, discover, and manage agents with a standard descriptor format."
			/>
			<FeatureCard
				icon="⚡"
				title="Event Delivery"
				description="Send immutable events to agents. The runtime routes them asynchronously."
			/>
			<FeatureCard
				icon="🎯"
				title="Command Log"
				description="Observe commands produced by agents — intents to change the system."
			/>
			<FeatureCard
				icon="🔍"
				title="Execution Traces"
				description="Full observability: what event went in, what commands came out, how long it took."
			/>
			<FeatureCard
				icon="🌐"
				title="Discovery"
				description="/.well-known/oap — any consumer hits one URL and learns everything."
			/>
			<FeatureCard
				icon="🔌"
				title="Transport Agnostic"
				description="REST for web UIs, MCP for LLMs, A2A for agent-to-agent coordination."
			/>
		</div>
	</div>
</section>

<!-- See it in action -->
<section id="example" class="py-24 px-6 bg-[var(--color-bg-secondary)]">
	<div class="max-w-6xl mx-auto">
		<p class="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">See it in action</p>
		<h2 class="text-3xl font-bold mb-4">Discovery manifest</h2>
		<p class="text-[var(--color-text-muted)] mb-10 max-w-2xl">
			Every OAP endpoint exposes a <code class="text-[var(--color-accent)]">/.well-known/oap</code> manifest. Consumers discover agents, capabilities, and transports in a single request.
		</p>
		<CodeBlock code={`{
  "oap": {
    "version": "2025-07-01",
    "services": {
      "io.oap.agents": {
        "version": "2025-07-01",
        "description": "Agent management, event delivery, command observation",
        "rest": {
          "schema": "https://openagentprotocol.io/v1/services/agents/openapi.json",
          "endpoint": "https://api.example.com/"
        }
      }
    },
    "capabilities": [
      {
        "name": "io.oap.agents.registry",
        "version": "2025-07-01",
        "description": "Register, remove, list agents",
        "spec": "https://openagentprotocol.io/specs/agents/registry",
        "schema": "https://openagentprotocol.io/v1/schemas/agents/registry.json"
      }
    ],
    "agents": [
      {
        "id": "negotiation",
        "name": "Contract Negotiation",
        "accepts": ["ContractProposed"],
        "produces": ["ProposeCounter", "AcceptContract"],
        "status": "running"
      }
    ]
  }
}`} />
	</div>
</section>

<!-- For whom -->
<section id="audience" class="py-24 px-6">
	<div class="max-w-6xl mx-auto">
		<p class="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">Designed for everyone</p>
		<h2 class="text-3xl font-bold mb-16">Who is OAP for?</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
				<h3 class="text-xl font-semibold mb-3">For Developers</h3>
				<p class="text-[var(--color-text-muted)]">Build the next generation of agents on an open foundation. JSON Schema definitions, OpenAPI specs, and transport bindings — everything you need to implement OAP.</p>
			</div>
			<div class="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
				<h3 class="text-xl font-semibold mb-3">For Businesses</h3>
				<p class="text-[var(--color-text-muted)]">Expose your services to any agent in the world. No bespoke integrations — just a manifest describing what you accept and produce.</p>
			</div>
			<div class="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
				<h3 class="text-xl font-semibold mb-3">For AI Platforms</h3>
				<p class="text-[var(--color-text-muted)]">Discover and interact with any OAP-compliant agent using MCP, A2A, or simple REST. Compatible with existing agent frameworks.</p>
			</div>
			<div class="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
				<h3 class="text-xl font-semibold mb-3">For IoT & Sensors</h3>
				<p class="text-[var(--color-text-muted)]">Even a temperature sensor can be an OAP agent — it produces events, exposes a descriptor, and any consumer can discover it.</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-24 px-6 bg-[var(--color-bg-secondary)]">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl font-bold mb-6">Get started today</h2>
		<p class="text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto">
			OAP is open-source under Apache 2.0. Explore the spec, read the schemas, and start building.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/docs" class="px-8 py-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold transition-colors">
				Read the docs
			</a>
			<a href="https://github.com/openagentprotocol/spec" target="_blank" rel="noopener" class="px-8 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text)] font-semibold transition-colors">
				View on GitHub
			</a>
		</div>
	</div>
</section>
