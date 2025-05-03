<script lang="ts">
	import type { GroupField, KeyTextField, RichTextField } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	interface Evidence {
		title: string | KeyTextField;
		description: RichTextField;
		status: string | KeyTextField;
	}

	let { evidences = [] }: { evidences?: Evidence[] | GroupField } = $props();
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<div class="evidence-grid">
	{#each evidences as item}
		<div class="evidence-item">
			<h3>{item.title}</h3>
			{#if mounted}
				<p>
					<PrismicRichText field={item.description as RichTextField} />
				</p>
			{:else}
				<p>Loading...</p>
			{/if}
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

	.evidence-item p {
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
