import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../redux/constants/JiraNewConstants";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const { errors, handleChange, handleSubmit, setFieldValue } = props;

  // Call and dispatch to API
  const dispatch = useDispatch();
  useEffect(() => {
    // Call API to retrieve selected options
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
  }, []);

  // Check current text in the Editor
  const editorRef = useRef(null);
  const handleEditorChange = (e) => {
    // set value to description for Formik
    setFieldValue("description", e.target.getContent());
  };
  return (
    <div className="container m-5">
      {/* relative Link  */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li
            className="breadcrumb-item active font-weight-bold"
            aria-current="page"
          >
            Create Project
          </li>
        </ol>
      </nav>
      {/* Create New Project Form */}
      <h3 className="container">Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        {/* Name of the new PROJECT */}
        <div className="form-group">
          <p className="text-secondary font-weight-bold">Name</p>
          <input className="form-control" name="projectName" />
        </div>
        {/* Description of the new project */}
        <div className="form-group">
          <p className="text-secondary font-weight-bold">Description</p>

          {/* Using Tiny CLoud Editor React Library */}
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            name="description"
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
          <p>Describe the project in as much detail as you'd like.</p>
        </div>
        {/* Select options for Project Types */}
        <div className="form-group">
          <p className="text-secondary font-weight-bold">Project Category</p>
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        {/* Button Submit */}
        <button type="submit" className="btn btn-outline-primary">
          CREATE PROJECT
        </button>
      </form>
    </div>
  );
}
const CreateProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    projectName: "",
    description: "",
    categoryId: props.arrProjectCategory[0]?.id, // default values for website upon loading first time
  }),

  //validation
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("handdleSubmit Values", values);
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },

  handleChange: () => {},

  displayName: "CreateProjectWithFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(CreateProjectWithFormik);
