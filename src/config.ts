export default {
  /** 对那些标签进行爬取（见modules/tagList，输入key即可）*/
  tags: ["前端", "JavaScript", "Vue.js", "React.js", "Redis", "LeetCode"],
  /** 发布文章的token 管理系统登录后再localStorage中获取token字段*/
  token: ``,
  mysql: {
    port: 3306,
    host: "localhost",
    user: "root",
    database: "blog",
    password: "",
  },
  /** 部署的服务端端口*/
  apiHost: "http://127.0.0.1:3000",
};
