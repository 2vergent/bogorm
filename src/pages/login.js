import "../assets/styles/login.css";
import React from "react";
import BogormLogo from "../assets/icons/bogorm_logo_transparent.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { userLoginApi } from "../api/userApi";
import { UserAtom } from "../utils/store";
import { useRecoilState } from "recoil";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(UserAtom);

  const onFinish = (values) => {
    userLoginApi(values.username, values.password).then((res) => {
      if (res.data.message === "User is verified") {
        localStorage.setItem("isAuth", "true");
        setUserData(res.data.user);
        navigate("/home");
      } else if (res.data === "User doesn't exist") {
        alert("User not registered");
      }
    });
  };

  return (
    <div className="login-screen">
      <div className="logo-login">
        <div className="logo-space">
          <img className="instaxLogo" src={BogormLogo} />
        </div>
        <Divider type="vertical" className="center-divide" />
        <div className="login-main">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              <div className="register-text">
                Or{" "}
                <a className="actual-register" href="/signup">
                  Register now!
                </a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
