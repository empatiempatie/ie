<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	/*
	 * Drawing with text.
	 * Ported from Generative Design book - http://www.generative-gestaltung.de
	 * Original licence: http://www.apache.org/licenses/LICENSE-2.0
	 * https://github.com/generative-design/
	 */

	let { errorStatus = '' }: { errorStatus?: string | number } = $props();

	let position = { x: 0, y: 0 };
	let counter = 0;
	let minFontSize = 3;
	
	let canvas: HTMLCanvasElement | undefined = $state();
	let context: CanvasRenderingContext2D;
	let mouse = { x: 0, y: 0, down: false };
	
	let letters = $derived(errorStatus ? `${errorStatus} Grrrrrrrrrrr! >:( ` : 'Grrrrrrrrrrr! >:( ');
	
	onMount(() => init());

	function init() {
		try {
			if (!browser || !canvas) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			context = ctx;

			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			position.y = canvas.height / 2;

			canvas.addEventListener('mousemove', mouseMove, false);
			canvas.addEventListener('mousedown', mouseDown, false);
			canvas.addEventListener('mouseup', mouseUp, false);
			canvas.addEventListener('mouseout', mouseUp, false);
			canvas.addEventListener('dblclick', doubleClick, false);

			window.addEventListener('resize', handleResize);
		} catch (error) {
			console.warn('DrawText initialization failed:', error);
		}
	}

	function handleResize() {
		if (!browser || !canvas) return;

		try {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		} catch (error) {
			console.warn('DrawText resize failed:', error);
		}
	}

	function mouseMove(event: MouseEvent) {
		if (!browser || !canvas) return;

		mouse.x = event.clientX;
		mouse.y = event.clientY;
		draw();
	}

	function draw() {
		if (!browser || !mouse.down || !context) return;

		try {
			const d = distance(position, mouse);
			const fontSize = minFontSize + d / 2;
			const letter = letters[counter];
			const stepSize = textWidth(letter, fontSize);

			if (d > stepSize) {
				const angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

				context.font = fontSize + "px 'Inknut Antiqua', serif";
				context.fillStyle = '#0b0b0b';

				context.save();
				context.translate(position.x, position.y);
				context.rotate(angle);
				context.fillText(letter, 0, 0);
				context.restore();

				counter++;
				if (counter > letters.length - 1) {
					counter = 0;
				}

				position.x = position.x + Math.cos(angle) * stepSize;
				position.y = position.y + Math.sin(angle) * stepSize;
			}
		} catch (error) {
			console.warn('Draw operation failed:', error);
		}
	}

	function distance(pt: { x: number; y: number }, pt2: { x: number; y: number }): number {
		const xs = (pt2.x - pt.x) ** 2;
		const ys = (pt2.y - pt.y) ** 2;
		return Math.sqrt(xs + ys);
	}

	function mouseDown(event: MouseEvent) {
		if (!browser || !canvas) return;

		mouse.down = true;
		position.x = event.clientX;
		position.y = event.clientY;
	}

	function mouseUp(event: MouseEvent) {
		mouse.down = false;
	}

	function doubleClick(event: MouseEvent) {
		if (!browser || !canvas) return;

		try {
			canvas.width = canvas.width;
		} catch (error) {
			console.warn('Canvas clear failed:', error);
		}
	}

	function textWidth(string: string, size: number): number {
		if (!browser || !context) return 0;

		try {
			context.font = size + "px 'Inknut Antiqua', serif";
			return context.measureText(string).width;
		} catch (error) {
			return 0;
		}
	}
</script>

<main class="canvas-container">
	<canvas bind:this={canvas} class="error-canvas"></canvas>
</main>

<style>
	.canvas-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: all;
	}

	.error-canvas {
		width: 100%;
		height: 100%;
		cursor: crosshair;
	}
</style>
