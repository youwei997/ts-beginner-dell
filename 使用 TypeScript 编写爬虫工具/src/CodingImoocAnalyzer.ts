// 慕课网实战的分析器

import cheerio from "cheerio";
import { Analyzer } from "./Crowller";

import fs from "fs";
// 每一个课程的interface
interface Course {
  title: string;
  price: number;
}

// 解析后生成的数据结构
interface CourseResult {
  time: number; //因为是时间戳，所以类型是number
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class CodingImoocAnalyzer implements Analyzer {
  /* 单例模式 */
  // 实例
  private static instance: Analyzer;
  // 不可被外部实例化
  private constructor() {}
  // 获取实例
  static getInstance() {
    // 如果 getInstance 方法有接收值，那么只有第一次调用时，才会生成实例，只有第一次传的值才有效
    // 判断是否存在实例
    if (!CodingImoocAnalyzer.instance) {
      // 不存在实例，创建实例
      CodingImoocAnalyzer.instance = new CodingImoocAnalyzer();
    }
    // 返回 instance 实例
    return CodingImoocAnalyzer.instance;
  }

  //解析html
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseCard = $(".course-card");
    const courseInfos: Course[] = [];
    courseCard.map((index, element) => {
      // 获取课程的标题
      const title = $(element).find(".ellipsis2").text();
      // 获取课程的金额
      const price = parseInt(
        $(element).find(".price").text().replace("￥", "")
      ); //获取金额，并且去除￥
      courseInfos.push({
        title,
        price,
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  // 生成课程信息的json文件
  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    // fileContent 是对象，键名是时间戳，键值是课程信息（数组）
    let fileContent: Content = {};
    // 判断文件是否存在
    if (fs.existsSync(filePath)) {
      // readFileSync 读取后是字符串，需要用JSON.parse转换成对象
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    // 生成文件内容
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }
  analyze(html: string, filePath: string) {
    // 把html传入 getCourseInfo 方法解析html
    const courseInfo = this.getCourseInfo(html); // 这里生成的应该是应该具有time和data的对象
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}
export default CodingImoocAnalyzer;
