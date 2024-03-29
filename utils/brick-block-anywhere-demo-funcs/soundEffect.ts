export const setSoundEffect = () => {
  for (let i = 1; i < 5; i++) {
    const soundEffect = document.createElement("audio");
    soundEffect.src = `/brick-block-anywhere-demo/sound/${i}.mp3`;
    soundEffect.id = `se${i}`;
    soundEffect.autoplay = true;
    document.body.appendChild(soundEffect);
  }
  let current = null;
  const ring = () => {
    const random = Math.floor(Math.random() * 4) + 1;
    const audio = document.getElementById(`se${random}`) as HTMLAudioElement; // TODO: remove type assertion
    if (current) {
      current.pause();
      current.currentTime = 0;
    }
    audio.play();
    current = audio;
  };
  return ring;
};
