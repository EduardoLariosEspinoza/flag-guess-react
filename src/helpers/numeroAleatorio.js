export default function numeroAleatorio(min, max) {
  if (max == 0) {
    max = 1;
  }

  return Math.floor(Math.random() * max) + min;
}
