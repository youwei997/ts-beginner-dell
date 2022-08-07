import React from "react";
import { Button, message } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
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
  componentDidMount() {
    axios.get("/api/isLogin").then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
        });
      }
    });
  }
  render(): React.ReactNode {
    const isLogin = this.state.isLogin;
    if (isLogin) {
      return (
        <div className="home-page">
          <Button type="primary">爬取</Button>
          <Button type="primary">展示</Button>
          <Button type="primary" onClick={this.handleLogoutClick}>
            退出
          </Button>
        </div>
      );
    }
    return <Redirect to="/login"></Redirect>;
  }
}
export default Home;
