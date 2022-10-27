function getRandom(n:number, m:number) {
  let num = Math.floor(Math.random() * (m - n + 1) + n);
  return num;
}
export default getRandom;