<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.ImageSectionSlice;
</script>

<aside
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="image-aside-container"
	style="--section-margin: {slice.primary.slice_margin_bottom}rem"
>
	<PrismicImage field={slice.primary.evidence_image} />
</aside>

<style>
	.image-aside-container {
		text-align: center;
		width: 100vw;
		margin: 0 0 var(--section-margin, 0) 0;
		padding: 0;
	}

	:global(.image-aside-container img) {
		max-width: 100%;
		height: auto;
	}

	@media (max-width: 768px) {
		.image-aside-container {
			width: 100%;
		}
	}
</style>
