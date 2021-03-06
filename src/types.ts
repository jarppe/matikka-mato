export type Point = { x: number, y: number }
export type Line = [Point, Point]
export type State = "new" | "run" | "paused" | "game-over"

export type Option = {
  name: string
  correct: boolean
  position: Point
}

export type Test = {
  question: string
  answer: string
  created: number
  options: Option[]
}


export type Heading = 0 | 1 | 2 | 3


export const UP: Heading = 0
export const RIGHT: Heading = 1
export const DOWN: Heading = 2
export const LEFT: Heading = 3


export type Game = {
  state: State
  width: number
  height: number
  wormWidth: number
  maxWormLength: number
  worm: Point[]
  heading: Heading
  speed: number
  test: Test | null
  points: number
  level: number
  tick: number
}
