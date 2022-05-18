import superagent from "superagent";

class Crowller {
  private rawHtml = "";
  getRawHtml() {
    superagent.get("https://coding.imooc.com/").then((res) => {
      this.rawHtml = res.text;
    });
  }
  constructor() {
    console.log("初始化爬虫");
    this.getRawHtml();
  }
}

const crollwer = new Crowller();
