import { call, takeLatest, put } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  GET_ALL_STATUS_TYPE_REDUCER,
  GET_ALL_STATUS_TYPE_SAGA,
} from "../constants/JiraNewConstants";

function* getAllStatusType(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.getAllStatusType()
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATUS_TYPE_REDUCER,
        arrStatus: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followGetAllStatusType() {
  yield takeLatest(GET_ALL_STATUS_TYPE_SAGA, getAllStatusType);
}
