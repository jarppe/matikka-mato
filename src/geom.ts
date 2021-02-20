import { Point, Line } from "./types"


export const distance = (line: Line, e: Point): number => {
  const [a, b]    = line,
        ab: Point = { x: b.x - a.x, y: b.y - a.y },
        be: Point = { x: e.x - b.x, y: e.y - b.y },
        ae: Point = { x: e.x - a.x, y: e.y - a.y },
        ab_be     = ab.x * be.x + ab.y * be.y,
        ab_ae     = ab.x * ae.x + ab.y * ae.y

  if (ab_be > 0) {
    const y = e.y - b.y,
          x = e.x - b.x
    return Math.sqrt(x * x + y * y)
  }

  if (ab_ae < 0) {
    const y = e.y - a.y,
          x = e.x - a.x
    return Math.sqrt(x * x + y * y)
  }

  const x1 = ab.x,
        y1 = ab.y,
        x2 = ae.x,
        y2 = ae.y
  return Math.abs(x1 * y2 - y1 * x2) / Math.sqrt(x1 * x1 + y1 * y1)
}

// Given three colinear points a, b, c, the function checks if
// point b lies on line segment 'a-c':

export const onSegment = (a: Point, b: Point, c: Point): boolean =>
    b.x <= Math.max(a.x, c.x) &&
    b.x >= Math.min(a.x, c.x) &&
    b.y <= Math.max(a.y, c.y) &&
    b.y >= Math.min(a.y, c.y)


// To find orientation of ordered triplet (a, b, c).
// The function returns following values
// 0 --> a, b and c are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
// See https://www.geeksforgeeks.org/orientation-3-ordered-points/

export const COLINEAR          = 0,
             CLOCKWISE         = 1,
             COUNTER_CLOCKWISE = 2

export const orientation = (a: Point, b: Point, c: Point): 0 | 1 | 2 => {
  const val = ((b.y - a.y) * (c.x - b.x)) - ((b.x - a.x) * (c.y - b.y))
  return (val === 0) ? COLINEAR : (val > 0) ? CLOCKWISE : COUNTER_CLOCKWISE
}


// The function that returns true if line segment 'a1-a2' and 'b1-b2' intersect:

export const intersect = (a1: Point, a2: Point) => (b1: Point, b2: Point): boolean => {
  const o1 = orientation(a1, a2, b1),
        o2 = orientation(a1, a2, b2),
        o3 = orientation(b1, b2, a1),
        o4 = orientation(b1, b2, a2)

  // General case
  if (o1 !== o2 && o3 !== o4) return true

  // Special Cases:

  // a1, a2 and b1 are colinear and b1 lies on segment a1-a2
  if (o1 === 0 && onSegment(a1, b1, a2)) return true

  // a1, a2 and b2 are colinear and b2 lies on segment a1-a2
  if (o2 === 0 && onSegment(a1, b2, a2)) return true

  // b1, b2 and a1 are colinear and a1 lies on segment b1-b2
  if (o3 === 0 && onSegment(b1, a1, b2)) return true

  // b1, b2 and a2 are colinear and a2 lies on segment b1-b2
  if (o4 === 0 && onSegment(b1, a2, b2)) return true

  return false // Doesn't fall in any of the above cases
}
