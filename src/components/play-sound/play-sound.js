export default function PlaySound(url, time, vol) {
  const audio = new Audio(`/src/assets/sounds/${url}`);
  audio.volume = vol;
  setTimeout(() => { audio.play(); }, time);
}
