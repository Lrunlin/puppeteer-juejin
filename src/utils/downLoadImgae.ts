import axios from "axios";
import sleep from "./sleep";
import { v4 } from "uuid";
import sharp from "sharp";
import fs from "fs";
import article from "../store/articleID";
import config from "../config";

/** 根据文件路径返回对应的buffer*/
async function download(url: string, src: string) {
  const articleID = article.get();
  if (!fs.existsSync(`public/${articleID}`)) fs.mkdirSync(`public/${articleID}`);
  if (!fs.existsSync(`public/${articleID}/${src}`)) fs.mkdirSync(`public/${articleID}/${src}`);

  await sleep(1898);
  let buffer = await axios
    .get(url, {
      responseType: "arraybuffer", // 特别注意，需要加上此参数
    })
    .then(res => Buffer.from(res.data))
    .catch(err => {
      console.log(`文章ID:${articleID},目录:${src}  下载错误`, "\n", err);
      return null;
    });
  if (!buffer) {
    return buffer;
  }
  const fileName = `${v4().replace(/-/g, "")}.webp`;
  let imagePath = `public/${articleID}/${src}/${fileName}`;

  return sharp(buffer, { animated: true })
    .webp({ quality: config.quality || 100})
    .toFile(imagePath)
    .then(res => fileName)
    .catch(() => null);
}
export default download;
