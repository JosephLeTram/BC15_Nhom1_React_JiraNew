import { call, takeLatest, put } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT_REDUCER,
  UPDATE_COMMENT_SAGA,
} from "../constants/JiraNewConstants";

function* updateComment(action) {
  console.log("update comment", action);
  console.log("commentUpdateModel", action.commentUpdateModel);
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      jiraNewService.updateComment(action.commentUpdateModel)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
      // Refresh after updating succesfully
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: taskId,
        // To capture data and time when user edits
        dateTime: data.dateTime,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateComment);
}
