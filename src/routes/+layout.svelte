<script lang="ts">
	import { titles, footerData } from '$lib/utils/content';
	import Button from '$lib/Button.svelte';
	import logo from '$lib/images/ie-logo.svg';
	import '../app.css';

	let { children } = $props();
</script>

<div class="page-container">
	<header>
		<span class="site-logo">
			<a href="/">{titles.main}</a>
		</span>
	</header>

	<main>
		{@render children()}
	</main>

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
	header {
		margin-bottom: 5rem;
	}

	.site-logo {
		font-family: 'Inknut Antiqua';
		font-weight: 300;
		font-size: 8.5rem;
		line-height: 1;
		letter-spacing: -0.15em;
		word-break: keep-all;
		white-space: normal;
		hyphens: manual;
		cursor: default;
		user-select: none;
		color: #0b0b0b;
	}

	.site-logo a {
		color: inherit;
		text-decoration: none;
	}

	.page-container {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	footer,
	header {
		padding: 0 0.7em;
	}

	footer {
		font-size: 0.9rem;
		display: grid;
		margin: 0 0 0.5rem 0;
		grid-template-columns: 1fr auto 1fr;
		align-items: start;
		color: #0b0b0b;
	}

	footer img {
		width: 1.5rem;
		height: auto;
		margin: 0;
	}

	.footer-left,
	.footer-right {
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
