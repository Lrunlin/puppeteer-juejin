import axios from "axios";
import sleep from "./sleep";
import { v4 } from "uuid";
import mime from "mime";
import fs from "fs";

/** 根据文件路径返回对应的buffer*/
async function download(url: string) {
  await sleep(1898);
  return axios
    .get(url, {
      responseType: "arraybuffer", // 特别注意，需要加上此参数
    })
    .then(res => {
      let _buffer = Buffer.from(res.data);
      let ext = mime.getExtension(res.headers["content-type"]);
      let imagePath = `public/${v4()}.${ext}`;
      fs.writeFileSync(imagePath, _buffer);
      return imagePath;
    })
    .catch(err => {
      return null;
    });
}
export default download;
