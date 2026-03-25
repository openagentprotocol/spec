<script>
	let { children } = $props();
</script>

<div class="max-w-4xl mx-auto px-6 py-16">
	<div class="prose prose-invert max-w-none">
		{@render children()}
	</div>
</div>
