var Dimension;
(function (Dimension) {
    Dimension[Dimension["WIDTH"] = 0] = "WIDTH";
    Dimension[Dimension["HEIGHT"] = 1] = "HEIGHT";
})(Dimension || (Dimension = {}));
// Utils and Globals
function toPx(v, dimension) {
    // 1px = (100vw / [document.documentElement.clientWidth] px)
    // https://stackoverflow.com/questions/28295072/how-can-i-convert-px-to-vw-in-javascript
    var html = document.querySelector("html");
    console.log("Translating ".concat(v, " to px... dimension: ").concat(dimension));
    var styleDimension = dimension == Dimension.WIDTH ? html.clientWidth : html.clientHeight;
    console.log("Making calculation: ".concat(styleDimension, " * ").concat(Number(v.substring(0, 2)), " / 100 = ").concat(styleDimension * Number(v.substring(0, 2)) / 100));
    return styleDimension * Number(v.substring(0, 2)) / 100;
}
var globalSize;
function scaleCanvasContextSize(canvas, ctx) {
    var main = document.querySelector("main");
    main.style.width = "90vw";
    main.style.height = "90vh";
    globalSize = {
        xVw: main.style.width,
        yVh: main.style.height,
        xPx: toPx("90vw", Dimension.WIDTH),
        yPx: toPx("90vh", Dimension.HEIGHT)
    };
    console.log("Scaling canvas to size: ".concat(JSON.stringify(globalSize)));
    canvas.width = globalSize.xPx;
    canvas.height = globalSize.yPx;
}
// Canvas
function createPosition(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}
function getCanvasContext() {
    console.log("Accessing canvas...");
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext("2d");
    scaleCanvasContextSize(canvas, ctx);
    console.log("Successful");
    return ctx;
}
// Drawing
function drawTriangle(ctx, triangle) {
    console.log("Drawing path: ".concat(JSON.stringify(triangle)));
    ctx.beginPath();
    ctx.moveTo(triangle.x, triangle.x);
    ctx.lineTo(triangle.x, triangle.y);
    ctx.lineTo(triangle.y, triangle.z);
    ctx.lineTo(triangle.z, triangle.x);
    ctx.stroke();
}
function drawRectangle(ctx, color, position) {
    console.log("Drawing path: ".concat(JSON.stringify(position)));
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, position.width, position.height);
}
// Main
function main() {
    var ctx = getCanvasContext();
    var rectangle = drawRectangle(ctx, "blue", createPosition(200, 200, 100, 100));
    var triangle = drawTriangle(ctx, { x: 220, y: 100, z: 220 });
}
main();
