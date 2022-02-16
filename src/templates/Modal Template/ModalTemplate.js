import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../../redux/constants/JiraNewConstants";

export default function ModalTemplate(props) {
  const { visible, ComponentContentDrawer, callBackSubmit } = useSelector(
    (state) => state.ModalEditReducer
  );
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER,
    });
  };

  const onCloseDrawer = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
  };
  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onCloseDrawer}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space>
            <Button onClick={onCloseDrawer} className="mr-2" type="danger">
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
