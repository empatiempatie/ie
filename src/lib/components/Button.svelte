<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { ContentRelationshipField, KeyTextField } from '@prismicio/client';

	interface Props {
		disabled?: boolean;
		firstHalf?: string | KeyTextField;
		secondHalf?: string | KeyTextField;
		specialChar?: string | KeyTextField;
		route?: ContentRelationshipField;
		type?: 'button' | 'submit';
		onClick?: () => void;
	}

	let {
		disabled = false,
		firstHalf = '',
		secondHalf = '',
		specialChar = '',
		route,
		onClick,
		type = 'button'
	}: Props = $props();

	let isHovered = $state(false);

	function handleClick() {
		if (!disabled && onClick) {
			onClick();
		}
	}
</script>

{#if route}
	<PrismicLink field={route}>
		<button
			type="button"
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
{:else}
	<button
		{type}
		{disabled}
		onclick={handleClick}
		onmouseenter={() => !disabled && (isHovered = true)}
		onmouseleave={() => !disabled && (isHovered = false)}
		class:disabled
	>
		{firstHalf}<span>{specialChar}</span>{secondHalf}
		{#if isHovered}
			<span>→</span>
		{/if}
	</button>
{/if}

<style>
	span {
		font-family: 'Inknut Antiqua';
	}

	span,
	button {
		font-weight: 300;
		font-size: 1.4rem;
		line-height: 1.3;
		color: #fafafa;
		margin: 0;
		word-break: keep-all;
		white-space: normal;
		hyphens: manual;
	}

	button {
		font-family: 'Inter';
		background-color: #0b0b0b;
		padding: 0.8em 0.5em;
		cursor: pointer;
		border: none;
		justify-content: center;
	}

	button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		span,
		button {
			font-size: 1rem;
		}
	}
</style>
