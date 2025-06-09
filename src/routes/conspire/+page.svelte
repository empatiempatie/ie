<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { PrismicImage } from '@prismicio/svelte';
	import type { ImageField } from '@prismicio/types';
	import Button from '$lib/components/Button.svelte';
	import { navigateHome } from '$lib/utils/navigation';

	const { data } = $props();

	let success = $state(false);
	let errorMessage = $state('');
	let isSubmitting = $state(false);
	let image = $state<ImageField | null>(null);

	onMount(() => {
		image = getRandomImageFromGallery();
	});

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

			update();
		};
	}
</script>

<section>
	<h1>Conspire with us</h1>

	{#if success}
		<div class="success-container">
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
			<div class="buttons-container">
				<Button
					type="submit"
					disabled={isSubmitting}
					firstHalf={isSubmitting ? 'Co' : 'Sub'}
					specialChar={isSubmitting ? 'o' : 'm'}
					secondHalf={isSubmitting ? 'king...' : 'it'}
				/>
				<Button
					disabled={isSubmitting}
					onClick={navigateHome}
					firstHalf=""
					specialChar="G"
					secondHalf="o Back"
				/>
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

	.buttons-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.4rem;
		margin: 3rem 0;
	}

	.form-field {
		margin-bottom: 1rem;
	}

	.success-container {
		display: flex;
		height: 400px;
		margin-bottom: 2rem;
	}

	.success-container :global(img) {
		width: 100%;
		height: 100%;
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
</style>
