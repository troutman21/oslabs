function style(mountNode) {
  this.styleTag = document.createElement('style');
  this.mountNodeId = mountNode.id;

  this.styles = `
      #${this.mountNodeId} {
        position: relative;
        max-width: 31rem;
        width: 100%;
        padding: 2.5rem 2.5rem 3.75rem;
        background-color: #1d3250;
        box-shadow: 0 0 14px 5px rgba(0,0,0, 0.4);
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 3rem;
        grid-row-gap: 1.75rem;
      }

      @media screen and (max-width: 67rem) {
        #${this.mountNodeId} {
          display: block;
          padding: 1.25rem 1.25rem 5rem;
        }
      }

      #${this.mountNodeId} legend {
          position: absolute;
          opacity: 0;
          height: 0;
          width: 0;
          left: -99289px;
        }


       #${this.mountNodeId} .form_input,
       #${this.mountNodeId} .form_message {
           display: flex;
           flex-direction: column;
       }

       @media screen and (max-width: 67rem) {
        .form_input + .form_input,
        .form_input + .form_message {
          margin-top: 1.875rem;
        }
      }

       #${this.mountNodeId} .form_input > label,
       #${this.mountNodeId} .form_message > label {
           margin-bottom: 0.625rem;
           font-size: 1.1875rem;
           text-transform: uppercase;
           font-weight: 700;
           color: #ffffff;
       }

       #${this.mountNodeId} .form_input > input,
       #${this.mountNodeId} .form_message > textarea {
           background-color: transparent;
           color: #ffffff;
           font-size: 0.9375rem;
       }

        #${this.mountNodeId} .form_input > input {
            border: none;
            border-bottom: 2px solid #ffffff;
        }

        #${this.mountNodeId} .form_message {
            grid-column-start: 1;
            grid-column-end: 3;
            margin-bottom: 2.5rem;
        }

        #${this.mountNodeId} .form_message > textarea {
            border: 2px solid #ffffff;
        }

        #${this.mountNodeId} .form_btn {
            position: absolute;
            left: 50%;
            bottom: 2.5rem;
            transform: translateX(-50%);
            font-weight: 600;
            padding: 0.6875rem 0.625rem 0.75rem;

        }

        #${this.mountNodeId} .form_btn:hover:disabled,
        #${this.mountNodeId} .form_btn:focus:disabled {
          pointer-events: none;
          outline: none;
        }
    `;

  this.styleTag.innerHTML = this.styles;

  document.head.appendChild(this.styleTag);
}

//npx rollup --config rollup.config.js

class Form {
  constructor(form, onSubmit) {
    this.fields = [];
    this.submitBtn = form.getElementsByTagName('button')[0];
    this.onSubmit = onSubmit;


    const formInputContainers = form.getElementsByTagName('div');
    Array.prototype.forEach.call(formInputContainers, input => {
      if(input.getElementsByTagName('textarea').length > 0) {
        input.classList.add('form_message');
      } else {
        input.classList.add('form_input');
      }
      this.fields.push(input);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.submit(e, this.fields, this.onSubmit);
    });

    style(form);
  }

  submit(e, fields, handleSubmit) {
    this.submitBtn.disabled = true;
    this.submitBtn.innerText = 'Form Submitted, Thanks!';
    this.submitBtn.style.opacity = '0.5';
    this.submitBtn.style.outline = 'none';
    handleSubmit(e, fields);
  }




}

// Grab DOM Elements
const parent = document.querySelector('.hero__bg');
const bgCanvas = document.querySelector('#bg');


// Draw out layers
resizeCanvas(parent, bgCanvas, drawCanvas);

// Redraw layers when window resizes
window.addEventListener('resize', debounce(() => {
  resizeCanvas(parent, bgCanvas, drawCanvas);
}, 500));

function drawCanvas() {
  if (bgCanvas.getContext) {
    const ctx = bgCanvas.getContext('2d');

    drawBg(ctx, parent);
    drawBubbles(ctx, parent);
    drawPolygon({ctx, parent});
    drawPolygon({
      ctx,
      parent,
      lineOpacity: 0.1,
      translateX: 500,
      translateY: 50,
    });
  }
}

function drawPolygon({ctx, parent, xOldCtx = 3400, lineOpacity = 0.2, translateX = 0, translateY = 0}) {
  const {offsetWidth: newXCtx, offsetHeight: newYCtx} = parent;
  const xPosObj = {newXCtx, xOldCtx};
  const yPosObj = {newYCtx};
  const polygonVerticies = {
    v1: [-280, 1030],
    v2: [-140, 1020],
    v3: [2, 568],
    v4: [99, 1024],
    v5: [557, 558],
    v6: [641, 1099],
    v7: [738, 576],
    v8: [1262, 460],
    v9: [1345, 756],
    v10: [1603, 958],
    v11: [1753, 1405],
    v12: [1914, 515],
    v13: [2088, 831],
    v14: [2166, 428],
    v15: [2363, 1479],
    v16: [2775, 382],
    v17: [2987, 765],
    v18: [2995, 1181],
    v19: [3200, 590],
    v20: [3247, 1300],
    v21: [3419, 800],
    v22: [3519, 750],
    v23: [3700, 850],
    v24: [3869, 495],
    v25: [3869, 1308],
    v26: [3995, 950],
    v27: [4080, 382],
    v28: [4180, 1081]
  };

  const adjacencyList = {
    v1: ['v2', 'v3'],
    v2: ['v3', 'v4'],
    v3: ['v4', 'v5'],
    v4: ['v5', 'v6'],
    v5: ['v6', 'v7'],
    v6: ['v7', 'v9', 'v10', 'v11'],
    v7: ['v8', 'v9'],
    v8: ['v9', 'v12'],
    v9: ['v10', 'v12'],
    v10: ['v11', 'v12', 'v13'],
    v11: ['v13', 'v15'],
    v12: ['v13', 'v14'],
    v13: ['v14', 'v15', 'v17', 'v18'],
    v14: ['v16', 'v17'],
    v15: ['v18'],
    v16: ['v17','v19'],
    v17: ['v18', 'v19', 'v21'],
    v18: ['v20', 'v21'],
    v19: ['v21', 'v22', 'v24'],
    v20: ['v21', 'v22', 'v23', 'v25'],
    v21: ['v22'],
    v22: ['v23', 'v24'],
    v23: ['v24', 'v25', 'v26'],
    v24: ['v26', 'v27'],
    v25: ['v26', 'v28'],
    v26: ['v27', 'v28'],
    v27: ['v28']
  };

  Object.keys(polygonVerticies).forEach(vertex => {
    const [x, y] = proportionalCoords(polygonVerticies[vertex], xPosObj, yPosObj);
    drawVertex((x - translateX), (y - translateY), ctx);
  });

  // Draw the segments
  Object.keys(adjacencyList).forEach(vertex => {
    const list = adjacencyList[vertex];
    const [x1, y1] = proportionalCoords(polygonVerticies[vertex], xPosObj, yPosObj);

    list.forEach(segment => {
      const [x2, y2] = proportionalCoords(polygonVerticies[segment], xPosObj, yPosObj);
      ctx.globalCompositeOperation = 'overlay';
      ctx.strokeStyle = `rgba(46, 193, 255, ${lineOpacity})`;
      ctx.beginPath();
      ctx.moveTo((x1 - translateX), (y1 - translateY));
      ctx.lineTo((x2 - translateX), (y2 - translateY));
      ctx.stroke();


    });
  });
}

function drawVertex(x, y, ctx) {
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = 'rgba(46, 193, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawBg(ctx, parent) {
  // Create gradients
  const grdBg = ctx.createRadialGradient((parent.offsetWidth/2),0,0,(parent.offsetWidth/2),0, (parent.offsetWidth/2));

  const grdBg2 = ctx.createRadialGradient((parent.offsetWidth/2), parent.offsetHeight, 0,(parent.offsetWidth/2), parent.offsetHeight, (parent.offsetWidth/2));

  const grd = ctx.createRadialGradient(parent.offsetWidth, (parent.offsetHeight/2), 0.000, parent.offsetWidth, 500.000, 500.000);

  const grd2 = ctx.createRadialGradient(0.000, (parent.offsetHeight/2), 0.000, 0.000, 500.000, 500.000);

  // Add Background Gradients
  grdBg.addColorStop(0, 'rgba(0,39,63,0.5)');
  grdBg.addColorStop(0.21, 'rgba(0,39,63,0.5)');
  grdBg.addColorStop(1, 'rgba(0,2,19,0)');
  grdBg2.addColorStop(0, 'rgba(0,39,63,0.5)');
  grdBg2.addColorStop(0.21, 'rgba(0,39,63,0.5)');
  grdBg2.addColorStop(1, 'rgba(0,2,19,0)');

  // Add Left + Right Light Gradients
  grd.addColorStop(0.000, 'rgba(0, 205, 244, 0.3)');
  grd.addColorStop(1.000, 'rgba(9, 24, 44, 0)');
  grd2.addColorStop(0.000, 'rgba(0, 205, 244, 0.3)');
  grd2.addColorStop(1.000, 'rgba(9, 24, 44, 0)');

  // Fill with gradient
  ctx.fillStyle = grdBg;
  ctx.fillRect(0, 0, parent.offsetWidth, parent.offsetHeight);
  ctx.fillStyle = grdBg2;
  ctx.fillRect(0, 0, parent.offsetWidth, parent.offsetHeight);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, parent.offsetWidth, parent.offsetHeight);
  ctx.fillStyle = grd2;
  ctx.fillRect(0, 0, parent.offsetWidth, parent.offsetHeight);
}

function drawBubbles(ctx, parent) {
  const {offsetWidth: newXCtx, offsetHeight: newYCtx} = parent;
  // Bubble Positions
  const strokeBubblesPos = [
    [209, 78, 0.2],
    [81, 328, 0.2],
    [-1, 765, 0.2],
    [62, 1248, 0.5],
    [114, 937, 0.2],
    [239, 1093, 0.1],
    [353, 1028, 0.3],
    [383, 617, 1],
    [422, 1049, 0.2],
    [560, 768, 0.2],
    [543, 1514, 0.1],
    [689, 1151, 0.2],
    [1192, 1327, 0.3],
    [1469, 895, 0.3],
    [1561, 318, 0.3],
    [2084, 1066, 0.3],
    [2126, 155, 0.3],
    [2472, 1012, 0.2],
    [2652, 1213, 0.1],
    [2667, 1046, 0.2],
    [2775, 443, 0.1],
    [2775, 1230, 0.1],
    [1720, 1167, 0.1],
    [2759, 1274, 0.1],
    [2777, 809, 0.8],
    [2789, 1125, 0.1],
    [2875, 1281, 0.1],
    [2855, 1355, 0.1],
    [1896, 599, 0.1],
    [2983, 535, 0.7],
    [2976, 1072, 0.7],
    [3002, 779, 0.1],
    [3015, 1266, 0.1],
    [3069, 895, 0.7],
    [3071, 378, 0.1],
    [3079, 1361, 0.3],
    [3102, 1050, 0.3]
  ];

  const fairyBubblesPos = [
    [69, 1083, 1],
    [400, 1177, 0.7],
    [584, 1241, 0.7],
    [701, 1414, 0.7],
    [910, 792, 0.6],
    [1340, 1217, 0.7],
    [1441, 1083, 0.6],
    [1720, 1167, 0.6],
    [2071, 1081, 0.6],
    [2295, 657, 1.2],
    [2494, 782, 0.7],
    [2547, 918, 0.7],
    [2618, 1041, 0.5],
    [2622, 1172, 0.5],
    [2667, 1094, 0.5],
    [2711, 1065, 0.5],
    [2700, 1345, 0.5],
    [2859, 1207, 0.4],
    [2931, 1210, 0.4],
    [3012, 1003, 0.4],
    [3011, 1285, 0.4],
    [3026, 890, 0.4],
    [3045, 887, 0.4],
    [3029, 1278, 0.4],
    [3031, 1358, 0.4],
    [3039, 1466, 0.4],
    [3085, 1263, 0.4],
    [3088, 1349, 0.4]
  ];

  fairyBubblesPos.forEach(bubble => {
    const [posX, posY, size] = bubble;
    const xPosObj = {newXCtx};
    const yPosObj = {newYCtx};

    fairyBubble({
      ctx: ctx,
      pos: proportionalCoords(canvasCoord([(posX), (posY)], 50),xPosObj, yPosObj),
      size
    });
  });

  strokeBubblesPos.forEach(bubble => {
    const [posX, posY, size] = bubble;
    const xPosObj = {newXCtx};
    const yPosObj = {newYCtx};

    strokeBubble({
      ctx: ctx,
      pos: proportionalCoords(canvasCoord([(posX), (posY)], 100),xPosObj, yPosObj),
      size,
    });
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

  ctx.globalCompositeOperation = 'screen';
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

  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = grad;
  ctx.fillRect(posX, posY, 100,100);
}

function canvasCoord([posX, posY], offset) {
  return [posX - offset, posY - offset];
}

// Measure where the bubbles should go when the screen resizes
function proportionalCoords([posX, posY], xCtx, yCtx) {
  // default context values are from the hero in the design psd file
  const {xOldCtx = 3100, newXCtx} = xCtx;
  const {yOldCtx = 1754, newYCtx} = yCtx;

  // Ctx refers to the proportions for width & height
  const getPropCoords = (val, oldCtx, newCtx) => {
    return val * newCtx / oldCtx;
  };

  return [
    getPropCoords((posX), xOldCtx, newXCtx),
    getPropCoords(posY, yOldCtx, newYCtx)
  ];
}

// Removes additional distance added by canvas rect
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

// entry point for scss code
// import Css from '../styles/scss/styles.scss';

const Form$1 = new Form(
  document.querySelector('#industryRequest'),
  (e, fields) => {
    const formData = {
      subject: 'OsLabs Contact Submission',
    };

    const mailToLink = `mailto:phillip@codesmith.io?subject=${
      formData.subject
    }&body=${fields.reduce((acc, input) => {
      const subject = input.getElementsByTagName('label')[0].textContent;
      const value =
        !input.getElementsByTagName('textarea').length > 0
          ? input.getElementsByTagName('input')[0].value
          : input.getElementsByTagName('textarea')[0].value;

      acc += `%0A${subject}:%20${value}%0A`;

      return acc;
    }, '')}`;

    window.location.href = mailToLink;
  }
);

drawCanvas();
