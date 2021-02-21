const sound = new URLSearchParams(window.location.search).get("sound") !== "false"

type Play = (name: string) => () => void

const play: Play = sound ?
    (name: string) => {
      const audio = new Audio(`sounds/${ name }.mp3`)
      return () => { audio.play().catch(err => console.error(err)) }
    }
    :
    (name: string) => () => {
      console.log("play:", name)
    }


export const crash = play("crash")
export const squeak = play("squeak")
export const chaching = play("chaching")
