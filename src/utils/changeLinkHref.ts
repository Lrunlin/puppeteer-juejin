import sleep from "./sleep";
import downLoadImgae from "./downLoadImgae";
import { load } from "cheerio";

/**
 * todo 修改a标签中的href属性
 * */
function changeLinkHref(content: string) {
  console.log("开始修改超链接路径");
  let $ = load(content);
  $("a").map((index, item) => {
    let href = $(item).attr("href") + "";
    if (href.includes("juejin.cn") && href.includes("target=")) {
      $(item).attr("href", href.split("target=")[1]);
    }
  });

  console.log("超链接路径修改结束");
  return $("body").html() as string;
}
export default changeLinkHref;
