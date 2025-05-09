<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import FlashingText from '$lib/FlashingText.svelte';

	export let slice: Content.TextSectionSlice;

	console.log('Slice data:', slice);
	console.log('Slice primary data:', PrismicRichText);
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="--section-margin: {slice.primary.slice_margin_bottom}rem"
	class="text-section-container"
>
	<header>
		<FlashingText
			tag="h2"
			--margin="0 0 {slice.primary.title_margin_bottom}rem 0"
			content={slice.primary.title}
			flashInterval={slice.primary.flash_interval}
			flashDuration={slice.primary.flash_duration}
			glitchInterval={slice.primary.glitch_interval}
			glitchDuration={slice.primary.glitch_duration}
		/>
	</header>
	{#if slice.primary.paragraph}
		<PrismicRichText field={slice.primary.paragraph} />
	{/if}
</section>

<style>
	.text-section-container {
		margin: 0 0 var(--section-margin, 0) 0;
	}
</style>
