import superagent from "superagent";
import fs from "fs";
import path from "path";

import CodingImoocAnalyzer from "./CodingImoocAnalyzer";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.join(__dirname, "../data/course.json");
  // 获取html
  private async getRawHtml() {
    const result = await superagent.get(this.url);

    return result.text;
  }

  private writeFileSync(content: string) {
    fs.writeFileSync(this.filePath, content);
    console.log("写入成功");
  }

  // 初始化爬虫
  private async initSpiderProcess() {
    // 调用getRawHtml方法获取html结构
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    // 写入文件 fileContent 是对象，写入时得转换成字符串 JSON.stringify
    this.writeFileSync(fileContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    // 调用 初始化爬虫
    this.initSpiderProcess();
  }
}

const url = "https://coding.imooc.com/";

const analyzer = CodingImoocAnalyzer.getInstance();

new Crowller(url, analyzer);
console.log(1);
