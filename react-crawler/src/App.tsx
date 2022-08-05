import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import "./App.css";
import "./login.css";

// 通过泛型，告诉组件外部传进来的参数有哪些
interface Props {
  form: any;
}

class NormalLoginForm extends Component<Props> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
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

const App = Form.create({ name: "normal_login" })(NormalLoginForm);
export default App;
