<script>
	const navItems = [
		{ label: 'Features', href: '/#features' },
		{ label: 'Docs', href: '/docs' },
		{ label: 'Playground', href: '/playground' }
	];
</script>

<nav class="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-border)]">
	<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
		<a href="/" class="text-lg font-bold tracking-tight">
			<span class="text-[var(--color-accent)]">OAP</span>
		</a>
		<div class="flex items-center gap-8">
			{#each navItems as item}
				<a href={item.href} class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
					{item.label}
				</a>
			{/each}
			<a
				href="https://github.com/openagentprotocol/oap"
				target="_blank"
				rel="noopener"
				class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
			>
				GitHub
			</a>
		</div>
	</div>
</nav>
