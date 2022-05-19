import superagent from "superagent";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

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

class Crowller {
  private url = "https://coding.imooc.com/";
  private filePath = path.join(__dirname, "../data/course.json");

  //解析html
  getCourseInfo(html: string) {
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
  // 获取html
  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  // 生成课程信息的json文件
  generateJsonContent(courseInfo: CourseResult) {
    // fileContent 是对象，键名是时间戳，键值是课程信息（数组）
    let fileContent: Content = {};
    // 判断文件是否存在
    if (fs.existsSync(this.filePath)) {
      // readFileSync 读取后是字符串，需要用JSON.parse转换成对象
      fileContent = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    // 生成文件内容
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  writeFileSync(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  // 初始化爬虫
  async initSpiderProcess() {
    // 调用getRawHtml方法获取html结构
    const html = await this.getRawHtml();
    // 把html传入 getCourseInfo 方法解析html
    const courseInfo = this.getCourseInfo(html); // 这里生成的应该是应该具有time和data的对象
    const fileContent = this.generateJsonContent(courseInfo);
    // 写入文件 fileContent 是对象，写入时得转换成字符串 JSON.stringify
    this.writeFileSync(JSON.stringify(fileContent));
  }

  constructor() {
    // 调用 初始化爬虫
    this.initSpiderProcess();
  }
}

const crollwer = new Crowller();
