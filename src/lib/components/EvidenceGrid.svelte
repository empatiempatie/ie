<script lang="ts">
	import { PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import type { GroupField, LinkField, RichTextField } from '@prismicio/client';

	interface Props {
		evidences: GroupField;
	}

	let { evidences = [] }: Props = $props();
</script>

<div class="evidence-grid">
	{#each evidences as item}
		<div class="evidence-item">
			<h3>
				<PrismicLink field={item.title as LinkField} class="glitch-link" />
			</h3>
			<PrismicRichText field={item.description as RichTextField} />
			<span class="status">{item.status}</span>
		</div>
	{/each}
</div>

<style>
	@keyframes microGlitch {
		0% {
			transform: translate(0);
		}
		25% {
			transform: translate(-1px, 0.5px);
		}
		50% {
			transform: translate(0.5px, -0.5px);
		}
		75% {
			transform: translate(-0.5px, 0);
		}
		100% {
			transform: translate(0);
		}
	}

	.evidence-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 5rem 1rem;
	}

	.evidence-item h3,
	.evidence-item :global(p) {
		margin: 0 0 0.8rem 0;
	}

	.evidence-item :global(span) {
		letter-spacing: -0.02em;
	}
	
	.evidence-item :global(a) {
		color: inherit;
		text-decoration: none;
		position: relative;
		display: inline-block;
		transition: color 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
	}

	.evidence-item :global(a:hover) {
		animation: microGlitch 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
		color: #e35b52;
	}

	.status {
		font-family: 'Inter';
		font-weight: 300;
		font-style: italic;
		font-size: 0.8rem;
		line-height: 1.3;
		color: #0b0b0b;
		cursor: default;
		user-select: none;
	}

	@media (max-width: 768px) {
		.evidence-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
