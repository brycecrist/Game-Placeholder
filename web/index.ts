interface Position {
    x: number,
    y: number,
    width: number,
    height: number
}

function createPosition(x: number, y: number, width: number, height: number) {
    return {x: x, y: y, width: width, height: height}
}

function createCanvasContext(): CanvasRenderingContext2D {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game-canvas")
    return canvas.getContext("2d")
}

function drawTriangle() {

}

function drawRectangle(ctx: CanvasRenderingContext2D, color: string, position: Position) {
    ctx.fillStyle = color
    ctx.fillRect(position.x, position.y, position.width, position.height)
}

function main() {
    const ctx = createCanvasContext()
    const rectangle = drawRectangle(ctx, "blue", createPosition(10, 10, 100, 100))
}

main()
