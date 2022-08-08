declare namespace responseResult {
  interface CourseItem {
    title: string;
    price: number;
    people: number;
  }
  // state里data（爬到的数据）的类型， --》 时间戳: 具体课程数组
  interface Data {
    [key: string]: CourseItem[];
  }

  type isLogin = boolean;
  type login = boolean;
  type logout = boolean;
  type crawler = boolean;
  type showData = Data;
}
