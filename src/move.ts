import { game, HEADING } from "./state"
import * as sound from "./sounds"
import { distancer, intersect } from "./geom"
import { makeTest } from "./test"


const moveWorm = () => {
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
    sound.crash()
    game.state = "game-over"
    return
  }

  // Run onto itself?
  const [a1, a2] = worm,
        a0       = {
          x: a1.x + (heading.x * wormWidth),
          y: a1.y + (heading.y * wormWidth),
        },
        cross    = intersect(a0, a2)
  for (let i = 3; i < worm.length; i++) {
    const b1 = worm[i - 1],
          b2 = worm[i]
    if (cross(b1, b2)) {
      sound.crash()
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


const checkTest = (ts: number) => {
  const { wormWidth, test, worm } = game
  if (!test) return
  const options  = test.options,
        dist     = distancer(worm[0]),
        optIndex = options.findIndex(({ position }) => dist(position) < wormWidth),
        opt      = options[optIndex]
  if (opt) {
    if (opt.correct) {
      sound.chaching()
      game.test = makeTest(ts)
    } else {
      sound.squeak()
      options.splice(optIndex, 1)
      console.log("WRONG", optIndex, opt.name)
    }
  }
}


export const move = (ts: number) => {
  moveWorm()
  checkTest(ts)
}


