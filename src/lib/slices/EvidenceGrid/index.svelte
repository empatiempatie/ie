<script lang="ts">
	import type { Content } from '@prismicio/client';
	import FlashingText from '$lib/FlashingText.svelte';
	import EvidenceGrid from '$lib/EvidenceGrid.svelte';

	export let slice: Content.EvidenceGridSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="--section-margin: {slice.primary.slice_margin_bottom}rem"
	class="evidence-section"
>
	<FlashingText
		tag="h2"
		--margin="0 0 {slice.primary.title_margin_bottom}rem 0"
		content={slice.primary.title}
		flashInterval={slice.primary.flash_interval}
		flashDuration={slice.primary.flash_duration}
		glitchInterval={slice.primary.glitch_interval}
		glitchDuration={slice.primary.glitch_duration}
	/>
	<EvidenceGrid evidences={slice.primary.evidences} />
</section>

<style>
	.evidence-section {
		margin: 0 0 var(--section-margin, 0) 0;
	}
</style>
