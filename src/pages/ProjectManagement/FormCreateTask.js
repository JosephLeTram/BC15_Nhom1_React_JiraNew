import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Select, Slider, Input } from "antd";
import {
  CREATE_TASK_SAGA,
  GET_ALL_PRIORITY_TYPE_SAGA,
  GET_ALL_STATUS_TYPE_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_PROJECT_LIST_SAGA,
  SEARCH_USER_BY_PROJECT_ID_SAGA,
  SEARCH_USER_SAGA,
  SET_SUBMIT_CREATE_TASK,
} from "../../redux/constants/JiraNewConstants";
import { withFormik } from "formik";
import * as Yup from "yup";

function FormCreateTask(props) {
  // Formik components
  const { errors, values, handleChange, handleSubmit, setFieldValue } = props;
  // Editor TinyCME
  const editorRef = useRef(null);

  // Select component from Ant Design
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const [size, setSize] = useState("default");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  // Time Tracking
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 2,
    timeTrackingRemaining: 8,
  });

  // Call API
  const projectList = useSelector(
    (state) => state.ProjectListReducer.projectList
  );

  const taskType = useSelector((state) => state.TaskTypeReducer.taskType);
  const priorityType = useSelector(
    (state) => state.PriorityTypeReducer.priorityType
  );
  // retrieve User Login Data from Reducer to Component
  const userSearchByProjectId = useSelector(
    (state) => state.SearchUserReducerByProjectId.userSearchByProjectId
  );
  const userOptions = userSearchByProjectId?.map((user, index) => {
    return {
      value: user.userId,
      label: user.name,
    };
  });

  // Retrieve Status type from Reducer to Component
  const arrStatus = useSelector((state) => state.StatusReducer.arrStatus);

  const dispatch = useDispatch();
  // Hook

  useEffect(() => {
    dispatch({
      type: GET_PROJECT_LIST_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_TYPE_SAGA,
    });
    dispatch({
      type: SEARCH_USER_SAGA,
      keyWord: "",
    });
    dispatch({
      type: GET_ALL_STATUS_TYPE_SAGA,
    });
    dispatch({
      type: SET_SUBMIT_CREATE_TASK,
      submitFunctionCreateTask: handleSubmit,
    });
  }, []);
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            // Update value for project Id when select
            setFieldValue("projectId", e.target.value);
            //dispatch updated value
            let { value } = e.target;
            dispatch({
              type: SEARCH_USER_BY_PROJECT_ID_SAGA,
              projectId: value,
            });
          }}
        >
          {projectList?.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <hr />
      <div className="form-group">
        <p>Task Name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Status</p>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {arrStatus?.map((status, index) => {
            return (
              <option key={index} value={status.statusId}>
                {status.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {priorityType?.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p>Task Type</p>
              <select
                className="form-control"
                name="typeId"
                onChange={handleChange}
              >
                {taskType?.map((type, index) => {
                  return (
                    <option key={index} value={type.id}>
                      {type.taskType}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p>Reporter</p>
              <Input />
            </div>
            <div className="col-6">
              <p>Assignees</p>
              <Select
                mode="multiple"
                size={size}
                options={userOptions}
                optionFilterProp="label"
                placeholder="Please select"
                style={{ width: "100%" }}
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
                onSelect={(value) => {}}
              >
                {children}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="form-group">
        <div>
          <p>Original Time Estimated (hr)</p>
          <input
            className="form-control"
            name="originalEstimate"
            min="0"
            type="number"
            onChange={handleChange}
            defaultValue={10}
          />
          <p className="mt-3">Time Tracking</p>
          <Slider
            value={timeTracking.timeTrackingSpent}
            max={
              Number(timeTracking.timeTrackingSpent) +
              Number(timeTracking.timeTrackingRemaining)
            }
          />
          <div className="row">
            <div
              className="col-6 text-left"
              style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}
            >
              {timeTracking.timeTrackingSpent}h logged
            </div>
            <div
              className="col-6 text-right"
              style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}
            >
              {timeTracking.timeTrackingRemaining}h remaining
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <p>Time Spent (hr)</p>
              <input
                type="number"
                className="form-control"
                name="timeTrackingSpent"
                value={Number(timeTracking.timeTrackingSpent)}
                min="0"
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: e.target.value,
                  });
                  setFieldValue("timeTrackingSpent", e.target.value);
                }}
              />
            </div>
            <div className="col-6">
              <p>Time Remaining (hr)</p>
              <input
                type="number"
                className="form-control"
                name="timeTrackingRemaining"
                value={Number(timeTracking.timeTrackingRemaining)}
                min="0"
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingRemaining: e.target.value,
                  });
                  setFieldValue("timeTrackingRemaining", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <p>Description</p>
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
        onEditorChange={(content, editor) => {
          setFieldValue("description", content);
        }}
      />
    </form>
  );
}

const CreateTasktWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectList, taskType, priorityType, arrStatus } = props;

    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 10,
      timeTrackingSpent: 2,
      timeTrackingRemaining: 8,
      projectId: projectList[0]?.id,
      typeId: taskType[0]?.id,
      priorityId: priorityType[0]?.priorityId,
      listUserAsign: [],
    };
  },

  //validation
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
  },

  handleChange: () => {},

  displayName: "CreateTasktWithFormik",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    projectList: state.ProjectListReducer.projectList,
    taskType: state.TaskTypeReducer.taskType,
    priorityType: state.PriorityTypeReducer.priorityType,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(CreateTasktWithFormik);
