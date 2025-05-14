<script lang="ts">
	import { Body } from 'svelte-body';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { PrismicImage } from '@prismicio/svelte';
	import type { ImageField } from '@prismicio/types';

	const { data } = $props();

	let success = $state(false);
	let errorMessage = $state('');
	let isSubmitting = $state(false);
	let visitHovered = $state(false);
	let submitHovered = $state(false);
	let image = $state<ImageField | null>(null);

	function navigateHome() {
		goto('/');
	}

	function getRandomImageFromGallery() {
		if (data.page.data.conspire_gallery.length > 0) {
			const randomIndex = Math.floor(Math.random() * data.page.data.conspire_gallery.length);
			return data.page.data.conspire_gallery[randomIndex].image;
		}
		return null;
	}

	function handleSubmit() {
		isSubmitting = true;
		errorMessage = '';

		return ({
			result,
			update
		}: {
			result: { type: string; data?: any; error?: string; success?: boolean; message?: string };
			update: () => void;
		}) => {
			isSubmitting = false;

			if (result.type === 'success' || result.data?.success === true) {
				success = true;
			} else if (
				result.type === 'error' ||
				result.type === 'failure' ||
				result.data?.success === false
			) {
				errorMessage =
					result.data?.error || 'Something went wrong. Please try again or contact us directly.';
				console.error('Form submission error:', errorMessage, result);
			}

			image = getRandomImageFromGallery();
			update();
		};
	}
</script>

<Body style="background-color: #fafafa" />
<section>
	<h1>Conspire with us</h1>

	{#if success}
		<div class="success">
			<PrismicImage field={image} />
		</div>
	{:else}
		{#if errorMessage}
			<div class="error-message" role="alert" aria-live="assertive">
				<p>{errorMessage}</p>
			</div>
		{/if}

		<form method="POST" use:enhance={handleSubmit} aria-live="polite">
			<div class="form-field">
				<input aria-label="name" placeholder="Name:" id="name" name="name" type="text" required />
			</div>
			<div class="form-field">
				<input
					aria-label="email"
					placeholder="Email:"
					id="email"
					name="email"
					type="email"
					required
				/>
			</div>
			<div class="form-field">
				<input
					aria-label="evidence"
					placeholder="Evidence:"
					id="evidence"
					name="evidence"
					type="text"
					required
				/>
			</div>
			<div class="form-field">
				<textarea
					aria-label="details"
					placeholder="Details:"
					id="details"
					name="details"
					rows="3"
					required
				></textarea>
			</div>
			<div class="button-container">
				<button
					type="submit"
					disabled={isSubmitting}
					onmouseenter={() => !isSubmitting && (submitHovered = true)}
					onmouseleave={() => !isSubmitting && (submitHovered = false)}
					class:disabled={isSubmitting}
				>
					{isSubmitting ? 'Cooking...' : 'Submit'}
					{#if submitHovered}
						<span>→</span>
					{/if}
				</button>
				<button
					type="button"
					disabled={isSubmitting}
					onclick={navigateHome}
					onmouseenter={() => !isSubmitting && (visitHovered = true)}
					onmouseleave={() => !isSubmitting && (visitHovered = false)}
					class:disabled={isSubmitting}
					aria-label="Go Back"
				>
					G<span>o</span> Back
					{#if visitHovered}
						<span>→</span>
					{/if}
				</button>
			</div>
		</form>
	{/if}
</section>

<style>
	h1 {
		margin: 0 0 2rem 0;
	}

	textarea {
		resize: vertical;
		min-height: 6rem;
	}

	textarea,
	input {
		box-sizing: border-box;
		padding: 0.5rem;
		width: 100%;
		font-family: 'Inter';
		font-weight: 300;
		color: #0b0b0b;
		font-size: 0.9rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
		border: none;
		border-bottom: 1px solid #0b0b0b;
		border-radius: 0;
		background-color: #fafafa;
	}

	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 30px #fafafa inset;
	}
	
	input::placeholder,
	textarea::placeholder {
		font-family: 'Inter';
		font-weight: 300;
		font-size: 0.9rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
		margin: 0;
		padding: 0;
		color: #0b0b0b;
		word-break: keep-all;
		white-space: normal;
		hyphens: manual;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #0b0b0b;
	}

	span {
		font-family: 'Inknut Antiqua';
	}

	span,
	button {
		font-weight: 300;
		font-size: 1.4rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
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

	.form-field {
		margin-bottom: 1rem;
	}

	.button-container {
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.4em;
		margin: 3rem 0 3rem -0.7rem;
	}

	.success {
		width: 100vw;
		display: flex;
		justify-content: center;
		height: 400px;
		margin: 0 0 2rem -0.7rem;
	}

	.success :global(img) {
		width: auto;
		height: 100%;
		max-width: 100%;
		object-fit: contain;
	}

	.error-message {
		padding: 1rem;
		background-color: #fafafa;
		border: 1px solid #0b0b0b;
		color: #e35b52;
		margin-bottom: 1.5rem;
		border-radius: 3px;
		font-family: 'Inter';
	}

	@media (max-width: 768px) {
		span,
		button {
			font-size: 1rem;
		}
	}

	@media (max-width: 1024px) {
		.button-container {
			width: 100%;
			margin: 3rem 0 3rem 0;
		}

		.success {
			width: 100%;
			margin: 0 0 2rem 0;
		}
	}
</style>
