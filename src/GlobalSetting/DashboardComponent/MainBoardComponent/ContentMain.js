import React from "react";
import { useDispatch } from "react-redux";

export default function ContentMain(props) {
  const dispatch = useDispatch();
  const renderCardTaskList = () => {
    return props.projectDetail.lstTask?.map((taskListDetail, index) => {
      return (
        <div
          key={index}
          className="card"
          style={{ width: "17rem", height: "auto" }}
        >
          <div className="card-header">{taskListDetail.statusName}</div>
          <ul className="list-group list-group-flush">
            {taskListDetail.lstTaskDeTail.map((task, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch({
                      type: "GET_TASK_DETAIL_SAGA",
                      taskId: task.taskId,
                    });
                  }}
                >
                  <p className="font-weight-bold text-secondary text-capitalize">
                    {task.taskName}
                  </p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      <p className="text-danger">
                        <i className="fa fa-bookmark" />
                        {task.priorityTask.priority}
                      </p>
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        {task.assigness?.map((assignee, index) => {
                          return (
                            <div className="avatar" key={index}>
                              <img
                                src={assignee.avatar}
                                alt={assignee.avatar}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}
