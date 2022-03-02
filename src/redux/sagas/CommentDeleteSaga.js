import { call, takeLatest, put } from "redux-saga/effects";
import {
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* deleteCommentSaga(action) {
  const { taskId, idComment } = action;
  try {
    const { data, status } = yield call(() =>
      jiraNewService.deleteComment(idComment)
    );

    if (status === STATUS_CODE.SUCCESS) {
      // Refresh after deleting succesfully
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
