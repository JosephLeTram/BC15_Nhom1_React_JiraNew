import { call, takeLatest, put, delay } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  DELETE_PROJECT_SAGA,
  DISPLAY_LOADING,
  GET_PROJECT_LIST_SAGA,
  HIDE_LOADING,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* deleteProjectSaga(action) {
  // Show Loading Screen
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  try {
    const { data, status } = yield call(() =>
      jiraNewService.deleteProject(action.idProject)
    );
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      notificationFunction(
        "success",
        `Project ${action.idProject.id}`,
        "Project is succesfully deleted"
      );
      // Refresh brower
      yield put({
        type: GET_PROJECT_LIST_SAGA,
      });
    }
  } catch (err) {
    console.log(err);
    notificationFunction(
      "error",
      `Project ${action.idProject.id}`,
      "Project fails to delete"
    );
  }

  // Hide loading screen
  yield put({
    type: HIDE_LOADING,
  });
  yield delay(500);
}

export function* followDeleteProjectSaga() {
  //only take the latest input from users
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}
