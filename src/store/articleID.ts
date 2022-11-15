let article_id = "";
const articleID = {
  get: () => {
    return article_id;
  },
  set: (id: string) => {
    return (article_id = id);
  },
};
export default articleID;
