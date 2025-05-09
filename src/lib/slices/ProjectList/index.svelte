<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.ProjectListSlice;
</script>

<aside data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<h3>{slice.primary.title}</h3>
	<ul>
		{#each slice.primary.project_list as item}
			<li>
				<PrismicRichText field={item.project_type} />
			</li>
		{/each}
	</ul>
</aside>

<style>
	ul {
		list-style: none;
		margin: 0 0 3rem 0;
		padding: 0;
	}

	li {
		position: relative;
		padding-left: 1.24em;
	}

	li:before {
		content: '→ ';
		position: absolute;
		left: 0;
	}
</style>
