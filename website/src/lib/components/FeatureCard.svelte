<script>
	let { icon, title, description } = $props();
</script>

<div class="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)]/40 transition-colors">
	<div class="text-2xl mb-4">{icon}</div>
	<h3 class="text-lg font-semibold mb-2">{title}</h3>
	<p class="text-sm text-[var(--color-text-muted)] leading-relaxed">{description}</p>
</div>
