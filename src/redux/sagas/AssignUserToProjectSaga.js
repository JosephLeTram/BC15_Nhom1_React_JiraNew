import { call, takeLatest, put } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  ASSIGN_USER_TO_PROJECT_SAGA,
  GET_PROJECT_LIST_SAGA,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* assignUserToProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.assignUserToProject(action.userProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
      console.log("action", action);
      console.log("action user project ", action.userProject);
      notificationFunction(
        "success",
        `Project ${action.userProject.projectId}`,
        `A member has been added`
      );
      //Refresh Browwser after successfully adding
      yield put({
        type: GET_PROJECT_LIST_SAGA,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followAssignUserToProjectSaga() {
  yield takeLatest(ASSIGN_USER_TO_PROJECT_SAGA, assignUserToProjectSaga);
}
