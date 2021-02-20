const play = (name: string) => {
  const audio = new Audio(`sounds/${ name }.mp3`)
  return () => { audio.play().catch(err => console.error(err)) }
}

export const crash = play("crash")
export const squeak = play("squeak")
export const chaching = play("chaching")
