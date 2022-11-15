import type { Page } from "puppeteer";
import axios from "axios";
import sleep from "./sleep";
import { v4 } from "uuid";
import mime from "mime";
import Browser from "../modules/browser";
import fs from "fs";

/** 根据文件路径返回对应的buffer*/
async function download(url: string, src: string) {
  let browser = await Browser();
  let page =
    (await (await browser.pages()).find(item => item.url().startsWith("https://juejin.cn/post"))) ||
    (await browser
      .newPage()
      .then(r => r)
      .catch(() => false as false));

  if (!page) {
    throw new Error("创建Page失败");
  }

  const articleID = (page as Page).url().replace("https://juejin.cn/post/", "");
  if (!fs.existsSync(`public/${articleID}`)) fs.mkdirSync(`public/${articleID}`);
  if (!fs.existsSync(`public/${articleID}/${src}`)) fs.mkdirSync(`public/${articleID}/${src}`);

  await sleep(1898);
  return axios
    .get(url, {
      responseType: "arraybuffer", // 特别注意，需要加上此参数
    })
    .then(res => {
      let _buffer = Buffer.from(res.data);
      let ext = mime.getExtension(res.headers["content-type"]);
      const fileName = `${v4().replace(/-/g, "")}.${ext}`;
      let imagePath = `public/${articleID}/${src}/${fileName}`;
      fs.writeFileSync(imagePath, _buffer);
      return fileName;
    })
    .catch(err => {
      console.log(`文章ID:${articleID},目录:${src}  下载错误`, "\n", err);
      return null;
    });
}
export default download;
