// https://cloud.tencent.com/developer/article/1676868
// https://juejin.cn/post/6844903565064929293#heading-13
import axios from "axios";
import Browser from "./modules/browser";
import tags from "./utils/tags";
import loadMoreData from "./utils/getMoreData";
import save from "./utils/save";
import sleep from "./utils/sleep";

const fa = console.log;
console.log = function () {
  let time = new Date();
  fa(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}  `, ...arguments);
};



axios.interceptors.request.use(c => {
  return Object.assign(c, {
    "sec-ch-ua": `Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"`,
    "User-Agent": `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36`,
    origin: "https://juejin.cn/",
    referer: "https://juejin.cn/",
  });
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
          //累计20个错误时停止抓球
          if (errCount > 20) {
            throw new Error("已经累计20个错误了");
          }
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
