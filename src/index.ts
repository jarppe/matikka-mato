import { Heading, State } from "./types"
import * as sound from "./sounds"
import * as test from "./test"
import { canvas, toggleDebug, game } from "./state"
import { draw } from "./draw"
import { move } from "./move"


const initGame = () => {
  const x = game.width * 0.5,
        y = game.height * 0.5
  game.state = "run"
  game.maxWormLength = 300
  game.worm = [{ x, y  }, { x, y }]
  game.heading = 0
  game.speed = 1.5
  game.test = test.makeTest(Date.now())
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


document.addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "ArrowRight":
      return turn(TURN_RIGHT)
    case "ArrowLeft":
      return turn(TURN_LEFT)
    case "Space":
      return action[game.state]()
    case "KeyD":
      return toggleDebug()
    default:
      console.log(`key: ${ code }`)
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


const run = (ts: number) => {
  if (game.state === "run") move(ts)
  draw()
  window.requestAnimationFrame(run)
}

initGame()
run(Date.now())
