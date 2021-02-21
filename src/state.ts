import { Game, Point } from "./types"


let debug = new URLSearchParams(window.location.search).get("debug") === "true"


export const isDebug = () => debug
export const toggleDebug = () => debug = !debug

export const canvas = document.getElementById("canvas") as HTMLCanvasElement
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D


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


const averageTdBufferLen = 30
const averageTdBuffer = new Array<number>(averageTdBufferLen)
let averageTdBufferIndex = 0

export const addTd = (td: number) => {
  averageTdBuffer[averageTdBufferIndex++] = td
  if (averageTdBufferIndex > averageTdBufferLen) averageTdBufferIndex = 0
}

export const averageTd = () => averageTdBuffer.reduce((a, b) => a + b, 0) / averageTdBufferLen
