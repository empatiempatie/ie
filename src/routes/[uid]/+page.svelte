<script lang="ts">
	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';

	const { data } = $props();
</script>

<div class="evidence-page-wrapper">
	<SliceZone slices={data.page.data.slices} {components} />
</div>

<style>
	.evidence-page-wrapper :global(h2) {
		font-size: 1.4rem;
	}
</style>
