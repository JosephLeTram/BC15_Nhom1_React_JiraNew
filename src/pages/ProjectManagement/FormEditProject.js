import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch } from "react-redux";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  SET_SUBMIT_EDIT_PROJECT,
} from "../../redux/constants/JiraNewConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

function FormEditProject(props) {
  const { errors, values, handleChange, handleSubmit, setFieldValue } = props;

  // Connect to Project Category Reducer
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();

  // const submitForm = (event) => {
  //   event.preventDefault();
  //   alert("Submit Edit Succesfully");
  // };

  //Component dismount
  useEffect(() => {
    // Call API to retrieve selected options
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });

    // Load form upon event clicking "Submit" button
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });
  }, []);

  // Check current text in the Editor
  const editorRef = useRef(null);
  const handleEditorChange = (e) => {
    // set value to description for Formik
    setFieldValue("description", e.target.getContent());
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h4>Project ID</h4>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h4>Project Name</h4>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h4>Category</h4>
            <select
              name="categoryId"
              value={values.categoryId}
              className="form-control"
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <h4>Description</h4>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              value={values.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const EditProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  //validation
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    const action = {
      type: SET_SUBMIT_EDIT_PROJECT,
      projectUpdated: values,
    };

    //dispatch action to Saga
    props.dispatch(action);
  },

  handleChange: () => {},

  displayName: "EditProjectWithFormik",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectEditReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectWithFormik);
