import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  BarsOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { OPEN_FORM_CREATE_TASK } from "../../../redux/constants/JiraNewConstants";
import FormCreateTask from "../../../pages/ProjectManagement/FormCreateTask";

const { Header, Sider, Content } = Layout;

export default function SideBar() {
  const [state, setState] = useState({
    collapsed: false,
  });
  const dispatch = useDispatch();
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
          <Menu.Item
            key="2"
            icon={<PlusOutlined />}
            onClick={() => {
              dispatch({
                type: OPEN_FORM_CREATE_TASK,
                Component: <FormCreateTask />,
                title: "Create Task",
              });
            }}
          >
            Create Task
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
