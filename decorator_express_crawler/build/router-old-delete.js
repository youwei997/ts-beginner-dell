"use strict";
// import { Router, Request, Response, NextFunction } from "express";
// import fs from "fs";
// import path from "path";
// const router = Router();
// import Crawler from "./utils/Crawler";
// import Analyzer from "./utils/Analyzer";
// import { getResData } from "./utils/unit";
// const analyzer = Analyzer.getInstance();
// import { BodyRequest } from "./index";
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (!isLogin) {
//     res.json(getResData(null, "请登录后操作"));
//     return;
//     // res.send("请登录后操作");
//   }
//   next();
// };
// router.get("/", () => {});
// // 爬虫路由
// router.get("/crawler", checkLogin, (req: BodyRequest, res: Response) => {
//   const url = "https://coding.imooc.com/";
//   new Crawler(url, analyzer);
//   res.send("crawler success");
// });
// router.post("/login", (req: BodyRequest, res: Response) => {
//   const { password } = req.body;
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     res.json(getResData(false, "已经登陆"));
//   } else {
//     if (password === "123" && req.session) {
//       req.session.login = true;
//       res.json(getResData(true, "登录成功"));
//     } else {
//       res.json(getResData(false, "登录失败"));
//     }
//   }
// });
// router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
//   // __dirname 代表build目录
//   try {
//     const position = path.resolve(__dirname, "../data/course.json");
//     const result = fs.readFileSync(position, "utf-8");
//     res.json(getResData(JSON.parse(result)));
//   } catch (e) {
//     res.json(getResData(false, "没有爬取到内容"));
//   }
// });
// router.get("/logout", (req: BodyRequest, res: Response) => {
//   if (req.session) {
//     req.session.login = false;
//   }
//   res.redirect("/");
//   res.json(getResData(true));
// });
// export default router;
