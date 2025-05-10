<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { ContentRelationshipField, KeyTextField } from '@prismicio/client';

	interface Props {
		disabled?: boolean;
		firstHalf?: string | KeyTextField;
		secondHalf?: string | KeyTextField;
		specialChar?: string | KeyTextField;
		route: ContentRelationshipField;
	}

	let {
		disabled = false,
		firstHalf = '',
		secondHalf = '',
		specialChar = '',
		route
	}: Props = $props();

	let isHovered = $state(false);
</script>

<PrismicLink field={route}>
	<button
		{disabled}
		onmouseenter={() => !disabled && (isHovered = true)}
		onmouseleave={() => !disabled && (isHovered = false)}
		class:disabled
	>
		{firstHalf} <span>{specialChar}</span>{secondHalf}
		{#if isHovered}
			<span>→</span>
		{/if}
	</button>
</PrismicLink>

<style>
	button,
	span {
		font-weight: 300;
		font-size: 1.4rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0;
		word-break: keep-all;
		white-space: normal;
		hyphens: manual;
	}

	button {
		font-family: 'Inter';
		background-color: #000000;
		padding: 0.8em 0.5em;
		cursor: pointer;
		border: none;
		justify-content: center;
	}

	button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	span {
		font-family: 'Inknut Antiqua';
	}

	@media (max-width: 768px) {
		button,
		span {
			font-size: 1rem;
		}
	}
</style>
