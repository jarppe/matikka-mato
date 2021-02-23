export type Control = {
  handle: (x: number, y: number) => void
  draw: (ctx: CanvasRenderingContext2D, ts: number) => void
}

export type Page = {
  controls: Control[]
  key: (e:  KeyboardEvent) => void
}

