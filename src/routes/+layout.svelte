<script lang="ts">
	import { titles, footerData } from '$lib/utils/content';
	import Button from '$lib/Button.svelte';
	import logo from '$lib/images/ie-logo.svg';
	import '../app.css';

	let { children } = $props();
</script>

<div class="page-container">
	<header>
		<h1>{titles.main}</h1>
	</header>

	<main>
		{@render children()}
	</main>

	<aside>
		<div class="buttons-container">
			<Button firstHalf="Submit " specialChar="m" secondHalf="ischief" />
			<Button firstHalf="Conspire with " specialChar="u" secondHalf="s" />
		</div>
		<p class="cta-description">Unserious inquiries only.</p>
	</aside>

	<footer>
		<p class="footer-left">{footerData.leftColumn}</p>
		<img src={logo} alt="i.e., logo" />
		<p class="footer-right">
			{#each footerData.rightColumn as item, index}
				{item}
				{#if index < footerData.rightColumn.length - 1}
					<br />
				{/if}
			{/each}
		</p>
	</footer>
</div>

<style>
	.page-container {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	h1 {
		margin: 0 0 5rem 0;
	}

	.buttons-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.4rem;
		margin: 0 0 0.9rem 0;
	}

	.cta-description {
		/* font-size: 1.1rem; */
		font-size: 0.9rem;
		font-weight: 400;
		text-align: center;
		margin: 0 0 9rem 0;
	}

	footer,
	header,
	aside {
		padding: 0 0.7em;
	}

	footer {
		/* font-size: 1.1rem; */
		font-size: 0.9rem;
		display: grid;
		margin: 0 0 0.5rem 0;
		grid-template-columns: 1fr auto 1fr;
		align-items: start;
		color: #0b0b0b;
	}

	footer img {
		/* width: 1.7rem; */
		width: 1.5rem;
		height: auto;
		margin: 0;
	}

	.footer-left,
	.footer-right {
		/* font-size: 1rem; */
		font-size: 0.8rem;
		font-weight: 400;
	}

	.footer-left {
		text-align: left;
	}

	.footer-right {
		text-align: right;
	}
</style>
