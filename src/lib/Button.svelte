<script lang="ts">
	interface Props {
		disabled?: boolean;
		firstHalf?: string;
		secondHalf?: string;
		specialChar?: string;
	}

	let { disabled = false, firstHalf = '', secondHalf = '', specialChar = '' }: Props = $props();
	let isHovered = $state(false);
</script>

<button
	{disabled}
	onmouseenter={() => !disabled && (isHovered = true)}
	onmouseleave={() => !disabled && (isHovered = false)}
	class:disabled
>
	{firstHalf}<span>{specialChar}</span>{secondHalf}
	{#if isHovered}
		<span>→</span>
	{/if}
</button>

<style>
	button,
	span {
		font-weight: 300;
		/* font-size: 1.9rem; */
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
		transition: opacity 0.2s ease, cursor 0.2s ease;
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
