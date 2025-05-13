<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import FlashingText from '$lib/components/FlashingText.svelte';

	export let slice: Content.TextSectionSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="--section-margin: {slice.primary.slice_margin_bottom}rem"
	class="text-section"
>
	<FlashingText
		tag={slice.primary.title[0]?.type}
		--margin="0 0 {slice.primary.title_margin_bottom}rem 0"
		content={slice.primary.title}
		flashInterval={slice.primary.flash_interval}
		flashDuration={slice.primary.flash_duration}
		glitchInterval={slice.primary.glitch_interval}
		glitchDuration={slice.primary.glitch_duration}
	/>
	{#if slice.primary.paragraph}
		<PrismicRichText field={slice.primary.paragraph} />
	{/if}
</section>

<style>
	.text-section {
		margin: 0 0 var(--section-margin, 0) 0;
	}
</style>
