import { call, takeLatest, put } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  GET_PROJECT_DETAIL_SAGA,
  GET_TASK_DETAIL_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../constants/JiraNewConstants";

function* updateTaskStatus(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.updateTaskStatus(action.taskUpdateModel)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskUpdateModel.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.taskUpdateModel.projectId,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followUpdateTaskStatus() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatus);
}
