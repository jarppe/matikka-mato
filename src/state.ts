import { Game, Heading, Point } from "./types"


let debug = new URLSearchParams(window.location.search).get("debug") === "true"


export const isDebug = () => debug
export const toggleDebug = () => debug = !debug

export const canvas = document.getElementById("game") as HTMLCanvasElement
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
export const isMobile = "ontouchstart" in document.documentElement


export const HEADING: Point[] = [
  { x: 0, y: -1 }, // Up
  { x: +1, y: 0 }, // Right
  { x: 0, y: +1 }, // Down
  { x: -1, y: 0 }, // Left
]


export const game: Game = {
  state:         "paused",
  width:         0,
  height:        0,
  wormWidth:     0,
  maxWormLength: 0,
  worm:          [],
  heading:       0,
  speed:         0,
  test:          null,
  points:        0,
  level:         0,
  tick:          0,
}


export type Control = {
  x: number
  y: number
  r: number
  dx: number
  dy: number
  selected: Heading | null
  tx: number | null
  ty: number | null
}


export const control: Control = {
  x:        0,
  y:        0,
  r:        0,
  dx:       0,
  dy:       0,
  selected: null,
  tx:       null,
  ty:       null,
}
