import { Option, Point, Test } from "./types"
import { game } from "./state"
import { distancer } from "./geom"


const randomPointMaker = () => {
  const { width, height, worm, wormWidth } = game
  const makePoint = (): Point => {
          const x = Math.random() * (width - (wormWidth * 4)) + (wormWidth * 2),
                y = Math.random() * (height - (wormWidth * 4)) + (wormWidth * 2)
          return { x, y }
        },
        margin    = wormWidth * 3,
        points    = [worm[0]],
        ok        = (p: Point) => {
          const dist = distancer(p)
          return points.every(op => dist(op) > margin)
        }
  return (): Point => {
    while (true) {
      const p = makePoint()
      if (ok(p)) {
        points.push(p)
        return p
      }
    }
  }
}


const wrongNumberMaker = (correct: number) => (): number => {
  const r = (): number => 1 + Math.floor(Math.random() * 10)
  while (true) {
    const n = r()
    if (n !== correct) return n
  }
}


export const makeTest = (now: number): Test => {
  const options: Option[] = [],
        count             = 3 + Math.round(Math.random() * 3),
        randomPoint       = randomPointMaker(),
        a                 = 1 + Math.floor(Math.random() * 5),
        b                 = 1 + Math.floor(Math.random() * 5),
        c                 = a + b,
        wrongNumber       = wrongNumberMaker(c)

  options.push({
    name:     c.toString(10),
    correct:  true,
    position: randomPoint(),
  })

  for (let i = 0; i < count; i++) {
    options.push({
      name:     wrongNumber().toString(10),
      correct:  false,
      position: randomPoint(),
    })
  }

  return {
    question: `${ a } + ${ b }`,
    answer:   `${ c }`,
    started:  now,
    timeout:  now + 30000,
    options,
  }
}
