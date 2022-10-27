import puppeteer from "puppeteer";
import axios from "axios";

async function browser() {
  let wsKey = await axios.get("http://localhost:9222/json/version");
  let browser = await puppeteer.connect({
    browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
    defaultViewport: null,
  });
  return browser;
}
export default browser;
