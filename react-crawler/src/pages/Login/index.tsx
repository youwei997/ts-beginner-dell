import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import request from "../../request";
import qs from "qs";
// 引入from组件的类型
import { WrappedFormUtils } from "antd/lib/form/Form";
import "./style.css";

// validateFields 方法里回调的values的泛型，具体查看Form 下面 validateFields方法的源码
interface FormFields {
  password: string;
}

// 通过泛型，告诉组件外部传进来的参数有哪些
interface Props {
  form: WrappedFormUtils<FormFields>;
}

interface State {
  isLogin: boolean;
}

class LoginForm extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  // form 上面的方法。event类型应该是React库（antd）对应组件的事件类型
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        request
          .post(
            "/api/login",
            qs.stringify({
              password: values.password,
            }),
            // 设置 Content-type
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
            const data = res.data;
            if (data) {
              this.setState({
                isLogin: data,
              });
            } else {
              message.error("登录失败");
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.state;
    if (isLogin) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入登录密码!" }],
            })(
              <Input
                prefix={<LockOutlined className="password" />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);
export default WrappedLoginForm;
