import axios from "axios";
import Browser from "./modules/browser";
import tags from "./utils/tags";
import loadMoreData from "./utils/loadMoreData";
import save from "./utils/save";
import config from "./config";
import sleep from "./utils/sleep";

axios.defaults.baseURL = config.apiHost;
axios.interceptors.request.use(c => {
  (c as any).headers.authorization = config.token;
  (c as any).headers[
    "sec-ch-ua"
  ] = `Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"`;
  (c as any).headers["User-Agent"] =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";
  return c;
});
let errCount = 0;
async function start() {
  let browser = await Browser();
  // 如果有page就不在创建
  for (const tagHref of tags()) {
    try {
      let indexPage = await browser.newPage();
      // 跳转值tag对应的页面
      await indexPage.goto(tagHref?.href, { timeout: 0 });

      console.log(`打开浏览器跳转Tag(${tagHref.text})`);

      let href = await loadMoreData(indexPage);
      indexPage.close();
      console.log(`开始抓取${tagHref.text} ，共 ${href.length} 条`);
      // 对单个文章逐个抓取
      for (const _href of href) {
        try {
          await save(_href);
        } catch (error) {
          console.log(`${_href}出错`);
          errCount++;
          if (errCount > 20) process.exit(1);
          continue; //防止save运行错误
        }
      }
      console.log(`${tagHref.text} 结束`);
    } catch (error) {
      errCount++;
      if (errCount > 20) process.exit(1);
      continue;
    }
  }
  console.log("爬取任务结束,开始新的一轮");
  await sleep(95465);
  await start();
}
start();
