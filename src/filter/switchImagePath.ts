import sleep from "../utils/sleep";
import downLoadImgae from "../utils/downLoadImgae";
import { load } from "cheerio";
import random from "../utils/random";

/**
 * todo 将爬取的文章中的图片保存
 * */
async function switchImagePath(content: string) {
  let $ = load(content);
  let images = $("img")
    .map((index, item) => $(item).attr("src"))
    .get()
    .filter(item => item);

  console.log(`开始切换图片路径，共${images.length}张`);
  for (let path of images) {
    let index = images.findIndex(item => item == path);
    await sleep(random(1500, 2100));

    let _imagePath = await downLoadImgae(path, "article");
    if (_imagePath) {
      console.log("下载成功");
      $("img").eq(index).attr("src", _imagePath);
    } else {
      $("img").eq(index).remove();
      console.log("下载失败");
    }
    console.log(`图片切换进度  ${images.findIndex(item => item == path) + 1}/${images.length}`);
  }

  console.log("图片切换完成");
  await sleep(random(1500, 2100));
  return $("body").html() as string;
}
export default switchImagePath;
