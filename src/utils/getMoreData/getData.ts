import type { Page } from "puppeteer";
/** 加载更多信息并返回列表*/
async function loadMoreData(page: Page): Promise<string[]> {
  return (await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      let height = document.documentElement.scrollTop + document.documentElement.clientHeight;
      let taggetHeight = height + 4000; //目标高度
      // let taggetHeight = height + 60; //目标高度(测试时使用60)
      let timer = setInterval(() => {
        window.scrollBy(0, (height += 60));
        if (height >= taggetHeight - 90) {
          let href = [] as string[];
          document.querySelectorAll(".entry-list .entry a.title").forEach(item => {
            href.push((item as any).href);
          });
          clearInterval(timer);
          resolve(href);
        }
      }, 700);
    });
  })) as string[];
}

export default loadMoreData;
