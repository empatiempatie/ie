<script lang="ts">
	import { Body } from 'svelte-body';
	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';

	let { data } = $props();
</script>

<Body style="background-color: #fafafa" />

<div class="wrapper">
	<SliceZone slices={data.page.data.slices} {components} />
</div>

<style>
	.wrapper :global(h2) {
		font-size: 1.4rem;
	}
</style>
