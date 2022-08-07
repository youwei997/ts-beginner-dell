import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

import { BodyRequest } from "../index";
import { controller, use, get } from "../decorator/index";
import Crawler from "../utils/Crawler";
import Analyzer from "../utils/Analyzer";
import { getResData } from "../utils/unit";
import { crawlerUrl } from "../index";
const analyzer = Analyzer.getInstance();

// 中间件
const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (!isLogin) {
    res.json(getResData(null, "请登录后操作"));
    return;
    // res.send("请登录后操作");
  }
  next();
};

@controller("/api")
export class CrawlerController {
  @get("/crawler")
  @use(checkLogin)
  crawler(req: BodyRequest, res: Response): void {
    // 因为数据需要使用echarts，课程标题用在echarts的标题，就选择了课程少的课程分类，职场进阶
    const url = crawlerUrl;
    new Crawler(url, analyzer);
    res.json(getResData(true, "爬取成功"));
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf-8");
      res.json(getResData(JSON.parse(result)));
    } catch (e) {
      res.json(getResData(false, "没有爬取到内容"));
    }
  }
}
