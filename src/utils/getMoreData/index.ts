import type { Page } from "puppeteer";
import mysql from "../../modules/mysql";

import getData from "./getData";
/**
 * 查询数据库内容进行初步去重
 * 传递链接和title列表，返回链接列表
 */
async function dataFilter(data: { href: string; title: string }[]): Promise<string[]> {
  let hrefHub: string[] = [];
  for (let index = 0; index < data.length; index++) {
    const { href, title } = data[index];
    let [row] = await mysql.execute(`SELECT id from article WHERE title=? or reprint=?;`, [
      title,
      href,
    ]);
    if (!(row as any[]).length) hrefHub.push(href);
  }
  return hrefHub;
}

async function getMoreData(page: Page): Promise<string[]> {
  let _d = await getData(page);
  let data = await dataFilter(_d);
  return data;
}
export default getMoreData;
