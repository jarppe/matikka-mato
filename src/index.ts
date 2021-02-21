import { Heading, State } from "./types"
import * as test from "./test"
import { canvas, toggleDebug, game, control } from "./state"
import { draw } from "./draw"
import { move } from "./move"


const initGame = () => {
  const x = game.width * 0.5,
        y = game.height * 0.5
  game.state = "new"
  game.maxWormLength = 300
  game.worm = [{ x, y }, { x, y }]
  game.heading = 0
  game.speed = 0.07 * (game.width / 1200)
  game.test = test.makeTest()
  game.points = 0
  game.level = 0
  game.tick = 0
}


const applyDirection = (heading: Heading, direction: -1 | 1): Heading => {
  const nextHeading = heading + direction
  return ((nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading) as Heading
}


const turn = (direction: -1 | 1) => {
  if (game.state !== "run") return
  game.heading = applyDirection(game.heading, direction)
  game.worm.unshift({ ...game.worm[0] })
}


const action: { [state in State]: () => void } = {
  "new":       () => {
    game.tick = 0
    game.state = "run"
  },
  "run":       () => {
    game.state = "paused"
  },
  "paused":    () => {
    game.tick = 0
    game.state = "run"
  },
  "game-over": () => {
    initGame()
  },
}


const TURN_LEFT  = -1,
      TURN_RIGHT = 1


document.addEventListener("keydown", ({ code, repeat }) => {
  if (repeat) return
  switch (code) {
    case "ArrowRight":
      return turn(TURN_RIGHT)
    case "ArrowLeft":
      return turn(TURN_LEFT)
    case "Space":
      return action[game.state]()
    case "Escape":
      return initGame()
    case "KeyD":
      return toggleDebug()
    default:
      console.log(`key: ${ code } (${ repeat })`)
  }
})


const resize = () => {
  const width     = canvas.clientWidth,
        height    = canvas.clientHeight,
        cbr       = canvas.getBoundingClientRect(),
        wormWidth = width * 0.02

  canvas.width = width
  canvas.height = height

  game.width = width
  game.height = height
  game.wormWidth = wormWidth

  control.r = height * 0.2
  control.x = width - control.r - wormWidth
  control.y = height - control.r - wormWidth
  control.dx = cbr.left + 4
  control.dy = cbr.top + 4
  control.selected = null
}


window.addEventListener("resize", resize)
resize()


const touch = (tx: number, ty: number) => {
  const { x, y, r, dx, dy } = control
  const cx = tx - x - dx,
        cy = ty - y - dy

  if ((Math.abs(cx) > r) || Math.abs(cy) > r) {
    control.tx = null
    control.ty = null
    control.selected = null
    return
  }

  control.tx = tx - dx
  control.ty = ty - dy

  if (Math.abs(cy) < Math.abs(cx)) {
    control.selected = cx < 0 ? 3 : 1
  } else {
    control.selected = cy < 0 ? 0 : 2
  }
}


canvas.addEventListener("touchstart", e => {
  e.preventDefault()
  const t = e.touches[0],
        x = t?.clientX,
        y = t?.clientY
  if (x && y) touch(x, y)
})


canvas.addEventListener("mousemove", e => {
  e.preventDefault()
  touch(e.clientX, e.clientY)
})


const run = (ts: number) => {
  if (game.tick === 0) game.tick = ts
  if (game.state === "run") move(ts)
  draw(ts)
  window.requestAnimationFrame(run)
}

initGame()
window.requestAnimationFrame(run)
