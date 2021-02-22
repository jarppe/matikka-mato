let sound = false


type Play = (name: string) => () => void


type AudioData = [HTMLAudioElement, string]
const audioData: AudioData[] = []
let audioInit = false


const makeAudio: Play = (name: string) => {
  const audio = new Audio()
  audioData.push([audio, `sounds/${ name }.mp3`])
  return () => {
    console.log("playing", name, sound)
    if (sound) {
      audio.play().catch(err => console.error(err))
    }
  }
}


export const crash = makeAudio("crash")
export const squeak = makeAudio("squeak")
export const chaching = makeAudio("chaching")


export const isSound = () => sound


export const toggleSound = () => {
  if (!audioInit) {
    // This must happen in click handler
    audioData.forEach(([audio, src]) => audio.src = src)
    audioInit = true
  }
  sound = !sound
}
