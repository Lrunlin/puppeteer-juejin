import sleep from "./sleep";
import downLoadImgae from "./downLoadImgae";
import { load } from "cheerio";
import uploadImage from "./uploadImage";
import random from "./random";

/**
 * todo 将爬取的文章中的图片上传OSS并且置换其中的路径
 * ?上传至server文件夹的接口
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
    let _imagePath = await downLoadImgae(path);
    if (_imagePath) {
      console.log("下载成功，开始上传");
      let newImagePath = await uploadImage(_imagePath as string, "article");
      if (newImagePath) {
        $("img").eq(index).attr("src", newImagePath);
        console.log("上传并置换成功");
      } else {
        $("img").eq(index).remove();
        console.log("上传失败");
      }
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
