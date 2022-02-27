import { call, takeLatest, put, delay } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  CLOSE_DRAWER,
  CREATE_TASK_SAGA,
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* createTaskSaga(action) {
  // Show Loading Screen
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  try {
    const { data, status } = yield call(() =>
      jiraNewService.createTask(action.taskObject)
    );
    console.log("task Object", action.taskObject);
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: CLOSE_DRAWER,
      });
      notificationFunction(
        "success",
        `Task ${action.taskObject.taskName}`,
        "A task has been succesfully created"
      );
      yield delay(2000);
    }
  } catch (err) {
    console.log(err);
    notificationFunction(
      "error",
      `Task ${action.taskObject.taskName}`,
      "A task has been failed to create"
    );
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followCreateTaskSaga() {
  //only take the latest input from users
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
