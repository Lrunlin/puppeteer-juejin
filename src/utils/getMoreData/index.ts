import type { Page } from "puppeteer";
import fs from "fs";
import getData from "./getData";
/**
 * 查询数据库内容进行初步去重
 * 传递链接和title列表，返回链接列表
 */
async function dataFilter(data: string[]): Promise<string[]> {
  let hrefHub: string[] = [];
  let dir = fs.readdirSync("public");
  for (let index = 0; index < data.length; index++) {
    const href = data[index];
    let id = href.replace("https://juejin.cn/post/", "");
    if (!dir.includes(id)) {
      hrefHub.push(href);
    }
  }
  return hrefHub;
}

async function getMoreData(page: Page): Promise<string[]> {
  let _d = await getData(page);
  let data = await dataFilter(_d);
  return data;
}
export default getMoreData;
