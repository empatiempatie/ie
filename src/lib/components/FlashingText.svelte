<script lang="ts">
	import type { NumberField, RichTextField } from '@prismicio/client';
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		tag:
			| 'paragraph'
			| 'image'
			| 'embed'
			| 'heading1'
			| 'heading2'
			| 'heading3'
			| 'heading4'
			| 'heading5'
			| 'heading6'
			| 'preformatted'
			| 'list-item'
			| 'o-list-item'
			| undefined;
		content: string | RichTextField;
		flashColor?: string;
		flashInterval?: number | NumberField;
		flashDuration?: number | NumberField;
		glitchInterval?: number | NumberField;
		glitchDuration?: number | NumberField;
	}

	let {
		tag = 'heading1',
		content,
		flashColor = 'e35b52',
		flashInterval = 150,
		flashDuration = 100,
		glitchInterval = 2000,
		glitchDuration = 50
	}: Props = $props();

	// Only enable flashing and glitching if all required values are valid
	const enableFlashing = (flashInterval ?? 0) > 0 && (flashDuration ?? 0) > 0;
	const enableGlitching = (glitchInterval ?? 0) > 0 && (glitchDuration ?? 0) > 0;

	let elementRef: HTMLElement | null = null;
	let flashIntervalId: number | undefined | NodeJS.Timeout = undefined;
	let glitchIntervalId: number | undefined | NodeJS.Timeout = undefined;
	let spans: HTMLElement[] = [];

	const glitchChars = [
		'!@#$%¨&*()_+-=[]{}|;:,./<>?',
		'∑∏∆√∞≠≈×÷±⌐¬½¼¾¥€£¢',
		'←↑→↓↔↕↨∈∉⊂⊃⊆⊇⊄⋂⋃',
		'┌┐└┘├┤┬┴┼━┃┏┓┗┛┣┫┳┻╋',
		'■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○●◐◑◒◓◔◕◖◗',
		'¹²³ªº°¡¿ßÐðÞþµ¶·¸º¨˙`´ˆ¯˘˚˜¯'
	].join('');

	function getHtmlTag(prismicTag: Props['tag']): string {
        switch (prismicTag) {
            case 'heading1': return 'h1';
            case 'heading2': return 'h2';
            case 'heading3': return 'h3';
            case 'heading4': return 'h4';
            case 'heading5': return 'h5';
            case 'heading6': return 'h6';
            case 'paragraph': return 'p';
            case 'list-item': return 'li';
            case 'o-list-item': return 'li';
            case 'preformatted': return 'pre';
            default: return 'div';
        }
    }

	const htmlTag = $derived(getHtmlTag(tag));

	function getRandomGlitchChar() {
		return glitchChars[Math.floor(Math.random() * glitchChars.length)];
	}

	let contentString = '';
	if (typeof content === 'string') {
		contentString = content;
	} else if (Array.isArray(content)) {
		// Process rich text content by iterating through each element
		// and adding line breaks between elements
		const textParts = [];
		for (let i = 0; i < content.length; i++) {
			const node = content[i];
			if ('text' in node && typeof node.text === 'string') {
				textParts.push(node.text);
			}
		}
		contentString = textParts.join('<br>');
	}

	// Split content into characters/tags, wrapping chars in spans
	const segments = contentString.match(/<[^>]+>|./gs) || [];
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

			if (enableFlashing) {
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
							}, flashDuration as number);
						}
					}
				}, flashInterval as number);
			}

			if (enableGlitching) {
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
								}, glitchDuration as number);
							}
						}
					}
				}, glitchInterval as number);
			}
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

<svelte:element this={htmlTag} bind:this={elementRef} class="flashing-text">
	{@html processedContent}
	<!-- <PrismicRichText field={processedContent} /> -->
</svelte:element>

<style>
	.flashing-text {
		margin: var(--margin, 0);
	}
</style>
