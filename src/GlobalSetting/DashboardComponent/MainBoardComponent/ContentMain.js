import React from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  GET_TASK_DETAIL_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../../redux/constants/JiraNewConstants";
import { Draggable } from "react-beautiful-dnd";

export default function ContentMain(props) {
  const dispatch = useDispatch();
  const handleDragEnd = (result) => {
    let { projectId, taskId } = JSON.parse(result.draggableId);
    let { source, destination } = result;

    // If desitnation is null, do nothing
    if (!result.destination) {
      return;
    }
    // if draggable card is dragged on themselves, do nothing
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    // Call API to update status upon dragEnd
    dispatch({
      type: UPDATE_TASK_STATUS_SAGA,
      taskUpdateModel: {
        statusId: destination.droppableId,
        taskId: taskId,
        projectId: projectId,
      },
    });
  };
  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {props.projectDetail.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable key={index} droppableId={taskListDetail.statusId}>
              {(provided) => {
                return (
                  <div
                    className="card pb-2"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">
                      {taskListDetail.statusName}
                    </div>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="list-group list-group-flush"
                      style={{ height: "100%" }}
                    >
                      {taskListDetail.lstTaskDeTail.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({
                              projectId: task.projectId,
                              taskId: task.taskId.toString(),
                            })}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: task.taskId,
                                    });
                                  }}
                                >
                                  <p className="font-weight-bold text-secondary text-capitalize">
                                    {task.taskName}
                                  </p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      <p className="text-danger">
                                        <i className="fa fa-bookmark" />
                                        {task.priorityTask.priority}
                                      </p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {task.assigness?.map(
                                          (assignee, index) => {
                                            return (
                                              <div
                                                className="avatar"
                                                key={index}
                                              >
                                                <img
                                                  src={assignee.avatar}
                                                  alt={assignee.avatar}
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}
