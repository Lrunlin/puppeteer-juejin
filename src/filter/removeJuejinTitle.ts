import { load } from "cheerio";

/** 删除部分文章开头的掘金XXX计划标题*/
function setCodeBarLanguage(content: string) {
  let $ = load(content);
  let text = $(".markdown-body p").first().text();
  if (text.includes("掘金") || text.includes("计划") || text.includes("参加")) {
    $(".markdown-body p").first().remove();
  }
  return $("body").html() + "";
}
export default setCodeBarLanguage;
