import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

import { BodyRequest } from "../index";
import { controller, get, use } from "./decorator";
import Crawler from "../utils/Crawler";
import Analyzer from "../utils/Analyzer";
import { getResData } from "../utils/unit";
const analyzer = Analyzer.getInstance();

// 中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (!isLogin) {
    res.json(getResData(null, "请登录后操作"));
    return;
    // res.send("请登录后操作");
  }
  next();
};

@controller
class CrawlerController {
  @get("/crawler")
  @use(checkLogin)
  crawler(req: BodyRequest, res: Response) {
    const url = "https://coding.imooc.com/";
    new Crawler(url, analyzer);
    res.send("crawler success");
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response) {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf-8");
      res.json(getResData(JSON.parse(result)));
    } catch (e) {
      res.json(getResData(false, "没有爬取到内容"));
    }
  }
}
