import { ctx, game, isDebug } from "./state"


const drawDebugInfo = () => {
  const debugData = [
    `state:    ${ game.state }`,
    `speed:    ${ game.speed }`,
    `length:   ${ game.maxWormLength }`,
    `worm-w:   ${ game.wormWidth.toFixed(1) }`,
    ...(game.worm.map(({ x, y }, i) => `${ i === 0 ? "worm:    " : "         " } [${ i }] ${ x.toFixed(0) } : ${ y.toFixed(0) }`)),
  ]

  const lineHeight = 18
  let y = 20

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

const PI2 = 2.0 * Math.PI

const drawTest = () => {
  const { test, wormWidth } = game

  ctx.save()
  ctx.font = (wormWidth * 0.6).toFixed(1) + "px PressStart"
  ctx.textBaseline = "middle"
  ctx.fillStyle = game.state === "run" ? "#ffffff" : "#777777"
  ctx.strokeStyle = game.state === "run" ? "#ffffff" : "#777777"
  ctx.lineWidth = 2
  test.options.forEach(({ name, position: { x, y } }) => {
    const offX = ctx.measureText(name).width / 2.0
    ctx.fillText(name, x - offX, y)
    ctx.beginPath()
    ctx.arc(x, y, game.wormWidth, 0, PI2, false)
    ctx.stroke()
  })
  ctx.restore()
}


const drawState = (stateText: string) => {
  ctx.save()
  ctx.font = "32px PressStart"
  ctx.textBaseline = "hanging"
  ctx.fillStyle = "rgba(192, 192, 192, 192)"
  const textWidth = ctx.measureText(stateText).width
  ctx.fillText(stateText, (game.width - textWidth) / 2, game.height / 2)
  ctx.restore()
}


export const draw = () => {
  const { width, height, state } = game
  ctx.clearRect(0, 0, width, height)
  drawWorm()
  switch (state) {
    case "run":
      drawTest()
      break
    case "paused":
      drawState("paused")
      break
    case "game-over":
      drawState("game over")
      break
  }
  if (isDebug()) drawDebugInfo()
}


