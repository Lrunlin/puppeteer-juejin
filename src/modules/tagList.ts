const tagList = {
  综合: { href: "recommended", children: null },
  后端: {
    href: "backend",
    children: {
      java: "Java",
      go: "Go",
      算法: "算法",
      python: "Python",
      "spring boot": "Spring%20Boot",
      mysql: "MySQL",
      Spring: "Spring",
      数据库: "数据库",
      架构: "架构",
      Redis: "Redis",
      LeetCode: "LeetCode",
      "Spring Cloud": "Spring%20Cloud",
      Linux: "Linux",
    },
  },
  前端: {
    href: "frontend",
    children: {
      JavaScript: "JavaScript",
      "Vue.js": "Vue.js",
      "React.js": "React.js",
      CSS: "CSS",
      TypeScript: "TypeScript",
      "Node.js": "Node.js",
      前端框架: "前端框架",
      Webpack: "Webpack",
      HTML: "HTML",
      微信小程序: "微信小程序",
    },
  },
  安卓: {
    href: "android",
    children: {
      Android: "Android",
      Kotlin: "Kotlin",
      Flutter: "Flutter",
      APP: "APP",
      OpenGL: "OpenGL",
    },
  },
};
export default tagList;
