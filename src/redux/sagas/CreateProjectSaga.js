import { call, takeLatest, put, delay, select } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  CREATE_PROJECT_SAGA,
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* createProjectSaga(action) {
  // Show Loading Screen
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  try {
    const { data, status } = yield call(() =>
      jiraNewService.createProjectAuthorization(action.newProject)
    );
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      notificationFunction(
        "success",
        `Project ${action.newProject.projectName}`,
        "Project is succesfully created"
      );

      // Connect to store and change state
      let history = yield select((state) => state.HistoryReducer.history);

      alert("Đang chuyển về Project Management Page !");
      //Chage web link directory
      history.push("/projectmanagement");
    }
  } catch (err) {
    console.log(err);
    notificationFunction(
      "error",
      `Project ${action.newProject.projectName}`,
      "Project fails to create"
    );
  }

  yield put({
    type: HIDE_LOADING,
  });
  yield delay(500);
}

export function* followCreateProjectSaga() {
  //only take the latest input from users
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}
