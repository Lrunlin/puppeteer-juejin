# 说明

**程序主要用于[BLOG](https://github.com/Lrunlin/blog)项目，对爬取的成功物进行直接的数据库保存**

Node.js 爬虫,程序为掘金社区的文章爬取,使用 Node.js 程序编写需要依靠 puppeteer 和 cheerio,使用 puppeteer 通过浏览器模拟用户行为可以防止访问速度过快而遭到限流或者验证。

## 本程序如何通过反扒取机制？

1. [参考文章](https://blogweb.cn/article/6064301311)用户使用前需要参考本篇文章设置 Chrome 启动端口，后系统使用本地 Chrome 进行自动化爬取(最好已经登录了掘金账号，降低被限流的可能)
2. 在发起请求时设置指定的请求头，同时使用 sleep 函数对程序进行限速

## 启动

1. yarn
2. 填写 config.ts 中的配置数据
3. yarn dev

# [BLOG](https://blogweb.cn)
