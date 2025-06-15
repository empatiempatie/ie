<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import ErrorDrawText from '$lib/components/ErrorDrawText.svelte';
	import { navigateHome } from '$lib/utils/navigation';
</script>

<div class="error-container">
	<div class="canvas-section">
		<div class="error-message">
			<p>This page doesn't seem to be working → {page.status} {page.error?.message}</p>
		</div>
		<ErrorDrawText />
	</div>
	<div class="buttons-container">
		<Button
			onClick={navigateHome}
			firstHalf="Go "
			specialChar="B"
			secondHalf="ack"
		/>
	</div>
</div>

<style>
	.error-container {
		display: flex;
		flex-direction: column;
		height: 65vh;
	}

	.canvas-section {
		flex: 1;
		position: relative;
		min-height: 0;
	}

	.error-message {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		pointer-events: none;
	}

	.error-message p {
		font-family: 'Inter';
		font-size: 1.2rem;
		font-weight: 400;
		color: #0b0b0b;
		text-align: center;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.buttons-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.4rem;
		margin-top: auto;
		margin-bottom: 4.1rem;
	}

	@media (max-width: 768px) {
		.error-message p {
			font-size: 1rem;
		}
	}
</style>
