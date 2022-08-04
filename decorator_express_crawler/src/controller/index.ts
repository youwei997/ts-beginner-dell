export * from "./LoginController";
export * from "./CrawlerController";

import { CrawlerController } from "./CrawlerController";
import { LoginController } from "./LoginController";

// target 类型
// 类型就是构造函数，所以直接引入class
export type controller = CrawlerController | LoginController;
