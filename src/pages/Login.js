import React from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function Login(props) {
  return (
    <div>
      <div className="row">
        <div
          className="col-sm-6"
          style={{
            height: "100vh",
            width: window.innerWidth / 2,
            backgroundImage: "url(https://picsum.photos/500)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <form
          className="col-sm-6 container"
          style={{ height: window.innerHeight }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: window.innerHeight }}
          >
            <h3 className="text-center display-4 font-weight-bold">
              CyberSoft Jira Login
            </h3>
            <div className="mt-3">
              <Input
                size="large"
                name="email"
                placeholder="email"
                prefix={<UserOutlined />}
              />
            </div>
            <div className="mt-3">
              <Input
                type="password"
                size="large"
                placeholder="password"
                prefix={<LockOutlined />}
              />
            </div>

            <Button
              className="mt-5"
              type="primary"
              size="large"
              style={{ width: "35%" }}
            >
              Log in
            </Button>

            <div className="social mt-4">
              <Button
                style={{ backgroundColor: "rgb(59,89,152)" }}
                shape="circle"
                size="large"
              >
                <span className="font-weight-bold text-white">F</span>
              </Button>
              <Button
                className="ml-5"
                type="primary"
                shape="circle"
                size="large"
                icon={<TwitterOutlined />}
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
