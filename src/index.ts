import { Heading, State } from "./types"
import * as test from "./test"
import { canvas, toggleDebug, game } from "./state"
import { draw } from "./draw"
import { move } from "./move"


const initGame = () => {
  const x = game.width * 0.5,
        y = game.height * 0.5
  game.state = "run"
  game.maxWormLength = 300
  game.worm = [{ x, y }, { x, y }]
  game.heading = 0
  game.speed = 0.05 * (game.width / 1200)
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
  "run":       () => game.state = "paused",
  "paused":    () => game.state = "run",
  "game-over": () => initGame(),
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


canvas.addEventListener("touchstart", e => {
  const { state, width } = game,
        b1               = width * 0.3,
        b2               = width * 0.7

  e.preventDefault()

  if (state === "run") {
    const touch = e.touches[0],
          x     = touch?.clientX
    if (x < b1) return turn(TURN_LEFT)
    if (x > b2) return turn(TURN_RIGHT)
  }

  return action[state]()
})


const run = (ts: number) => {
  if (game.tick === 0) game.tick = ts
  if (game.state === "run") move(ts)
  draw()
  window.requestAnimationFrame(run)
}

initGame()
window.requestAnimationFrame(run)
