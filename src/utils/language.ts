import { load } from "cheerio";

/** 为文章内容中的Pre标签设置language*/
function setCodeBarLanguage(content: string) {
  let $ = load(content);
  $(".copy-code-btn").remove();//删除复制代码按钮
  $("pre").each((index, item) => {
    let _codeClassName = $(item).children("code").attr("class");
    let calssName = _codeClassName
      ? _codeClassName
          .split(" ")
          .filter(item => item.startsWith("language-"))
          .join("")
      : false;
    if (calssName) {
      $(item).attr("class", calssName || "language-javascript");
      $(item).children("code").removeAttr("class");
    }
  });
  console.log("pre language切换成功");

  return $("body").html() + "";
}
export default setCodeBarLanguage;
