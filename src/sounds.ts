let sound = false


type Play = (name: string) => () => void


type AudioData = [HTMLAudioElement, string]
const audioData: AudioData[] = []
let audioInit = false


const play: Play = (name: string) => {
  const audio = new Audio()
  audioData.push([audio, `sounds/${ name }.mp3`])
  return () => {
    console.log("playing", name, sound)
    if (sound) {
      audio.play().catch(err => console.error(err))
    }
  }
}


export const crash = play("crash")
export const squeak = play("squeak")
export const chaching = play("chaching")


export const isSound = () => sound


export const toggleSound = () => {
  if (!audioInit) {
    // This must happen in click handler
    audioData.forEach(([audio, src]) => audio.src = src)
    audioInit = true
  }
  sound = !sound
}
