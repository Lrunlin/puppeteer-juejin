import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import sleep from "./sleep";

/** 上传图片返回图片路径，上传失败返回布尔值*/
async function upload(fileName: string | null, target?: "article" | "cover") {
  if (!fileName) {
    return null;
  }
  await sleep(1000);
  let formData = new FormData();
  formData.append("image", fs.createReadStream(fileName));
  return await axios
    .post(`/static/${target}`, formData)
    .then(res => {
      try {
        fs.unlinkSync(fileName);
      } catch (error) {
        console.log(`删除失败 ${fileName}`);
      }
      return res?.data?.data?.file_name;
    })
    .catch(err => {
      fs.writeFileSync(
        `log/${+new Date()}.txt`,
        `图片: ${fileName} 上传错误\n${JSON.stringify(err)}`
      );
      return null;
    });
}
export default upload;
