import { call, takeLatest, put } from "redux-saga/effects";
import {
  GET_TASK_DETAIL_REDUCER,
  GET_TASK_DETAIL_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* getTaskDetailSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.getTaskDetail(action.taskId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_REDUCER,
        taskDetailSaga: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}
