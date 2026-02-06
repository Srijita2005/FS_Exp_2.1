const svg = document.getElementById("svgCanvas");
const colorPicker = document.getElementById("colorPicker");

let drawing = false;
let currentLine = null;
let shapes = [];

svg.addEventListener("mousedown", startDraw);
svg.addEventListener("mousemove", draw);
svg.addEventListener("mouseup", stopDraw);
svg.addEventListener("mouseleave", stopDraw);

function getMousePosition(evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function startDraw(evt) {
    drawing = true;
    const pos = getMousePosition(evt);

    currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    currentLine.setAttribute("x1", pos.x);
    currentLine.setAttribute("y1", pos.y);
    currentLine.setAttribute("x2", pos.x);
    currentLine.setAttribute("y2", pos.y);
    currentLine.setAttribute("stroke", colorPicker.value);
    currentLine.setAttribute("stroke-width", "0.5");

    svg.appendChild(currentLine);
    shapes.push(currentLine);
}

function draw(evt) {
    if (!drawing) return;
    const pos = getMousePosition(evt);
    currentLine.setAttribute("x2", pos.x);
    currentLine.setAttribute("y2", pos.y);
}

function stopDraw() {
    drawing = false;
}

function undo() {
    if (shapes.length > 0) {
        const last = shapes.pop();
        svg.removeChild(last);
    }
}
