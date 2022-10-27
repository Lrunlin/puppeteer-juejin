import config from "../config";
import tagList from "../modules/tagList";

let tag: { href: string; text: string }[] = [];
Object.values(tagList).forEach((item, index) => {
  tag.push({
    href: `https://juejin.cn/${item.href}`,
    text: Object.keys(tagList)[index],
  });
  if (item.children) {
    Object.keys(item.children).forEach((_item, _index) => {
      tag.push({
        href: `https://juejin.cn/${item.href}/${Object.values(item.children)[_index]}`,
        text: _item,
      });
    });
  }
});

/** 将config中输入的tags转为请求地址*/
function tags() {
  return config.tags.map(item => tag.find(_item => item == _item.text)) as {
    href: string;
    text: string;
  }[];
}
export default tags;
