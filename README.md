# 说明

**网站对掘金社区进行爬取，并且将文章数据以及图片文件夹的形式进行保存**

![数据保存](https://img.blogweb.cn/article/fa6343349fa5464c8ea9d09475c7786f.webp)

如果您使用了[博客项目](https://github.com/Lrunlin/blog)可以使用[puppeteer-juejin-blog](https://github.com/Lrunlin/puppeteer-juejin-blog),该程序可以自动将图片和文章数据保存至博客网站的服务器

Node.js 爬虫,程序为掘金社区的文章爬取,使用 Node.js 程序编写需要依靠 puppeteer 和 cheerio,使用 puppeteer 通过浏览器模拟用户行为可以防止访问速度过快而遭到限流或者验证。

## 本程序如何通过反扒取机制(必看!)？

_建议使用本机浏览器（默认方式）使用headless有被反爬拦截的风险，本程序并未对headless做处理_

1. [参考文章](https://blogweb.cn/article/6064301311)用户使用前需要参考本篇文章设置 Chrome 启动端口后，系统使用本地 Chrome 进行自动化爬取(最好已经登录了掘金账号，降低被限流的可能)
2. 在发起请求时设置指定的请求头，同时使用 sleep 函数对程序进行限速
3. 模拟滚动

## 启动

1. yarn
2. 填写 config.ts 中的配置数据
3. yarn dev

## 相关文章
[Puppeteer爬取掘金文章](https://blogweb.cn/article/1197996635410)  

# [BLOG](https://blogweb.cn)
