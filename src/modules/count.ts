/** 本列表有多少文章*/
let total = 0;
/** 本次抓取任务的工作量*/
let count = 0;
function setCount() {
  count++;
  console.log(`成功，本次已经抓取了 ${count} 篇文章`);
}

export {  setCount };
