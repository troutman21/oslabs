// Bubble Positions
const strokeBubblesPos = [
  [209, 78, 0.15],
  [81, 328, 0.175],
  [-1, 765, 0.2],
  [62, 1248, 0.5],
  [114, 937, 0.1],
  [239, 1093, 0.1],
  [353, 1028, 0.3],
  [383, 617, 1],
  [422, 1049, 0.15],
  [560, 768, 0.2],
  [543, 1514, 0.09],
  [689, 1151, 0.2],
  [1192, 1327, 0.25],
  [1469, 895, 0.25],
  [1561, 318, 0.25],
  [2084, 1066, 0.25],
  [2126, 155, 0.25],
  [2472, 1012, 0.15],
  [2652, 1213, 0.05],
  [2667, 1046, 0.25],
  [2775, 443, 0.05],
  [2775, 1230, 0.05],
  [1720, 1167, 0.1],
  [2759, 1274, 0.1],
  [2777, 809, 0.8],
  [2789, 1125, 0.1],
  [2875, 1281, 0.07],
  [2855, 1355, 0.07],
  [1896, 599, 0.07],
  [2983, 535, 0.7],
  [2976, 1072, 0.7],
  [3002, 779, 0.1],
  [3015, 1266, 0.1],
  [3069, 895, 0.7],
  [3071, 378, 0.07],
  [3079, 1361, 0.25],
  [3102, 1050, 0.25]
];

const fairyBubblesPos = [
  [69, 1083, 0.8],
  [400, 1177, 0.1],
  [584, 1241, 0.1],
  [701, 1414, 0.1],
  [910, 792, 0.07],
  [1340, 1217, 0.1],
  [1441, 1083, 0.1],
  [1720, 1167, 0.1],
  [2071, 1081, 0.2],
  [2295, 657, 1],
  [2494, 782, 0.2],
  [2547, 918, 0.25],
  [2618, 1041, 0.1],
  [2622, 1172, 0.1],
  [2667, 1094, 0.1],
  [2711, 1065, 0.1],
  [2700, 1345, 0.1],
  [2859, 1207, 0.07],
  [2931, 1210, 0.07],
  [3012, 1003, 0.07],
  [3011, 1285, 0.07],
  [3026, 890, 0.07],
  [3045, 887, 0.07],
  [3029, 1278, 0.07],
  [3031, 1358, 0.07],
  [3039, 1466, 0.07],
  [3085, 1263, 0.1],
  [3088, 1349, 0.07]
];

// Grab DOM Elements
const parent = document.querySelector('.hero');
const bgCanvas = document.querySelector('#bg');
const lightCanvas = document.querySelector('#lights');

// Draw out layers
resizeCanvas(parent, lightCanvas);
resizeCanvas(parent, bgCanvas, drawCanvas);

// Redraw layers when window resizes
window.addEventListener('resize', debounce(() => {
  resizeCanvas(parent, lightCanvas);
  resizeCanvas(parent, bgCanvas, drawCanvas);
}, 500));

function drawCanvas() {
  if (bgCanvas.getContext) {
    const ctx = bgCanvas.getContext('2d');
    const lightCtx = lightCanvas.getContext('2d');
    drawBubbles(ctx);
    drawLights(lightCtx, parent);
  }
}

function drawLights(ctx, parent) {
  // Create gradients
  grd = ctx.createRadialGradient(parent.offsetWidth, (parent.offsetHeight/2), 0.000, parent.offsetWidth, 500.000, 500.000);

  grd2 = ctx.createRadialGradient(0.000, (parent.offsetHeight/2), 0.000, 0.000, 500.000, 500.000);

  // Add colors
  grd.addColorStop(0.000, 'rgba(0, 205, 233, 0.5)');
  grd.addColorStop(1.000, 'rgba(0, 0, 0, 0)');
  grd2.addColorStop(0.000, 'rgba(0, 205, 233, 0.5)');
  grd2.addColorStop(1.000, 'rgba(0, 0, 0, 0)');

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, parent.offsetWidth, parent.offsetHeight);
  ctx.fillStyle = grd2;
  ctx.fillRect(0, 0, parent.offsetWidth, parent.offsetHeight);
}

function drawBubbles(ctx) {
  fairyBubble({
    ctx: ctx,
    pos: [1000, 200],
    size: 1,
  });
  strokeBubble({
    ctx: ctx,
    pos: [0, 0],
    size: 1,
  });
}

function strokeBubble({ctx, pos: [posX, posY], size}) {
  const gradPosX = posX + 100;
  const gradPosY = posY + 100;
  const gradRadius = 50 * size;
  const grad = ctx.createRadialGradient(gradPosX,gradPosY,0,gradPosX,gradPosY, gradRadius);

  grad.addColorStop(0, 'rgba(0,0,0,0.2)');
  grad.addColorStop(0.57, 'rgba(0,0,0,0.2)');
  grad.addColorStop(0.81, 'rgba(0,32,39,0.7)');
  grad.addColorStop(0.83, 'rgba(1,81,120,0.7)');
  grad.addColorStop(0.89, 'rgba(0,0,0,0.05)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(posX, posY, 200,200);
}

function fairyBubble({ctx, pos: [posX, posY], size}) {
  const gradPosX = posX + 50;
  const gradPosY = posY + 50;
  const gradRadius = 20 * size;
  const grad = ctx.createRadialGradient(gradPosX,gradPosY,0,gradPosX,gradPosY, gradRadius);

  grad.addColorStop(0, 'rgba(104,242,255,1)');
  grad.addColorStop(0.18, 'rgba(104,242,255,0.2)');
  grad.addColorStop(0.19, 'rgba(13,126,143,0.2)');
  grad.addColorStop(0.32, 'rgba(13,126,143,0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(posX, posY, 100,100);
}

function resizeCanvas(parent, canvas, cb) {
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  if (cb) cb();
}

function debounce(fn, time) {
  let timeout;
  return function() {
    const args = arguments;
    const context = this;

    const later = function() {
      timeout = null;
      fn.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, time);

  }
}
