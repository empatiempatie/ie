<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';

	const { data } = $props();
</script>

<svelte:head>
	<title>i.e.,</title>
	<meta name="description" content="Cursed tech for mischievous togetherness" />
</svelte:head>

<SliceZone slices={data.page.data.slices} {components} />