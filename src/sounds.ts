const crashAudio = new Audio("sounds/crash.mp3")

export const crash = () => { crashAudio.play().catch(err => console.error(err)) }
