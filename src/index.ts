import { State, Heading, UP, RIGHT, DOWN, LEFT } from "./types"
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


const turnHeading: Heading[][] = [
  /* ...Up: */ [UP, RIGHT, UP, LEFT],
  /* Right: */ [UP, RIGHT, DOWN, RIGHT],
  /* .Down: */ [DOWN, RIGHT, DOWN, LEFT],
  /* .Left: */ [UP, LEFT, DOWN, LEFT],
]


const turn = (direction: Heading) => {
  const { state, heading } = game

  if (state !== "run") return

  const newHeading = turnHeading[heading][direction]
  if (newHeading !== heading) {
    game.heading = newHeading
    game.worm.unshift({ ...game.worm[0] })
  }
}


const run = () => {
  game.tick = 0
  game.state = "run"
}


const pause = () => {
  game.state = "paused"
}


const spaceKeyAction: { [state in State]: () => void } = {
  "new":       run,
  "run":       pause,
  "paused":    run,
  "game-over": initGame,
}


document.addEventListener("keydown", (e) => {
  const { code, repeat } = e
  if (repeat) return
  switch (code) {
    case "ArrowUp":
      e.preventDefault()
      return turn(UP)
    case "ArrowRight":
      e.preventDefault()
      return turn(RIGHT)
    case "ArrowDown":
      e.preventDefault()
      return turn(DOWN)
    case "ArrowLeft":
      e.preventDefault()
      return turn(LEFT)
    case "Space":
      e.preventDefault()
      return spaceKeyAction[game.state]()
    case "Escape":
      e.preventDefault()
      return initGame()
    case "KeyD":
      e.preventDefault()
      return toggleDebug()
    default:
      console.log(`key: ${ code } (${ repeat })`)
  }
})


const controlButtonAction: { [state in State]: () => void } = {
  "new":       run,
  "run":       pause,
  "paused":    run,
  "game-over": initGame,
}


const controlButton = () => {
  controlButtonAction[game.state]()
}


const controlEvent = (tx: number, ty: number) => {
  const { x, y, r, dx, dy } = control
  const cx     = tx - x - dx,
        cy     = ty - y - dy,
        pauseR = r * 0.2

  if ((Math.abs(cx) > r) || Math.abs(cy) > r) {
    control.tx = null
    control.ty = null
    control.selected = null
    return
  }

  control.tx = tx - dx
  control.ty = ty - dy

  if ((Math.abs(cy) < pauseR) && (Math.abs(cx) < pauseR)) {
    control.selected = null
    controlButton()
    return
  }

  if (Math.abs(cy) < Math.abs(cx)) {
    control.selected = cx < 0 ? 3 : 1
  } else {
    control.selected = cy < 0 ? 0 : 2
  }

  turn(control.selected)
}


const touch = (e: TouchEvent) => {
  e.preventDefault()
  e.stopPropagation()
  const t = e.touches[0],
        x = t?.clientX,
        y = t?.clientY
  if (x && y) controlEvent(x, y)
}


const controlClear = (e: TouchEvent | MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  control.tx = null
  control.ty = null
  control.selected = null
}


canvas.addEventListener("touchstart", touch)
canvas.addEventListener("touchmove", touch)
canvas.addEventListener("touchend", controlClear)


canvas.addEventListener("mousedown", e => {
  e.preventDefault()
  controlEvent(e.clientX, e.clientY)
})


canvas.addEventListener("mouseup", controlClear)
canvas.addEventListener("mouseout", controlClear)
canvas.addEventListener("mouseleave", controlClear)


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


const gameLoop = (ts: number) => {
  if (game.tick === 0) game.tick = ts
  if (game.state === "run") move(ts)
  draw(ts)
  window.requestAnimationFrame(gameLoop)
}


const init = () => {
  resize()
  initGame()
  window.requestAnimationFrame(gameLoop)
}


window.requestAnimationFrame(init)
