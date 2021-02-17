const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D


const GAME_WIDTH  = 1000,
      GAME_HEIGHT = GAME_WIDTH * 0.5625,
      WORM_WIDTH  = 20,
      HEADING     = [
        [0, -1], // Up
        [+1, 0], // Right
        [0, +1], // Down
        [-1, 0], // Left
      ]


const scaler = (fromMax: number, toMax: number) => {
  const r = toMax / fromMax
  return (x: number) => x * r
}


type Point = [x: number, y: number]


type Game = {
  width: number,
  height: number,
  scaleX: ReturnType<typeof scaler>,
  scaleY: ReturnType<typeof scaler>,
  wormWidth: number,
  wormLength: number,
  head: Point
  heading: number,
  joints: Point[],
}


const game: Game = {
  width:      0,
  height:     0,
  scaleX:     scaler(0, 0),
  scaleY:     scaler(0, 0),
  wormWidth:  0,
  wormLength: 100,
  head:       [700, 50],
  heading:    1,
  joints:     [[700, 50]],
}


const draw = () => {
  ctx.clearRect(0, 0, game.width, game.height)
  ctx.save()

  const joints = game.joints,
        [x, y] = game.head

  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.lineWidth = game.wormWidth
  ctx.strokeStyle = "#ff00ff"

  ctx.beginPath()
  ctx.moveTo(game.scaleX(joints[0][0]), game.scaleY(joints[0][1]))
  for (let i = 1; i < joints.length; i++) {
    ctx.lineTo(game.scaleX(joints[i][0]), game.scaleY(joints[i][1]))
  }
  ctx.lineTo(game.scaleX(x), game.scaleY(y))
  ctx.stroke()

  ctx.restore()
}


const move = (ts: number): boolean => {
  const [x, y]     = game.head,
        [dx, dy]   = HEADING[game.heading],
        [nx, ny]   = [x + dx, y + dy],
        reach      = game.wormWidth * 0.4,
        joints     = game.joints,
        wormLength = game.wormLength

  let length     = 0,
      jointCount = 0,
      cx         = nx,
      cy         = ny

  do {
    let [x, y] = joints[jointCount]
    length += Math.abs(cx - x) + Math.abs(cy - y)
    cx = x
    cy = y
    jointCount += 1
  } while (length < wormLength && jointCount < joints.length)

  if (jointCount < joints.length) {
    game.joints = joints.slice(0, jointCount - 1)
  }

  game.head = [nx, ny]
  return (nx >= reach)
      && (nx <= GAME_WIDTH - reach)
      && (ny >= reach)
      && (ny <= GAME_HEIGHT - reach)
}


export const run = (ts: number) => {
  const keepRunning = move(ts)
  draw()
  if (keepRunning) window.requestAnimationFrame(run)
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

  draw()
}


window.addEventListener("resize", resize)
resize()


const turn = (direction: number) => {
  const { head, heading, joints } = game,
        nextHeading               = heading + direction
  joints.push(head)
  game.heading = (nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading
}


document.addEventListener("keydown", ({ code }) => {
  if (code === "ArrowRight") {
    turn(1)
  } else if (code == "ArrowLeft") {
    turn(-1)
  }
})


run(0)
