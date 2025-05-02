<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
		content: string;
		flashColor?: string;
		flashInterval?: number;
		flashDuration?: number;
		glitchInterval?: number;
		glitchDuration?: number;
	}

	let {
		tag,
		content,
		flashColor = '#E35B52',
		flashInterval = 150,
		flashDuration = 100,
		glitchInterval = 2000,
		glitchDuration = 50
	}: Props = $props();

	let elementRef: HTMLElement | null = null;
	let flashIntervalId: number | undefined = undefined;
	let glitchIntervalId: number | undefined = undefined;
	let spans: HTMLElement[] = [];

	const glitchChars = [
		'!@#$%¨&*()_+-=[]{}|;:,./<>?',
		'∑∏∆√∞≠≈×÷±⌐¬½¼¾¥€£¢',
		'←↑→↓↔↕↨∈∉⊂⊃⊆⊇⊄⋂⋃',
		'┌┐└┘├┤┬┴┼━┃┏┓┗┛┣┫┳┻╋',
		'■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○●◐◑◒◓◔◕◖◗',
		'¹²³ªº°¡¿ßÐðÞþµ¶·¸º¨˙`´ˆ¯˘˚˜¯'
	].join('');

	function getRandomGlitchChar() {
		return glitchChars[Math.floor(Math.random() * glitchChars.length)];
	}

	// Split content into characters/tags, wrapping chars in spans
	const segments = content.match(/<[^>]+>|./gs) || [];
	const processedContent = segments
		.map((seg) => {
			if (seg.startsWith('<') && seg.endsWith('>')) {
				return seg;
			} else if (seg.trim() === '') {
				return seg;
			} else {
				return `<span data-char="${seg}">${seg}</span>`;
			}
		})
		.join('');

	onMount(() => {
		if (elementRef) {
			spans = Array.from(elementRef.querySelectorAll('span[data-char]'));

			flashIntervalId = setInterval(() => {
				if (spans.length > 0) {
					const randomIndex = Math.floor(Math.random() * spans.length);
					const span = spans[randomIndex];

					if (span) {
						const originalColor = span.style.color || window.getComputedStyle(span).color;
						span.style.transition = 'color 0.05s ease-in-out';
						span.style.color = flashColor;

						setTimeout(() => {
							span.style.color = originalColor;
						}, flashDuration);
					}
				}
			}, flashInterval);

			glitchIntervalId = setInterval(() => {
				if (spans.length > 0) {
					// Glitch multiple characters at once for better effect
					const numGlitches = Math.floor(Math.random() * 3) + 1; // 1-3 glitches at once

					for (let i = 0; i < numGlitches; i++) {
						const randomIndex = Math.floor(Math.random() * spans.length);
						const span = spans[randomIndex];

						if (span) {
							const originalChar = span.getAttribute('data-char') || span.textContent;
							const glitchChar = getRandomGlitchChar();
							span.textContent = glitchChar;

							setTimeout(() => {
								span.textContent = originalChar;
							}, glitchDuration);
						}
					}
				}
			}, glitchInterval);
		}
	});

	onDestroy(() => {
		if (flashIntervalId) {
			clearInterval(flashIntervalId);
		}
		if (glitchIntervalId) {
			clearInterval(glitchIntervalId);
		}
	});
</script>

<svelte:element this={tag} bind:this={elementRef} class="flashing-text">
	{@html processedContent}
</svelte:element>

<style>
	.flashing-text {
		margin: var(--margin, 0);
	}
</style>
