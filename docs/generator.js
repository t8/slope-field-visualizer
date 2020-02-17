let equation = document.getElementById('equation');
let parsedEquation = null;

const expr = document.getElementById('expr');
const output = document.getElementById('output');
let options = {
    parenthesis: 'auto',
    implicit: 'hide'
};

let mousePos;

let canvasOne = document.getElementById('q1');
let ctxOne = canvasOne.getContext('2d');
let canvasTwo = document.getElementById('q2');
let ctxTwo = canvasTwo.getContext('2d');
let canvasThree = document.getElementById('q3');
let ctxThree = canvasThree.getContext('2d');
let canvasFour = document.getElementById('q4');
let ctxFour = canvasFour.getContext('2d');

let imageDataOne = ctxOne.getImageData(0, 0, canvasOne.width, canvasOne.height);
let dataOne = new Array(imageDataOne.data.length);
let imageDataTwo = ctxTwo.getImageData(0, 0, canvasTwo.width, canvasTwo.height);
let dataTwo = new Array(imageDataOne.data.length);
let imageDataThree = ctxThree.getImageData(0, 0, canvasThree.width, canvasThree.height);
let dataThree = new Array(imageDataOne.data.length);
let imageDataFour = ctxFour.getImageData(0, 0, canvasFour.width, canvasFour.height);
let dataFour = new Array(imageDataOne.data.length);

function qOne() {
    let lMax = 0;
    let lMin = 0;
    const code = parsedEquation.compile();
    for(let i = 0; i < dataOne.length; i += 4) {
        let x = (i / 4) % ctxOne.canvas.width / 10;
        let y = Math.floor((i / 4) / ctxOne.canvas.width);
        let scope = {
            x: x,
            y: y
        };
        let num = code.evaluate(scope);
        if (num === Infinity || num === -Infinity) {
            num = 0;
        }
        dataOne[i] = num;
        dataOne[i+1] = 0;
        dataOne[i+2] = 0;
        dataOne[i+3] = 0;
        if (num > lMax) {
            lMax = num;
        }
        if (num < lMin) {
            lMin = num;
        }
    }
    return {
        max: lMax,
        min: lMin
    };
}

function qTwo() {
    let lMax = 0;
    let lMin = 0;
    const code = parsedEquation.compile();
    for(let i = 0; i < dataTwo.length; i += 4) {
        let x = -((i / 4) % ctxTwo.canvas.width / 10);
        let y = Math.floor((i / 4) / ctxTwo.canvas.width);
        let scope = {
            x: x,
            y: y
        };
        let num = code.evaluate(scope);
        if (num === Infinity || num === -Infinity) {
            num = 0;
        }
        dataTwo[i] = num;
        dataTwo[i+1] = 0;
        dataTwo[i+2] = 0;
        dataTwo[i+3] = 0;
        if (num > lMax) {
            lMax = num;
        }
        if (num < lMin) {
            lMin = num;
        }
    }
    return {
        max: lMax,
        min: lMin
    };
}

function qThree() {
    let lMax = 0;
    let lMin = 0;
    const code = parsedEquation.compile();
    for(let i = 0; i < dataThree.length; i += 4) {
        let x = -((i / 4) % ctxThree.canvas.width / 10);
        let y = -(Math.floor((i / 4) / ctxThree.canvas.width));
        let scope = {
            x: x,
            y: y
        };
        let num = code.evaluate(scope);
        if (num === Infinity || num === -Infinity) {
            num = 0;
        }
        dataThree[i] = num;
        dataThree[i+1] = 0;
        dataThree[i+2] = 0;
        dataThree[i+3] = 0;
        if (num > lMax) {
            lMax = num;
        }
        if (num < lMin) {
            lMin = num;
        }
    }
    return {
        max: lMax,
        min: lMin
    };
}

function qFour() {
    let lMax = 0;
    let lMin = 0;
    const code = parsedEquation.compile();
    for(let i = 0; i < dataFour.length; i += 4) {
        let x = (i / 4) % ctxFour.canvas.width / 10;
        let y = -(Math.floor((i / 4) / ctxFour.canvas.width));
        let scope = {
            x: x,
            y: y
        };
        let num = code.evaluate(scope);
        if (num === Infinity || num === -Infinity) {
            num = 0;
        }
        dataFour[i] = num;
        dataFour[i+1] = 0;
        dataFour[i+2] = 0;
        dataFour[i+3] = 0;
        if (num > lMax) {
            lMax = num;
        }
        if (num < lMin) {
            lMin = num;
        }
    }
    return {
        max: lMax,
        min: lMin
    };
}

function normalizeValues(q1, q2, q3, q4) {
    let quadrants = [q1, q2, q3, q4];
    let absoluteMax = 0;
    let absoluteMin = 0;
    for (let i = 0; i < quadrants.length; i++) {
        if (quadrants[i].max > absoluteMax) {
            absoluteMax = quadrants[i].max;
        }
        if (quadrants[i].min < absoluteMin) {
            absoluteMin = quadrants[i].min;
        }
    }
    return {
        max: absoluteMax,
        min: absoluteMin
    };
}

function renderCanvases(absolutes) {
    for (let i = 0; i < dataOne.length; i+= 4) {
        // Q1 Colors
        if (dataOne[i] > 0) {
            dataOne[i] = Math.floor(Math.abs(dataOne[i] / absolutes.max * 255));
        } else if (dataOne[i] < 0) {
            dataOne[i+1] = Math.floor(Math.abs(dataOne[i] / absolutes.max * 255));
            dataOne[i] = 0;
        } else if (isNaN(dataOne[i])) {
            dataOne[i] = 0;
            dataOne[i+1] = 0;
            dataOne[i+2] = 255;
        } else if (dataOne[i] === 0) {
            dataOne[i] = 255;
            dataOne[i+1] = 255;
            dataOne[i+2] = 255;
        }

        // Q2 Colors
        if (dataTwo[i] > 0) {
            dataTwo[i] = Math.floor(Math.abs(dataTwo[i] / absolutes.max * 255));
        } else if (dataTwo[i] < 0) {
            dataTwo[i+1] = Math.floor(Math.abs(dataTwo[i] / absolutes.max * 255));
            dataTwo[i] = 0;
        } else if (isNaN(dataTwo[i])) {
            dataTwo[i] = 0;
            dataTwo[i+1] = 0;
            dataTwo[i+2] = 255;
        } else if (dataTwo[i] === 0) {
            dataTwo[i] = 255;
            dataTwo[i+1] = 255;
            dataTwo[i+2] = 255;
        }

        // Q3 Colors
        if (dataThree[i] > 0) {
            dataThree[i] = Math.floor(Math.abs(dataThree[i] / absolutes.max * 255));
        } else if (dataThree[i] < 0) {
            dataThree[i+1] = Math.floor(Math.abs(dataThree[i] / absolutes.max * 255));
            dataThree[i] = 0;
        } else if (isNaN(dataThree[i])) {
            dataThree[i] = 0;
            dataThree[i+1] = 0;
            dataThree[i+2] = 255;
        } else if (dataThree[i] === 0) {
            dataThree[i] = 255;
            dataThree[i+1] = 255;
            dataThree[i+2] = 255;
        }

        // Q4 Colors
        if (dataFour[i] > 0) {
            dataFour[i] = Math.floor(Math.abs(dataFour[i] / absolutes.max * 255));
        } else if (dataFour[i] < 0) {
            dataFour[i+1] = Math.floor(Math.abs(dataFour[i] / absolutes.max * 255));
            dataFour[i] = 0;
        } else if (isNaN(dataFour[i])) {
            dataFour[i] = 0;
            dataFour[i+1] = 0;
            dataFour[i+2] = 255;
        } else if (dataFour[i] === 0) {
            dataFour[i] = 255;
            dataFour[i+1] = 255;
            dataFour[i+2] = 255;
        }

        dataOne[i + 3] = 255;
        dataTwo[i + 3] = 255;
        dataThree[i + 3] = 255;
        dataFour[i + 3] = 255;
    }
    console.log(dataTwo);
    imageDataOne.data.forEach(function(val, i) {
        imageDataOne.data[i] = dataOne[i];
    });
    ctxOne.putImageData(imageDataOne, 0, 0);
    imageDataTwo.data.forEach(function(val, i) {
        imageDataTwo.data[i] = dataTwo[i];
    });
    ctxTwo.putImageData(imageDataTwo, 0, 0);
    imageDataThree.data.forEach(function(val, i) {
        imageDataThree.data[i] = dataThree[i];
    });
    ctxThree.putImageData(imageDataThree, 0, 0);
    imageDataFour.data.forEach(function(val, i) {
        imageDataFour.data[i] = dataFour[i];
    });
    ctxFour.putImageData(imageDataFour, 0, 0);
}

function populateQuadrants() {
    let extremaOne = qOne();
    let extremaTwo = qTwo();
    let extremaThree = qThree();
    let extremaFour = qFour();
    let absolutes = normalizeValues(extremaOne, extremaTwo, extremaThree, extremaFour);
    renderCanvases(absolutes);
    document.getElementById("graph").classList.remove("is-hidden");
}

function tracerPoints() {
    // Only so I can tell which canvases I need to mirror on the x/y axes
    dataOne[8] = 0;
    dataOne[9] = 0;
    dataOne[10] = 0;
    dataOne[11] = 0;

    dataTwo[8] = 0;
    dataTwo[9] = 0;
    dataTwo[10] = 0;
    dataTwo[11] = 0;

    dataThree[8] = 0;
    dataThree[9] = 0;
    dataThree[10] = 0;
    dataThree[11] = 0;

    dataFour[8] = 0;
    dataFour[9] = 0;
    dataFour[10] = 0;
    dataFour[11] = 0;
}

function inputVal () {
    try {
        // parse the expression
        parsedEquation = math.parse(expr.value);

        // print the HTML output
        output.innerHTML = math.parse(expr.value).toHTML(options);
    }
    catch (err) {
        output.innerHTML = '<span style="color: red;">' + err.toString() + '</span>'
    }
}

function getMousePos(canvas, quadrant, event) {
    let rect = canvas.getBoundingClientRect();
    let x, y;
    if (quadrant === "1") {
        x = Math.round((event.clientX - rect.left) / 2);
        y = Math.round(math.abs(event.clientY - rect.bottom) * 5);
    } else if (quadrant === "2") {
        x = Math.round((event.clientX - rect.right) / 2);
        y = Math.round(math.abs(event.clientY - rect.bottom) * 5);
    } else if (quadrant === "3") {
        x = Math.round((event.clientX - rect.right) / 2);
        y = -Math.round(math.abs(event.clientY - rect.top) * 5);
    } else if (quadrant === "4") {
        x = Math.round((event.clientX - rect.left) / 2);
        y = -Math.round(math.abs(event.clientY - rect.top) * 5);
    }
    mousePos = {
        x: x,
        y: y
    };
}

function updatePosition() {
    const code = parsedEquation.compile();
    let scope = {
        x: mousePos.x,
        y: mousePos.y
    };
    let slope = code.evaluate(scope);
    document.getElementById("position").innerHTML =
        'Position: (' + mousePos.x + ',' + mousePos.y + ')<br />' +
        'Slope Approximation: ' + slope.toString();
}

canvasOne.addEventListener('mousemove', function(evt) {
    getMousePos(canvasOne, "1", evt);
    updatePosition();
}, false);
canvasTwo.addEventListener('mousemove', function(evt) {
    getMousePos(canvasTwo, "2", evt);
    updatePosition();
}, false);
canvasThree.addEventListener('mousemove', function(evt) {
    getMousePos(canvasThree, "3", evt);
    updatePosition();
}, false);
canvasFour.addEventListener('mousemove', function(evt) {
    getMousePos(canvasFour, "4", evt);
    updatePosition();
}, false);

window.onload = inputVal;
expr.value = '2x+y';
inputVal();
populateQuadrants();

expr.oninput = inputVal;