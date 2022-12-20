import { load } from "cheerio";

/** 删除包含掘金二字的元素*/
function removeJueJinKeyWord(content: string) {
  let $ = load(content);
  $("body>*").each((i, el) => {
    if (
      $(el).text().includes("掘金") ||
      $(el).text().includes("本文正在参加") ||
      $(el).text().includes("文章正在参加") ||
      $(el).text().includes("本文为稀土掘金技术社区")
    ) {
      $(el).remove();
    }
    if (i < 3 && $(el).text().includes("计划")) {
      $(el).remove();
    }
  });
  return $("body").html() + "";
}
export default removeJueJinKeyWord;
