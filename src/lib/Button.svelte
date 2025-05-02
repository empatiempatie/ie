<script lang="ts">
	interface Props {
		firstHalf?: string;
		secondHalf?: string;
		specialChar?: string;
	}

	let { firstHalf = '', secondHalf = '', specialChar = '' }: Props = $props();
	let isHovered = $state(false);
</script>

<button onmouseenter={() => (isHovered = true)} onmouseleave={() => (isHovered = false)}>
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
