import { Point, Line, State } from "./types"
import { distance, intersect } from "./geom"


let DEBUG: boolean = window.location.search.indexOf("debug") > 0

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D


const HEADING: Point[] = [
  { x: 0, y: -1 }, // Up
  { x: +1, y: 0 }, // Right
  { x: 0, y: +1 }, // Down
  { x: -1, y: 0 }, // Left
]


const game = {
  state:         "paused" as State,
  width:         0,
  height:        0,
  wormWidth:     0,
  maxWormLength: 0,
  worm:          [] as Point[],
  heading:       0,
  speed:         0,
}


const initGame = () => {
  game.state = "run"
  game.maxWormLength = 300
  game.worm = [{ x: 200, y: 200 }, { x: 200, y: 200 }]
  game.heading = 1
  game.speed = 1.5
}


const drawDebugInfo = () => {
  const debugData = [
    `state:    ${ game.state }`,
    `speed:    ${ game.speed }`,
    `length:   ${ game.maxWormLength }`,
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
  ctx.strokeStyle = "#ff00ff"

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


const draw = () => {
  ctx.clearRect(0, 0, game.width, game.height)
  drawWorm()
  if (DEBUG) drawDebugInfo()
}


const move = () => {
  const worm      = game.worm,
        heading   = HEADING[game.heading],
        speed     = game.speed,
        head      = worm[0],
        { x, y }  = head,
        wormWidth = game.wormWidth,
        reach     = wormWidth / 2,
        maxLen    = game.maxWormLength

  let len = 0,
      nx  = x + (heading.x * speed),
      ny  = y + (heading.y * speed)

  head.x = nx
  head.y = ny

  // Hit border wall?
  if ((nx < reach) || (nx > game.width - reach) || (ny < reach) || (ny > game.height - reach)) {
    game.state = "game-over"
    return
  }

  // Run onto itself?
  const [a1, a2] = worm,
        a0       = {
          x: a1.x + (heading.x * wormWidth),
          y: a1.y + (heading.y * wormWidth ),
        },
        cross    = intersect(a0, a2)
  for (let i = 3; i < worm.length; i++) {
    const b1 = worm[i - 1],
          b2 = worm[i]
    if (cross(b1, b2)) {
      game.state = "game-over"
      return
    }
  }

  // Keep max-len under limit:
  for (let i = 1; i < worm.length; i++) {
    const last     = worm[i],
          { x, y } = last,
          dx       = nx - x,
          dy       = ny - y
    len += Math.abs(dx) + Math.abs(dy)
    if (len > maxLen) {
      const over = maxLen - len
      if (dx !== 0) last.x += over * (dx > 0 ? -1 : +1)
      if (dy !== 0) last.y += over * (dy > 0 ? -1 : +1)
      worm.splice(i + 1)
      break
    }
    nx = x
    ny = y
  }
}


export const run = () => {
  if (game.state === "run") move()
  draw()
  window.requestAnimationFrame(run)
}


const resize = () => {
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  canvas.width = width
  canvas.height = height

  game.width = width
  game.height = height
  game.wormWidth = width * 0.02

  if (game.state !== "run") draw()
}


window.addEventListener("resize", resize)
resize()


const turn = (direction: number) => {
  if (game.state !== "run") return
  const heading     = game.heading,
        nextHeading = heading + direction
  game.heading = (nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading
  game.worm.unshift({ ...game.worm[0] })
}


const action: { [state in State]: () => void } = {
  "run":       () => game.state = "paused",
  "paused":    () => game.state = "run",
  "game-over": () => initGame(),
}


document.addEventListener("keydown", ({ code }) => {
  if (code === "ArrowRight") {
    turn(1)
  } else if (code === "ArrowLeft") {
    turn(-1)
  } else if (code === "Space") {
    action[game.state]()
  } else if (code === "KeyD") {
    DEBUG = !DEBUG
  } else {
    console.log(`key: ${ code }`)
  }
})


initGame()
run()
