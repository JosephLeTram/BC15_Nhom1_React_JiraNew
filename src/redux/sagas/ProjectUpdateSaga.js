import { call, takeLatest, put, delay, select } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  CLOSE_DRAWER,
  DISPLAY_LOADING,
  GET_PROJECT_LIST_SAGA,
  HIDE_LOADING,
  SET_SUBMIT_EDIT_PROJECT,
} from "../constants/JiraNewConstants";

function* updateProjectSaga(action) {
  // Show Loading Screen
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  try {
    const { data, status } = yield call(() =>
      jiraNewService.updateProject(action.projectUpdated)
    );
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      alert("Bạn đã Update Project thành công !");
      // Refresh brower
      yield put({
        type: GET_PROJECT_LIST_SAGA,
      });
      // Turn off drawer
      yield put({
        type: CLOSE_DRAWER,
      });
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
  yield delay(500);
}

export function* followUpdateProjectSaga() {
  //only take the latest input from users
  yield takeLatest(SET_SUBMIT_EDIT_PROJECT, updateProjectSaga);
}
