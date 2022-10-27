function sleep(time?: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('');
    }, time || 2000);
  });
}
export default sleep;