import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHTMLParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";
import {
  CHANGE_TASK_ASSIGNEE,
  CHANGE_TASK_DETAIL,
  GET_ALL_PRIORITY_TYPE_SAGA,
  GET_ALL_STATUS_TYPE_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_TASK_ASSIGNEE,
} from "../../../redux/constants/JiraNewConstants";
import { Select } from "antd";

export default function InfoModal(props) {
  // Retrieve data from Reducer
  const { taskDetailModel } = useSelector((state) => state.TaskDetailReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { priorityType } = useSelector((state) => state.PriorityTypeReducer);
  const { taskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectEditReducer);
  const [visiblEditor, setVisibleEditor] = useState(false);

  const [content, setContent] = useState(taskDetailModel.description);

  // Editor TinyCME
  const editorRef = useRef(null);

  // Retrieve data from API
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_STATUS_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
  }, []);
  // Functions to render out components
  const renderDescription = () => {
    const jsxDescription = ReactHTMLParser(taskDetailModel.description);
    return (
      <div>
        {visiblEditor ? (
          <div>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              initialValue={taskDetailModel.description}
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
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_DETAIL,
                  name: "description",
                  value: content,
                });
                // dispatch({
                //   type: CHANGE_TASK_DETAIL,
                //   name: "description",
                //   value: content,
                // });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                setVisibleEditor(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setVisibleEditor(!visiblEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_DETAIL,
      name,
      value,
    });
    // dispatch({
    //   type: CHANGE_TASK_DETAIL,
    //   name,
    //   value,
    // });
  };

  const renderTimeTracking = () => {
    const max =
      Number(taskDetailModel.timeTrackingSpent) +
      Number(taskDetailModel.timeTrackingRemaining);
    const percentDone = Math.round(
      (Number(taskDetailModel.timeTrackingSpent) / max) * 100
    );

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percentDone}%` }}
                aria-valuenow={Number(taskDetailModel.timeTrackingSpent)}
                aria-valuemin={Number(taskDetailModel.timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">
                {taskDetailModel.timeTrackingSpent}h logged
              </p>
              <p className="estimate-time">
                {taskDetailModel.timeTrackingRemaining}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              name="timeTrackingSpent"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              name="timeTrackingRemaining"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" style={{ fontSize: 26 }} />
              <select
                className="ml-2"
                name="typeId"
                value={taskDetailModel.typeId}
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
              <span
                className="ml-2 text-capitalize text-secondary font-weight-bold"
                style={{ fontSize: 26 }}
              >
                {taskDetailModel.taskName}
              </span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <h3>Description</h3>
                    <p>{renderDescription()}</p>
                  </div>

                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt="img 8"
                        />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span
                            style={{
                              fontWeight: 500,
                              color: "gray",
                              marginRight: "5px",
                            }}
                          >
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img
                              src={require("../../../assets/img/download (1).jfif")}
                              alt="img 9"
                            />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      value={taskDetailModel.statusId}
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                      }}
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
                  <div className="assignees mt-3">
                    <h6>ASSIGNEES</h6>

                    <div className="row ">
                      {taskDetailModel.assigness.map((assignee, index) => {
                        return (
                          <div className="col-6 my-2">
                            <div
                              key={index}
                              className="item"
                              style={{ display: "flex" }}
                            >
                              <div className="avatar">
                                <img
                                  src={assignee.avatar}
                                  alt={assignee.avatar}
                                />
                              </div>
                              <p className="name mt-2 ml-1 text-center">
                                {assignee.name}
                                <span
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                  }}
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API_SAGA,
                                      actionType: REMOVE_TASK_ASSIGNEE,
                                      userId: assignee.id,
                                    });
                                    // dispatch({
                                    //   type: REMOVE_TASK_ASSIGNEE,
                                    //   userId: assignee.id,
                                    // });
                                  }}
                                >
                                  X
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-6 my-2">
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModel.assigness?.findIndex(
                                (user) => user.id === mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((member, index) => {
                              return {
                                value: member.userId,
                                label: member.name,
                              };
                            })}
                          optionFilterProp="label"
                          style={{ width: "100%" }}
                          placeholder="Assign User"
                          name="lstUser"
                          className="form-control"
                          value="+ Add more"
                          onSelect={(value) => {
                            if (value === "0") {
                              return;
                            }

                            let userSelect = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            userSelect = {
                              ...useSelector,
                              id: userSelect.userId,
                              avatar: userSelect.avatar,
                              name: userSelect.name,
                              alias: userSelect.alias,
                            };
                            dispatch({
                              type: HANDLE_CHANGE_POST_API_SAGA,
                              actionType: CHANGE_TASK_ASSIGNEE,
                              userSelected: userSelect,
                            });
                            // dispatch({
                            //   type: CHANGE_TASK_ASSIGNEE,
                            //   userSelected: userSelect,
                            // });
                          }}
                        ></Select>
                      </div>
                    </div>
                  </div>

                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      value={taskDetailModel?.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="form-control"
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
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      type="text"
                      className="estimate-hours form-control"
                      value={taskDetailModel.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
