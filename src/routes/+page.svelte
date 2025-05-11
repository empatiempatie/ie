<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import { Body } from 'svelte-body';

	const { data } = $props();
</script>

<svelte:head>
	<title>i.e.,</title>
	<meta name="description" content="Cursed tech for mischievous togetherness" />
</svelte:head>

<Body style="background-color: #e35b52" />
<SliceZone slices={data.page.data.slices} {components} />