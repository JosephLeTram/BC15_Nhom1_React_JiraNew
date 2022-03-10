import React, { useState, useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { SET_SUBMIT_EDIT_USER } from "../../redux/constants/JiraNewConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function FormEditUser(props) {
  const { errors, values, handleChange, handleSubmit } = props;

  const dispatch = useDispatch();

  //Component dismount
  useEffect(() => {
    // Load form upon event clicking "Submit" button
    dispatch({
      type: SET_SUBMIT_EDIT_USER,
      submitFunctionCreateUser: handleSubmit,
    });
  }, []);

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <h4>User ID</h4>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        {/* <div className="col-6">
          <div className="form-group">
            <h4>User Password</h4>
            <input
              value={values.passWord}
              className="form-control"
              name="passWord"
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="col-6">
          <div className="form-group">
            <h4>User Name</h4>
            <input
              value={values.name}
              className="form-control"
              name="name"
              onChange={handleChange}
            />
            {/* errors for name */}
            <div className="text-danger mt-2">{errors.name}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h4>Email</h4>
            <input
              value={values.email}
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            {/* errors for email */}
            <div className="text-danger mt-2">{errors.email}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <h4>Phone Number</h4>
            <input
              value={values.phoneNumber}
              className="form-control"
              name="phoneNumber"
              onChange={handleChange}
            />
            {/* errors for phoneNumber */}
            <div className="text-danger mt-2">{errors.phoneNumber}</div>
          </div>
        </div>
      </div>
    </form>
  );
}

const EditUsertWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = props;
    return {
      id: userEdit?.userId,
      //   passWord: userEdit?.passWord,
      email: userEdit?.email,
      name: userEdit?.name,
      phoneNumber: userEdit?.phoneNumber,
    };
  },

  //validation
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!") // check  if Empty
      .email("Email is invalid!"),
    // passWord: Yup.string()
    //   .required("Password is required")
    //   .min(6, "Password must have min 6 characters")
    //   .max(12, "Password exceeds 12 characters"),
    name: Yup.string()
      .required("Username is required")
      .min(6, "Username must have min 6 characters"),
    phoneNumber: Yup.string()
      .required("Phone No. is required")
      .min(9, "Phone No. must have min 9 number")
      .matches(phoneRegExp, "Phone number is not valid"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const action = {
      type: SET_SUBMIT_EDIT_USER,
      userUpdated: values,
    };

    //dispatch action to Saga
    props.dispatch(action);
  },

  handleChange: (e) => {},

  displayName: "EditUserWithFormik",
})(FormEditUser);

const mapStateToProps = (state) => ({
  userEdit: state.UserEditReducer.userEdit,
});

export default connect(mapStateToProps)(EditUsertWithFormik);
