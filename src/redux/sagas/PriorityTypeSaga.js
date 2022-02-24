import { call, takeLatest, put } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  GET_ALL_PRIORITY_TYPE_REDUCER,
  GET_ALL_PRIORITY_TYPE_SAGA,
} from "../constants/JiraNewConstants";

function* getAllPriorityType(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.getAllPriorityType(action.projectId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PRIORITY_TYPE_REDUCER,
        priorityType: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followGetAllPriorityType() {
  yield takeLatest(GET_ALL_PRIORITY_TYPE_SAGA, getAllPriorityType);
}
