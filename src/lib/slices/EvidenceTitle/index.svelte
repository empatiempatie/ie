<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.EvidenceTitleSlice;
</script>

<span
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="evidence-title-container"
	style="
		--slice-margin-bottom: {slice.primary.slice_margin_bottom}rem; 
		--title-margin-bottom: {slice.primary.title_margin_bottom}rem;
	"
>
	<PrismicRichText field={slice.primary.evidence_title} />
	<PrismicRichText field={slice.primary.evidence_date} />
</span>

<style>
	.evidence-title-container {
		margin: 0 0 var(--slice-margin-bottom, 0) 0;
	}

	.evidence-title-container :global(h3) {
		font-size: 2.5rem;
		letter-spacing: -0.04em;
		margin: 0 0 var(--title-margin-bottom, 0) 0;
	}

	/* .evidence-title-container :global(p) {
		font-size: 1.6rem;
		font-weight: 300;
	} */
</style>
