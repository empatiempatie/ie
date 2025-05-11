<script lang="ts">
	import { Body } from 'svelte-body';
	import { enhance } from '$app/forms';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';

	const { data } = $props();

	let success = $state(false);
	let errorMessage = $state('');
	let isSubmitting = $state(false);

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

<Body style="background-color: #fafafa" />
<SliceZone slices={data.page.data.slices} {components} />

<div class="form-container">
	<h1>Contact Form</h1>
	{#if success}
		<div class="success-message">
			<p>Thank you for your submission!</p>
		</div>
	{:else}
		{#if errorMessage}
			<div class="error-message">
				<p>{errorMessage}</p>
			</div>
		{/if}
		<form method="POST" use:enhance={handleSubmit}>
			<div class="form-field">
				<label for="name">Name</label>
				<input id="name" name="name" type="text" required />
			</div>

			<div class="form-field">
				<label for="email">Email</label>
				<input id="email" name="email" type="email" required />
			</div>

			<div class="form-field">
				<label for="topic">Topic</label>
				<input id="topic" name="topic" type="text" required />
			</div>

			<div class="form-field">
				<label for="message">Message</label>
				<textarea id="message" name="message" rows="5" required></textarea>
			</div>

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Sending...' : 'Submit'}
			</button>
		</form>
	{/if}
</div>

<style>
	.form-container {
		max-width: 600px;
		margin: 2rem auto;
	}

	.form-field {
		margin-bottom: 1.5rem;
	}

	.error-message {
		padding: 1rem;
		background-color: #fff0f0;
		border: 1px solid #ffcaca;
		color: #d00000;
		margin-bottom: 1.5rem;
		border-radius: 3px;
		font-family: 'Inter';
	}

	label {
		display: block;
		font-family: 'Inter';
		font-weight: 400;
		margin-bottom: 0.5rem;
		font-size: 1rem;
		color: #0b0b0b;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.8rem;
		font-family: 'Inter';
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 0;
		background-color: white;
	}

	textarea {
		resize: vertical;
	}

	button {
		font-family: 'Inter';
		background-color: #0b0b0b;
		color: #fafafa;
		border: none;
		padding: 0.8rem 1.5rem;
		font-size: 1rem;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	button:hover {
		opacity: 0.8;
	}

	.success-message {
		padding: 1.5rem;
		background-color: #f3f3f3;
		border: 1px solid #ddd;
		text-align: center;
	}
</style>
