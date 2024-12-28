function createPosition(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}
function createCanvasContext() {
    var canvas = document.getElementById("game-canvas");
    return canvas.getContext("2d");
}
function drawTriangle() {
}
function drawRectangle(ctx, color, position) {
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, position.width, position.height);
}
function main() {
    var ctx = createCanvasContext();
    var rectangle = drawRectangle(ctx, "blue", createPosition(10, 10, 100, 100));
}
main();
