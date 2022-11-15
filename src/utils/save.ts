import Browser from "../modules/browser";
import { load } from "cheerio";
import sleep from "./sleep";
import switchImagePath from "../filter/switchImagePath";
import downLoadImgae from "./downLoadImgae";
import language from "../filter/language";
import fs from "fs";
import changeLinkHref from "../filter/changeLinkHref";
import removeJuejinTitle from "../filter/removeJuejinTitle";
import articleID from "../store/articleID";

async function save(url: string) {
  console.log(`开始:${url} 的抓取`);
  let browser = await Browser();
  await sleep(800);
  // 如果有掘金文章页面，就不在创建
  let page = await browser
    .newPage()
    .then(r => r)
    .catch(() => false as false);

  if (!page) {
    return;
  }

  let status = await page
    .goto(url, { timeout: 0 })
    .then(r => (r?.status() == 200 ? r : (false as false)))
    .catch(() => false as false);

  if (!status) {
    return;
  }
  articleID.set(url.replace("https://juejin.cn/post/", ""));

  await page.waitForSelector("main");
  await sleep(1678);

  //滚动到底部
  await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      let _height = -1;
      let timer = setInterval(() => {
        let height = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(height, _height);
        if (height == _height) {
          clearInterval(timer);
          resolve("");
        }
        _height = height;
        (document.getElementById("comment-box") as HTMLDivElement).scrollIntoView({
          behavior: "smooth",
        });
      }, 600);
    });
  });
  await sleep(1678);

  //获取标签
  let tags = await page.$$eval(".tag-list-box .item", el =>
    el.map(item => (item as any).innerText)
  );

  let $ = load(await page.content());
  let title = $("title").eq(0).text().replace(/\n/g, "").replace(" - 掘金", "").substring(0, 190);

  let coverSrc = $(".article-hero").attr("src");
  let content = await switchImagePath(
    removeJuejinTitle(
      changeLinkHref(
        language($(".markdown-body").remove("style").remove("iframe").html() as string)
      )
    )
  );

  let description = $("meta[name=description]").attr("content")?.substring(0, 190) || null;

  console.log("开始保存数据");
  let id = page.url().replace("https://juejin.cn/post/", "");
  if (!fs.existsSync(`public/${id}`)) fs.mkdirSync(`public/${id}`);
  fs.writeFileSync(`public/${id}/content.txt`, content);
  fs.writeFileSync(`public/${id}/title.txt`, title);
  if (description) fs.writeFileSync(`public/${id}/description.txt`, description);
  fs.writeFileSync(`public/${id}/tags.txt`, tags.join("-"));
  fs.writeFileSync(`public/${id}/reprint.txt`, url);
  if (coverSrc) await downLoadImgae(coverSrc, "cover");
  console.log(`结束:${url} 的抓取`);
  await page.close();
  return true;
}
export default save;
