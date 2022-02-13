import React, { useState } from "react";
import { Layout, Menu } from "antd";

import {
  UserOutlined,
  BarsOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function SideBar() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div className="text-right pr-2">
          <BarsOutlined
            onClick={toggle}
            style={{ cursor: "pointer", color: "white", fontSize: "20px" }}
          />
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Username
          </Menu.Item>
          <Menu.Item key="1" icon={<SearchOutlined />}>
            Search Issues
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusOutlined />}>
            Create Issue
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
