import superagent from "superagent";
import cheerio from "cheerio";

interface Course {
  title: string;
  price: number;
}

class Crowller {
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
    const result = {
      time: new Date().getTime(),
      data: courseInfos,
    };
    console.log(result);
  }
  // 获取html
  getRawHtml() {
    superagent.get("https://coding.imooc.com/").then((res) => {
      this.getCourseInfo(res.text);
    });
  }
  constructor() {
    console.log("初始化爬虫");
    this.getRawHtml();
  }
}

const crollwer = new Crowller();
