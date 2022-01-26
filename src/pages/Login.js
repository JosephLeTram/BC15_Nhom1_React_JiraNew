import React from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { USER_SIGNIN_API } from "../redux/constants/CyberJiraNew";
import { signin_action } from "../redux/actions/JiraNewAction";

function Login(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <div>
      {/* Make row and 2 col-6 to seperate login form and representative picture */}
      <div className="row">
        <div
          className="col-sm-6"
          style={{
            height: "100vh",
            width: window.innerWidth / 2,
            backgroundImage: "url(https://picsum.photos/500)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundPosition: "center",
          }}
        ></div>

        <form
          onSubmit={handleSubmit}
          className="col-sm-6 container"
          style={{ height: window.innerHeight }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: window.innerHeight }}
          >
            <h3 className="text-center display-4 font-weight-bold">
              {props.displayName} Jira
            </h3>
            <div className="mt-3">
              <Input
                onChange={handleChange}
                size="large"
                type="email"
                name="email"
                placeholder="email"
                prefix={<UserOutlined />}
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
                name="password"
                placeholder="password"
                prefix={<LockOutlined />}
              />
            </div>

            {/* errors for password */}
            <div className="text-danger mt-2">{errors.password}</div>

            <Button
              htmlType="submit"
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

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  //validation
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!") // check  if Empty
      .email("Email is invalid!"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have min 6 characters")
      .max(12, "Password exceeds 12 characters"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(signin_action(values.email, values.password));

    // console.log(props);
    // console.log(values);
  },

  displayName: "CyberSoft Jira Login",
})(Login);

export default connect()(LoginWithFormik);
