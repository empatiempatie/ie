<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';

	export let data;
	const { page } = data;

	console.log('Page data:', page);
</script>

<SliceZone slices={data.page.data.slices} {components} />