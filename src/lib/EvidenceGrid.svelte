<script lang="ts">
	import { PrismicRichText } from '@prismicio/svelte';
	import type { GroupField, KeyTextField, RichTextField } from '@prismicio/client';

	interface Evidence {
		title: string | KeyTextField;
		description: RichTextField;
		status: string | KeyTextField;
	}
	interface Props {
		evidences?: Evidence[] | GroupField;
	}

	let { evidences = [] }: Props = $props();
</script>

<div class="evidence-grid">
	{#each evidences as item}
		<div class="evidence-item">
			<h3>{item.title}</h3>
			<PrismicRichText field={item.description as RichTextField} />
			<span class="status">{item.status}</span>
		</div>
	{/each}
</div>

<style>
	.evidence-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 5rem 1rem;
	}

	.evidence-item h3 {
		margin: 0 0 1.5rem 0;
	}

	.evidence-item :global(p) {
		margin: 0 0 0.8rem 0;
	}

	.status {
		font-family: 'Inter';
		font-weight: 300;
		font-style: italic;
		/* font-size: 1.3rem; */
		font-size: 0.8rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
		color: #0b0b0b;
	}

	@media (max-width: 768px) {
		.evidence-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
