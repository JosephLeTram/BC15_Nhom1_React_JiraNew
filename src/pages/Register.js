import React from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  IeOutlined,
  LockOutlined,
  TwitterOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { jiraNewService } from "../redux/services/JiraNewService";
import { CREATE_USER_SAGA } from "../redux/constants/JiraNewConstants";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function Register(props) {
  const { errors, handleChange, handleSubmit } = props;
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="container"
          style={{ height: window.innerHeight }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: window.innerHeight }}
          >
            <h3 className="text-center display-4 font-weight-bold">
              CyberSoft Jira Register
            </h3>
            {/* Input for email */}
            <div className="mt-3">
              <Input
                onChange={handleChange}
                size="large"
                type="email"
                name="email"
                placeholder="email"
                prefix={<IeOutlined />}
              />
            </div>

            {/* errors for email */}
            <div className="text-danger mt-2">{errors.email}</div>

            {/* Input for password */}
            <div className="mt-3">
              <Input
                onChange={handleChange}
                type="password"
                size="large"
                name="passWord"
                placeholder="password"
                prefix={<LockOutlined />}
              />
            </div>

            {/* errors for password */}
            <div className="text-danger mt-2">{errors.passWord}</div>

            {/* Input for name */}
            <div className="mt-3">
              <Input
                onChange={handleChange}
                type="text"
                size="large"
                name="name"
                placeholder="username"
                prefix={<UserOutlined />}
              />
            </div>

            {/* errors for name */}
            <div className="text-danger mt-2">{errors.name}</div>

            {/* Input for phoneNumber */}
            <div className="mt-3">
              <Input
                onChange={handleChange}
                type="text"
                size="large"
                name="phoneNumber"
                placeholder="phoneNumber"
                prefix={<PhoneOutlined />}
              />
            </div>

            {/* errors for phoneNumber */}
            <div className="text-danger mt-2">{errors.phoneNumber}</div>

            <Button
              htmlType="submit"
              className="mt-5"
              type="primary"
              size="large"
              style={{ width: "35%" }}
            >
              Register
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
                className="social ml-4"
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

const CreateWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  }),

  //validation
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!") // check  if Empty
      .email("Email is invalid!"),
    passWord: Yup.string()
      .required("Password is required")
      .min(6, "Password must have min 6 characters")
      .max(12, "Password exceeds 12 characters"),
    name: Yup.string()
      .required("Username is required")
      .min(6, "Username must have min 6 characters"),
    phoneNumber: Yup.string()
      .required("Phone No. is required")
      .min(9, "Phone No. must have min 9 number")
      .matches(phoneRegExp, "Phone number is not valid"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(
      "email",
      values.email,
      "pass",
      values.passWord,
      "name",
      values.name,
      "phone",
      values.phoneNumber
    );
    props.dispatch({
      type: CREATE_USER_SAGA,
      userCreateModel: {
        email: values.email.toString(),
        passWord: values.passWord.toString(),
        name: values.name.toString(),
        phoneNumber: values.phoneNumber.toString(),
      },
    });
  },

  displayName: "CyberSoft Jira Register",
})(Register);

export default connect()(CreateWithFormik);
