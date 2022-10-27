import fs from "fs";

function allowSetCover(path: string | null) {
  if (!path) {
    return null
  }
  let state = fs.statSync(path);
  //   封面文件小于100k才行
  return state.size < 100_000 ? path : null;
}
export default allowSetCover;
