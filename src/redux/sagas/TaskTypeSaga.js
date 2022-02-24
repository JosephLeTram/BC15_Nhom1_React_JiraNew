import { call, takeLatest, put } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  GET_ALL_TASK_TYPE_REDUCER,
  GET_ALL_TASK_TYPE_SAGA,
} from "../constants/JiraNewConstants";

function* getAllTaskType(action) {
  try {
    const { data, status } = yield call(() => jiraNewService.getAllTaskType());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_TASK_TYPE_REDUCER,
        taskType: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followGetAllTaskType() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType);
}
