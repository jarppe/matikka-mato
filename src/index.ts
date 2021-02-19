let DEBUG: boolean = window.location.search.indexOf("debug") > 0
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D


type Point = [number, number]


type State = "run" | "paused" | "end"


const GAME_WIDTH       = 1000,
      GAME_HEIGHT      = GAME_WIDTH * 0.5625,
      WORM_WIDTH       = 20,
      HEADING: Point[] = [
        [0, -1], // Up
        [+1, 0], // Right
        [0, +1], // Down
        [-1, 0], // Left
      ]


const scaler = (fromMax: number, toMax: number) => {
  const r = toMax / fromMax
  return (x: number) => x * r
}


type Game = {
  state: State,
  width: number,
  height: number,
  wormWidth: number,
  maxWormLength: number,
  scaleX: ReturnType<typeof scaler>,
  scaleY: ReturnType<typeof scaler>,
  worm: Point[],
  heading: number,
}


const game: Game = {
  state:         "paused",
  width:         0,
  height:        0,
  wormWidth:     0,
  maxWormLength: 0,
  scaleX:        scaler(0, 0),
  scaleY:        scaler(0, 0),
  worm:          [],
  heading:       0,
}


const initGame = () => {
  game.state = "run"
  game.maxWormLength = 100
  game.worm = [[200, 200], [200, 200]]
  game.heading = 1
}


const drawDebugInfo = () => {
  const debugData = [
    `state:    ${ game.state }`,
    ...(game.worm.map(([x, y], i) => `${ i === 0 ? "worm:    " : "         " } [${ i }] ${ x.toFixed(0) } : ${ y.toFixed(0) }`)),
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


const draw = () => {
  ctx.clearRect(0, 0, game.width, game.height)

  ctx.save()

  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.lineWidth = game.wormWidth
  ctx.strokeStyle = "#ff00ff"

  ctx.beginPath()
  const worm = game.worm
  const head = worm[0]
  if (head) ctx.moveTo(game.scaleX(head[0]), game.scaleX(head[1]))
  for (let i = 1; i < worm.length; i++) {
    const [x, y] = worm[i]
    ctx.lineTo(game.scaleX(x), game.scaleY(y))
  }
  ctx.stroke()

  if (DEBUG) drawDebugInfo()

  ctx.restore()
}


const move = () => {
  const worm     = game.worm,
        head     = worm[0],
        [dx, dy] = HEADING[game.heading],
        [x, y]   = head,
        reach    = game.wormWidth * 0.4,
        maxLen   = game.maxWormLength

  let len = 0,
      nx  = x + dx,
      ny  = y + dy

  head[0] = nx
  head[1] = ny

  if ((nx < reach) || (nx > GAME_WIDTH - reach) || (ny < reach) || (ny > GAME_HEIGHT - reach)) {
    game.state = "end"
    return
  }

  for (let i = 1; i < worm.length; i++) {
    const last   = worm[i],
          [x, y] = last,
          dx     = nx - x,
          dy     = ny - y
    len += Math.abs(dx) + Math.abs(dy)
    if (len > maxLen) {
      const over = maxLen - len
      if (dx !== 0) last[0] += over * (dx > 0 ? -1 : +1)
      if (dy !== 0) last[1] += over * (dy > 0 ? -1 : +1)
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
  game.scaleX = scaler(GAME_WIDTH, width)
  game.scaleY = scaler(GAME_HEIGHT, height)
  game.wormWidth = game.scaleX(WORM_WIDTH)

  if (game.state !== "run") draw()
}


window.addEventListener("resize", resize)
resize()


const turn = (direction: number) => {
  if (game.state !== "run") return
  const heading     = game.heading,
        nextHeading = heading + direction
  game.heading = (nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading
  game.worm.unshift([...game.worm[0]])
}


const action: { [state in State]: () => void } = {
  "run":    () => game.state = "paused",
  "paused": () => game.state = "run",
  "end":    () => initGame(),
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
