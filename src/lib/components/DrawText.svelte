<script lang="ts">
import { onMount } from 'svelte';

// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
let position = {x: 0, y: 0};
let counter = 0;
let minFontSize = 3;
let angleDistortion = 0;
let letters = "There was a table set out under a tree in front of the house, and the March Hare and the Hatter were having tea at it: a Dormouse was sitting between them, fast asleep, and the other two were using it as a cushion, resting their elbows on it, and talking over its head. 'Very uncomfortable for the Dormouse,' thought Alice; 'only, as it's asleep, I suppose it doesn't mind.'";

// Drawing variables
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let mouse = {x: 0, y: 0, down: false};

onMount(() => {
  init();
});

function init() {
  const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvasElement) return;
  
  canvas = canvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  context = ctx;
  position.y = window.innerHeight / 2;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mouseout', mouseUp, false);  
  canvas.addEventListener('dblclick', doubleClick, false);
  
  window.onresize = function(event) {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }
}

function mouseMove(event: MouseEvent) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
  if (mouse.down && context) {
    const d = distance(position, mouse);
    const fontSize = minFontSize + d/2;
    const letter = letters[counter];
    const stepSize = textWidth(letter, fontSize);
    
    if (d > stepSize) {
      const angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      context.font = fontSize + "px Georgia";
    
      context.save();
      context.translate(position.x, position.y);
      context.rotate(angle);
      context.fillText(letter, 0, 0);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
    
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;
    }
  }     
}

function distance(pt: {x: number, y: number}, pt2: {x: number, y: number}): number {
  const xs = (pt2.x - pt.x) ** 2;
  const ys = (pt2.y - pt.y) ** 2;
  return Math.sqrt(xs + ys);
}

function mouseDown(event: MouseEvent) {
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
  
  const infoElement = document.getElementById('info');
  if (infoElement) {
    infoElement.style.display = 'none';
  }
}

function mouseUp(event: MouseEvent) {
  mouse.down = false;
}

function doubleClick(event: MouseEvent) {
  if (canvas) {
    canvas.width = canvas.width; 
  }
}

function textWidth(string: string, size: number): number {
  if (!context) return 0;
  
  context.font = size + "px Georgia";
  return context.measureText(string).width;
}

init();
</script>

<canvas id='canvas'></canvas>
<span id='info'>Click and drag to draw!</span>
            
<style>
:global(html), :global(body) {
  width: 100%;
  height: 100%;
  margin: 0px;
  overflow: hidden;
}

:global(body:hover) span {
  display: none; 
}

canvas {
  cursor: crosshair;
}

span {
  font-family: 'Georgia', cursive;
  font-size: 40px;
  position: fixed; 
  top: 50%;
  left: 50%;
  color: #000;
  margin-top: -40px;
  margin-left: -200px;
  z-index: 10;
}
</style>