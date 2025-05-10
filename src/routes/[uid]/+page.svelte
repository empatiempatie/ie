<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices'
	import { Body } from 'svelte-body';

	export let data;
	const { page } = data;

	console.log('Page data:', page);
</script>

<Body style="background-color: #ffffff" />
<div class="page-content">
	<SliceZone slices={data.page.data.slices} {components} />
</div>

<style>
	.page-content :global(h2) {
		font-size: 1.4rem;
	}
</style>
