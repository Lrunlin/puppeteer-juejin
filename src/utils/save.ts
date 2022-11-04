import Browser from "../modules/browser";
import mysql from "../modules/mysql";
import { load } from "cheerio";
import sleep from "./sleep";
import switchImagePath from "./switchImagePath";
import downLoadImgae from "./downLoadImgae";
import language from "./language";
import axios from "axios";
import uploadImage from "./uploadImage";
import fs from "fs";
import allowSetCover from "./allowSetCover";
import changeLinkHref from "./changeLinkHref";
import removeJuejinTitle from "./removeJuejinTitle";
import { setCount } from "../modules/count";

let tagListawait = [] as { id: number; name: string }[];
mysql.query(`select id,name from tag;`).then(([rows]) => {
  tagListawait = rows as { id: number; name: string }[];
});

async function save(url: string) {
  console.log(`开始:${url} 的抓取`);
  let browser = await Browser();
  // 如果有掘金文章页面，就不在创建
  let page =
    (await (await browser.pages()).find(item => item.url().startsWith("https://juejin.cn/post"))) ||
    (await browser
      .newPage()
      .then(r => r)
      .catch(() => false as false));

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

  await sleep(5678);
  await page.waitForSelector("main");
  console.log("判断标签");
  //判断标签数
  let _tags = await (
    await page.$$eval(".tag-list-box .item", el => el.map(item => (item as any).innerText))
  )
    .map((item: string) => {
      return (
        tagListawait.find(_item =>
          _item.name.toLocaleLowerCase().includes(item.toLocaleLowerCase())
        )?.id ||
        tagListawait.find(_item =>
          item.toLocaleLowerCase().includes(_item.name.toLocaleLowerCase())
        )?.id
      );
    })
    .filter(item => item);
  if (!_tags.length) {
    console.log(`tag数量为0，不保存`);
    return;
  }
  let $ = load(await page.content());
  let title = $("title").eq(0).text().replace(/\n/g, "").replace(" - 掘金", "").substring(0, 190);

  let coverSrc = $(".article-hero").attr("src");
  let content = await switchImagePath(
    removeJuejinTitle(
      changeLinkHref(language($(".markdown-body").remove("style").html() as string))
    )
  );

  let description = $("meta[name=description]").attr("content")?.substring(0, 190) || null;
  let cover = coverSrc
    ? await uploadImage(allowSetCover(await downLoadImgae(coverSrc)), "cover")
    : null;
  let tag = ([...new Set(_tags)] as number[]).slice(0, 5);

  console.log("开始创建文章");
  return axios
    .post("/article", {
      content,
      title,
      cover_file_name: cover,
      description,
      tag,
      state: 1,
      reprint: url,
    })
    .then(res => {
      setCount();
      return res.data;
    })
    .catch(err => {
      console.log("创建文章失败");
      fs.writeFileSync(`log/${+new Date()}.txt`, `创建文章错误\n${JSON.stringify(err)}`);
      return false;
    })
    .finally(async () => {
      console.log(`结束:${url} 的抓取`);
    });
}
export default save;
