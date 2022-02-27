import { call, takeLatest, put, select } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  CHANGE_TASK_ASSIGNEE,
  CHANGE_TASK_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_TASK_ASSIGNEE,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

export function* handleChangePostApi(action) {
  // Call action to change Task Detail model
  switch (action.actionType) {
    case CHANGE_TASK_DETAIL:
      {
        const { value, name } = action;
        yield put({
          type: CHANGE_TASK_DETAIL,
          name,
          value,
        });
      }
      break;

    case CHANGE_TASK_ASSIGNEE:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_TASK_ASSIGNEE,
          userSelected,
        });
      }
      break;

    case REMOVE_TASK_ASSIGNEE:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_TASK_ASSIGNEE,
          userId,
        });
      }
      break;
    default:
      return;
  }
  //Save via api UpdateTaskSaga
  // retrieve data from state.taskDetailModel
  let { taskDetailModel } = yield select((state) => state.TaskDetailReducer);
  // change data from state.taskDetailModel into neccessary data for API
  const listUserAsign = taskDetailModel.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateApi = { ...taskDetailModel, listUserAsign };

  const { data, status } = yield call(() =>
    jiraNewService.updateTask(taskUpdateApi)
  );
  try {
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdateApi.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
      notificationFunction(
        "success",
        `Task ${taskUpdateApi.taskName}`,
        "A task has been succesfully updated"
      );
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
    notificationFunction(
      "error",
      `Task ${taskUpdateApi.taskName}`,
      "A task has failed to update"
    );
  }
}

export function* followHandleChangePostApi() {
  //only take the latest input from users
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
