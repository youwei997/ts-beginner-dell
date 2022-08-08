import React from "react";
import { Button, message } from "antd";
import request from "../../request";
import { Redirect } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import "./style.css";

// 课程对象： 标题和价格
interface CourseItem {
  title: string;
  price: number;
  people: number;
}
// state里data（爬到的数据）的类型， --》 时间戳: 具体课程数组
interface Data {
  [key: string]: CourseItem[];
}
// state的类型
interface State {
  isLogin: boolean;
  data: Data;
}

class Home extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLogin: true,
      data: {},
    };
  }
  componentDidMount() {
    // 进入到home页面，调用接口，获取是否登录
    request.get("/api/isLogin").then((res) => {
      const data: boolean = res.data;
      if (!data) {
        this.setState({
          isLogin: false,
        });
      }
    });

    // 获取爬到的数据
    request.get("/api/showData").then((res) => {
      const data: Data = res.data;
      if (data) {
        this.setState({
          data: data,
        });
      }
    });
  }
  handleLogoutClick = (e: React.MouseEvent) => {
    request.get("/api/logout").then((res) => {
      const data: boolean = res.data;
      if (data) {
        this.setState({
          isLogin: false,
        });
      } else {
        message.error("退出失败");
      }
    });
  };
  handleCrawlerClick = (e: React.MouseEvent) => {
    request.get("/api/crawler").then((res) => {
      const data: boolean = res.data;
      if (data) {
        message.success("爬取成功");
      } else {
        message.error("爬取失败");
      }
    });
  };
  // 类型是一个函数，返回类型是echarts.EChartsOption
  getOption: () => echarts.EChartsOption = () => {
    const { data } = this.state;
    // legend 的data
    const courseNames: string[] = [];
    // x轴数据
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (let i in data) {
      times.push(new Date(Number(i)).toLocaleString());
      const item = data[i];
      item.forEach((innerItem) => {
        const { title, people } = innerItem;
        if (!courseNames.includes(title)) {
          courseNames.push(title);
        }
        tempData[title]
          ? tempData[title].push(people)
          : (tempData[title] = [people]);
      });
    }

    // 使用 echarts.EChartsOption.series[] 报错
    const result: any[] = [];

    for (const i in tempData) {
      result.push({
        name: i,
        type: "line",
        data: tempData[i],
      });
    }

    return {
      title: {
        text: "慕课网课程",
      },
      xAxis: {
        type: "category",
        data: times,
      },
      yAxis: {
        type: "value",
      },
      legend: {
        data: courseNames,
      },
      series: result,
    };
  };
  render(): React.ReactNode {
    const isLogin = this.state.isLogin;
    if (isLogin) {
      return (
        <div className="home-page">
          <div className="btn-box">
            <Button type="primary" onClick={this.handleCrawlerClick}>
              爬取
            </Button>
            <Button type="primary">展示</Button>
            <Button type="primary" onClick={this.handleLogoutClick}>
              退出
            </Button>
          </div>
          <ReactEcharts option={this.getOption()}></ReactEcharts>
        </div>
      );
    }
    return <Redirect to="/login"></Redirect>;
  }
}
export default Home;
