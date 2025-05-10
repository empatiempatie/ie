<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.EvidenceTitleSlice;
</script>

<header
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="evidence-title-container"
	style="
		--slice-margin-bottom: {slice.primary.slice_margin_bottom}rem; 
		--title-margin-bottom: {slice.primary.title_margin_bottom}rem;
	"
>
	<div>
		<PrismicRichText field={slice.primary.evidence_title} />
	</div>
	<time><PrismicRichText field={slice.primary.evidence_date} /></time>
</header>

<style>
	.evidence-title-container {
		margin: 0 0 var(--slice-margin-bottom, 0) 0;
	}

	.evidence-title-container :global(h1) {
		margin: 0 0 var(--title-margin-bottom, 0) 0;
		font-style: italic;
		font-family: 'Inter';
		font-size: 2.5rem;
		font-weight: 400;
		line-height: 1;
		letter-spacing: -0.07em;
	}

	/* .evidence-date :global(p) {
		font-size: 1.6rem;
		font-weight: 300;
	} */
</style>
