import React from "react";
import { Button, message } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import "./style.css";

interface State {
  isLogin: boolean;
}

class Home extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }
  componentDidMount() {
    // 进入到home页面，调用接口，获取是否登录
    axios.get("/api/isLogin").then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
        });
      }
    });
  }
  handleLogoutClick = (e: React.MouseEvent) => {
    axios.get("/api/logout").then((res) => {
      if (res.data?.data) {
        this.setState({
          isLogin: false,
        });
      } else {
        message.error("退出失败");
      }
    });
  };
  handleCrawlerClick = (e: React.MouseEvent) => {
    axios.get("/api/crawler").then((res) => {
      if (res.data?.data) {
        message.success("爬取成功");
      } else {
        message.error("爬取失败");
      }
    });
  };
  // 类型是一个函数，返回类型是echarts.EChartsOption
  getOption: () => echarts.EChartsOption = () => {
    return {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
  };
  render(): React.ReactNode {
    const isLogin = this.state.isLogin;
    if (isLogin) {
      return (
        <div className="home-page">
          <Button type="primary" onClick={this.handleCrawlerClick}>
            爬取
          </Button>
          <Button type="primary">展示</Button>
          <Button type="primary" onClick={this.handleLogoutClick}>
            退出
          </Button>
          <ReactEcharts option={this.getOption()}></ReactEcharts>
        </div>
      );
    }
    return <Redirect to="/login"></Redirect>;
  }
}
export default Home;
