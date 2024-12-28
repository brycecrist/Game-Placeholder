interface Size {
    xVw: string,
    yVh: string,
    xPx: number,
    yPx: number
}

interface Position {
    x: number,
    y: number,
    width: number,
    height: number
}

interface Vector3 {
    x: number,
    y: number,
    z: number
}

enum Dimension {
    WIDTH,
    HEIGHT
}

// Utils and Globals

function toPx(v: string, dimension: Dimension): number {
    // 1px = (100vw / [document.documentElement.clientWidth] px)
    // https://stackoverflow.com/questions/28295072/how-can-i-convert-px-to-vw-in-javascript
    const html = document.querySelector("html")
    console.log(`Translating ${v} to px... dimension: ${dimension}`)
    
    const styleDimension = dimension == Dimension.WIDTH ? html.clientWidth : html.clientHeight
    console.log(`Making calculation: ${styleDimension} * ${Number(v.substring(0, 2))} / 100 = ${styleDimension * Number(v.substring(0, 2)) / 100}`)

    return styleDimension * Number(v.substring(0, 2)) / 100
}

let globalSize: Size | null;

function scaleCanvasContextSize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const main = document.querySelector("main")
    
    main.style.width = "90vw"
    main.style.height = "90vh"

    globalSize = {
        xVw: main.style.width,
        yVh: main.style.height,
        xPx: toPx("90vw", Dimension.WIDTH),
        yPx: toPx("90vh", Dimension.HEIGHT)
    }

    console.log(`Scaling canvas to size: ${JSON.stringify(globalSize)}`)
    
    canvas.width = globalSize.xPx
    canvas.height = globalSize.yPx
}

// Canvas

function createPosition(x: number, y: number, width: number, height: number): Position {
    return {x: x, y: y, width: width, height: height}
}

function getCanvasContext(): CanvasRenderingContext2D {
    console.log("Accessing canvas...")

    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game-canvas")
    const ctx = canvas.getContext("2d")
    
    scaleCanvasContextSize(canvas, ctx)

    console.log("Successful")

    return ctx
}

// Drawing

function drawTriangle(ctx: CanvasRenderingContext2D, triangle: Vector3): void {
    console.log(`Drawing path: ${JSON.stringify(triangle)}`)
    ctx.beginPath()

    ctx.moveTo(triangle.x, triangle.x)

    ctx.lineTo(triangle.x, triangle.y)
    ctx.lineTo(triangle.y, triangle.z)
    ctx.lineTo(triangle.z, triangle.x)

    ctx.stroke()
}

function drawRectangle(ctx: CanvasRenderingContext2D, color: string, position: Position): void {
    console.log(`Drawing path: ${JSON.stringify(position)}`)
    ctx.fillStyle = color
    ctx.fillRect(position.x, position.y, position.width, position.height)
}

// Main

function main() {
    const ctx = getCanvasContext()
    const rectangle = drawRectangle(ctx, "blue", createPosition(200, 200, 100, 100))
    const triangle = drawTriangle(ctx, {x: 220, y: 100, z: 220})
}

main()
