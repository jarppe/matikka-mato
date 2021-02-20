import { Test } from "./types"

// export type Option = {
//   name: string
//   correct: boolean
//   position: Point
// }
//
// export type Test = {
//   question: string
//   answer: string
//   started: number
//   timeout: number
//   options: {
//     [key: string]: Option
//   }
// }

export const makeTest = (now: number): Test => {
  return {
    question: "1 + 3",
    answer: "4",
    started: now,
    timeout: now + 30000,
    options: [
      {
        name: "4",
        correct: true,
        position: {x: 500, y: 500}
      },
      {
        name: "25",
        correct: false,
        position: {x: 600, y: 600}
      }
    ]
  }
}
