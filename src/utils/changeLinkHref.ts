import { load } from "cheerio";

/**
 * todo 修改a标签中的href属性
 * */
function changeLinkHref(content: string) {
  console.log("开始修改超链接路径");
  let $ = load(content);
  $("a").each((index, item) => {
    let href = $(item).attr("href") + "";
    if (href == "https://link.juejin.cn/?target=") {
      $(item).remove();
      return;
    }
    if (href.includes("juejin.cn") && href.includes("target=")) {
      $(item).attr("href", decodeURIComponent(href.split("target=")[1]));
    } else {
      $(item).attr("href", decodeURIComponent(href));
    }
  });

  console.log("超链接路径修改结束");
  return $("body").html() as string;
}
export default changeLinkHref;
