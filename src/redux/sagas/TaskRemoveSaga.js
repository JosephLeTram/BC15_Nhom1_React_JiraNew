import { call, takeLatest, put } from "redux-saga/effects";
import {
  GET_PROJECT_DETAIL_SAGA,
  REMOVE_TASK_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* removeTaskSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      jiraNewService.deleteTask(taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      // Refresh after deleting succesfully
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.projectId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followRemoveTaskSaga() {
  yield takeLatest(REMOVE_TASK_SAGA, removeTaskSaga);
}
