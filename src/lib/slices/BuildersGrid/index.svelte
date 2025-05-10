<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.BuildersGridSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	style="
		--section-margin: {slice.primary.slice_margin_bottom}rem; 
		--title-margin: {slice.primary.title_margin_bottom}rem
	"
	class="builders-section"
>
	<PrismicRichText field={slice.primary.title} />
	<div class="builders-grid">
		{#each slice.primary.builders as item}
			<div class="builder-item">
				<p>
					{item.name}
				</p>
				<div class="links">
					<PrismicRichText field={item.links} />
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.builders-section {
		margin: 0 0 var(--section-margin, 0) 0;
	}

	.builders-section :global(h2), 
	.builders-section :global(h3) {
		margin: 0 0 var(--title-margin, 0) 0 !important;
	}

	.builders-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.builder-item {
		display: flex;
		flex-direction: column;
	}

	.links {
		cursor: default;
	}

	.links :global(p) {
		line-height: 1;
	}

	.links :global(a) {
		font-family: 'Inter';
		font-weight: 300;
		font-size: 0.9rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
		text-decoration: none;
		color: #0b0b0b;
		cursor: pointer;
	}

	@media (max-width: 576px) {
		.builders-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
