import { control, ctx, game, isDebug, isMobile } from "./state"


const drawDebugInfo = () => {
  const debugData = [
    `state:    ${ game.state }`,
    `speed:    ${ game.speed.toFixed(3) }`,
    `mobile:   ${ isMobile }`,
    `scale:    ${ game.wormWidth.toFixed(1) }`,
    `screen:   ${ game.width } x ${ game.height }`,
    `test-age: ${ ((game.test ? game.tick - game.test.created : 0) / 1000.0).toFixed(1) }`,
    `length:   ${ game.maxWormLength.toFixed(1) }`,
    ...(game.worm.map(({ x, y }, i) => `${ i === 0 ? "worm:    " : "         " } [${ i }] ${ x.toFixed(0) } : ${ y.toFixed(0) }`)),
  ]

  const lineHeight = 18
  let y = 40

  ctx.save()
  ctx.font = "16px courier"
  ctx.textBaseline = "hanging"
  ctx.fillStyle = "rgba(128, 128, 128, 128)"

  for (let line of debugData) {
    ctx.fillText(line, 20, y)
    y += lineHeight
  }

  ctx.restore()
}


const drawWorm = () => {
  ctx.save()
  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.lineWidth = game.wormWidth
  ctx.strokeStyle = game.state === "run" ? "#ff00ff" : "#770077"

  ctx.beginPath()
  const worm = game.worm
  const head = worm[0]
  if (head) ctx.moveTo(head.x, head.y)
  for (let i = 1; i < worm.length; i++) {
    const { x, y } = worm[i]
    ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.restore()
}

const PI = Math.PI
const PIx2 = PI * 2.0
const PIp2 = PI * 0.5
const PIp4 = PI * 0.25


const textWidth = (text: string): number => ctx.measureText(text).width


const drawCenterText = (x: number, y: number, text: string) => ctx.fillText(text, x - (textWidth(text) * 0.5), y)


const drawTest = () => {
  const { test, wormWidth, width } = game
  if (!test) return

  ctx.save()

  ctx.font = (wormWidth * 1.2).toFixed(1) + "px PressStart"
  ctx.textBaseline = "middle"

  ctx.fillStyle = game.state === "run" ? "#ffffff" : "#777777"
  drawCenterText(width * 0.5, wormWidth, test.question)

  ctx.font = (wormWidth * 0.8).toFixed(1) + "px sans-serif"
  ctx.fillStyle = game.state === "run" ? "#ffffff" : "#777777"
  ctx.strokeStyle = game.state === "run" ? "#ffffff" : "#777777"
  ctx.lineWidth = 2

  test.options.forEach(({ name, position: { x, y } }) => {
    const offX = ctx.measureText(name).width * 0.5
    ctx.fillText(name, x - offX, y)
    ctx.beginPath()
    ctx.arc(x, y, game.wormWidth, 0, PIx2, false)
    ctx.stroke()
  })

  ctx.restore()
}


const drawScore = () => {
  const { wormWidth, points } = game

  ctx.save()

  ctx.font = (wormWidth * 1.2).toFixed(1) + "px PressStart"
  ctx.textBaseline = "middle"

  ctx.fillStyle = game.state === "run" ? "#50ff50" : "#207720"
  ctx.fillText("points: " + points, wormWidth, wormWidth)

  ctx.restore()
}


const drawPaused = (ts: number) => {
  const alpha = 1 - (Math.abs((ts % 2000) - 1000) / 1000),
        x     = game.width * 0.5,
        yd    = game.wormWidth * 1.6
  let y = game.height / 2 - (yd * 2)
  ctx.save()
  ctx.font = "32px PressStart"
  ctx.textBaseline = "hanging"
  ctx.fillStyle = `rgba(255, 255, 255, ${ alpha })`
  drawCenterText(x, y, "paused")
  y += yd
  y += yd
  ctx.font = "26px PressStart"
  drawCenterText(x, y, "press space or click")
  y += yd
  drawCenterText(x, y, "to continue")
  ctx.restore()
}


const drawGameOver = (ts: number) => {
  const alpha = 1 - (Math.abs((ts % 2000) - 1000) / 1000),
        x     = game.width * 0.5,
        yd    = game.wormWidth * 1.8
  let y = game.height / 2 - (yd * 4)
  ctx.save()
  ctx.font = "32px PressStart"
  ctx.textBaseline = "hanging"
  ctx.fillStyle = `rgba(127, 255, 127, ${ alpha })`
  drawCenterText(x, y, "game over")
  y += yd
  y += yd
  ctx.fillStyle = `rgba(127, 255, 212, ${ alpha })`
  ctx.font = "48px PressStart"
  drawCenterText(x, y, `score ${ game.points }`)
  y += yd
  y += yd
  ctx.fillStyle = `rgba(127, 255, 127, ${ alpha })`
  ctx.font = "26px PressStart"
  drawCenterText(x, y, "press space or click")
  y += yd
  drawCenterText(x, y, "for new game")
  ctx.restore()
}


const drawNewDesktop = (ts: number) => {
  const alpha = 1 - (Math.abs((ts % 2000) - 1000) / 1000),
        x     = game.width * 0.5,
        yd    = game.wormWidth * 1.6
  let y = game.height / 2 - (yd * 6)
  ctx.save()
  ctx.textBaseline = "hanging"
  ctx.font = "32px PressStart"
  ctx.fillStyle = `rgba(127, 255, 127, ${ alpha })`
  drawCenterText(x, y, "Matikka-Mato")
  y += yd
  y += yd
  y += yd
  ctx.fillStyle = `rgb(127, 255, 212)`
  ctx.font = "16px PressStart"
  drawCenterText(x, y, "ohjaa matoa oikean vastauksen luo")
  y += yd
  drawCenterText(x, y, "älä törmaa seinään äläkä matoon")
  y += yd
  drawCenterText(x, y, "mato kääntyy nuoli-näppäimillä")
  y += yd
  drawCenterText(x, y, "välilyönti aloittaa ja lopettaa tauon")
  y += yd
  y += yd
  drawCenterText(x, y, "aloita peli välilyönnillä")
  ctx.restore()
}


const drawNewMobile = (ts: number) => {
  const alpha = 1 - (Math.abs((ts % 2000) - 1000) / 1000),
        x     = game.width * 0.5,
        yd    = game.wormWidth * 1.6
  let y = game.height / 2 - (yd * 6)
  ctx.save()
  ctx.textBaseline = "hanging"
  ctx.font = "32px PressStart"
  ctx.fillStyle = `rgba(127, 255, 127, ${ alpha })`
  drawCenterText(x, y, "Matikka-Mato")
  y += yd
  y += yd
  y += yd
  ctx.fillStyle = `rgb(127, 255, 212)`
  ctx.font = "16px PressStart"
  drawCenterText(x, y, "ohjaa matoa oikean vastauksen luo")
  y += yd
  drawCenterText(x, y, "älä törmaa seinään äläkä matoon")
  y += yd
  y += yd
  drawCenterText(x, y, "ohjaa matoa ohjaus näppäimillä")
  y += yd
  drawCenterText(x, y, "aloita välilyönnillä")
  ctx.restore()
}


const drawPauseControl = () => {
  ctx.fillRect(-0.3, -0.6, 0.2, 1.2)
  ctx.fillRect(0.1, -0.6, 0.2, 1.2)
}


const drawPlayControl = () => {
  ctx.beginPath()
  ctx.moveTo(-0.3, -0.5)
  ctx.lineTo(0.6, 0)
  ctx.lineTo(-0.3, 0.5)
  ctx.closePath()
  ctx.fill()
}


const drawControlFunc = () => {
  const { r, x, y, selected } = control,
        fill = "rgba(255, 255, 255, 0.05)",
        stroke = "rgba(255, 255, 255, 0.1)",
        selectedFill = "rgba(255, 255, 255, 0.7)",
        selectedStroke = "rgba(255, 255, 255, 1)"

  ctx.save()

  ctx.translate(x, y)

  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i === selected ? selectedFill : fill
    ctx.strokeStyle = i === selected ? selectedStroke : stroke
    ctx.beginPath()
    ctx.arc(0, 0, r, PI + PIp4, PIx2 - PIp4, false)
    ctx.arc(0, 0, r * 0.4, PIx2 - PIp4, PI + PIp4, true)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.rotate(PIp2)
  }

  ctx.scale(r * 0.4, r * 0.4)

  ctx.fillStyle = fill
  ctx.strokeStyle = stroke

  if (game.state === "run") {
    drawPauseControl()
  } else {
    drawPlayControl()
  }

  ctx.restore()
}


const drawControl = isMobile ? drawControlFunc : () => {}


export const draw = (ts: number) => {
  const { width, height, state } = game
  ctx.clearRect(0, 0, width, height)
  switch (state) {
    case "new":
      if (isMobile) {
        drawNewMobile(ts)
      } else {
        drawNewDesktop(ts)
      }
      break
    case "run":
      drawWorm()
      drawScore()
      drawTest()
      break
    case "paused":
      drawScore()
      drawPaused(ts)
      break
    case "game-over":
      drawGameOver(ts)
      break
  }
  drawControl()
  if (isDebug()) drawDebugInfo()
}


