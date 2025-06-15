<script lang="ts">
	import '../app.css';
	import { Body } from 'svelte-body';
	import { page } from '$app/state';
	// import logo from '$lib/images/ie-logo.svg';
	import { titles, footerData } from '$lib/utils/content';

	let { children, data } = $props();
	let isErrorPage = $derived(page.error);
	let backgroundColor = $derived(page.error ? '#e35b52' : data.backgroundColor);
</script>

<Body style="background-color: {backgroundColor}" />

<div
	class="page-container"
	style="background-color: {backgroundColor}"
	class:error-page={isErrorPage}
>
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
		<!-- <img src={logo} alt="i.e., logo" /> -->
		<p class="footer-right">
			{#each footerData.rightColumn as item, index}
				{item}
				<!-- {#if index < footerData.rightColumn.length - 1}
					<br />
				{/if} -->
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

	.page-container.error-page {
		pointer-events: none;
	}

	header {
		padding: 0.7rem 0.7rem 0 0.7rem;
		margin-bottom: 4rem;
		display: flex;
	}

	.site-logo {
		font-family: 'Inknut Antiqua';
		font-weight: 300;
		font-size: 8.5rem;
		line-height: 1;
		letter-spacing: -0.12em;
		word-break: keep-all;
		white-space: normal;
		hyphens: manual;
		cursor: default;
		user-select: none;
		color: #0b0b0b;
		overflow: hidden;
		z-index: 1;
		pointer-events: all;
	}

	.site-logo a {
		color: inherit;
		text-decoration: none;
		display: block;
		width: 1.5em;
		height: 1.2em;
	}

	footer {
		padding: 0 0.7rem 0.5rem 0.7rem;
		font-size: 0.9rem;
		display: grid;
		/* grid-template-columns: 1fr auto 1fr; */
		grid-template-columns: 1fr 1fr;
		align-items: start;
		color: #0b0b0b;
	}

	/* footer img {
		width: 1.5rem;
		height: auto;
		margin: 0;
	} */

	.footer-left,
	.footer-right {
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: -0.02em;
	}

	.footer-left {
		text-align: left;
	}

	.footer-right {
		text-align: right;
	}

	@media (min-width: 1920px) {
		.page-container {
			padding: 0 10rem;
		}
	}
</style>
