<script lang="ts">
	import { Body } from 'svelte-body';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';

	const { data } = $props();

	let success = $state(false);
	let errorMessage = $state('');
	let isSubmitting = $state(false);
	let visitHovered = $state(false);
	let submitHovered = $state(false);

	function navigateHome() {
		goto('/');
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

<Body style="background-color: #fafafa" />
<SliceZone slices={data.page.data.slices} {components} />

<section>
	<h1>Conspire with us</h1>

	{#if success}
		<div class="success-message">
			<p>Mischief submitted!</p>
		</div>
	{:else}
		{#if errorMessage}
			<div class="error-message" role="alert" aria-live="assertive">
				<p>{errorMessage}</p>
			</div>
		{/if}

		<form method="POST" use:enhance={handleSubmit} aria-live="polite">
			<div class="form-field">
				<label for="name"><i>Name:</i></label>
				<input id="name" name="name" type="text" required />
			</div>

			<div class="form-field">
				<label for="email"><i>Email:</i></label>
				<input id="email" name="email" type="email" required />
			</div>

			<div class="form-field">
				<label for="evidence"><i>Evidence:</i></label>
				<input id="evidence" name="evidence" type="text" required />
			</div>

			<div class="form-field">
				<label for="message"><i>Details:</i></label>
				<textarea id="message" name="message" rows="3" required></textarea>
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
					aria-label="Visit Website"
				>
					Visit Websit<span>e</span>
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
		margin: 0 0 0.7rem 0;
	}

	label {
		display: block;
	}

	textarea {
		resize: vertical;
		min-height: 6rem;
	}

	textarea,
	input {
		box-sizing: border-box;
		display: block;
		padding: 0.4rem;
		width: 100%;
		font-family: 'Inter';
		font-size: 1rem;
		border: 1px solid #0b0b0b;
		border-radius: 0;
		background-color: #fafafa;
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
		margin-bottom: 0.7rem;
	}

	.button-container {
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.4em;
		margin: 3rem 0 3rem -0.7rem;
	}

	.success-message {
		padding: 1.5rem;
		background-color: #fafafa;
		border: 1px solid #0b0b0b;
		text-align: center;
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
	}
</style>
