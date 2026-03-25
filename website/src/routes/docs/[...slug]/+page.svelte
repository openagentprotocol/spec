<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} — OAP</title>
</svelte:head>

{@html data.html}
