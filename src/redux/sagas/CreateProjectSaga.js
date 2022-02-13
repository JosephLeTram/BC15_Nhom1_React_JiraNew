import { call, takeLatest, put, delay, select } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  CREATE_PROJECT_SAGA,
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../constants/JiraNewConstants";

function* createProjectSaga(action) {
  console.log("action Create Project", action);
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
      alert("Bạn đã tạo Project mới thành công !");

      // Connect to store and change state
      let history = yield select((state) => state.HistoryReducer.history);

      alert("Đang chuyển về dashboard !");
      //Chage web link directory
      history.push("/dashboard");
    }
  } catch (err) {
    console.log(err);
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
