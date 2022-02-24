import { GET_ALL_STATUS_TYPE_REDUCER } from "../constants/JiraNewConstants";

const initialState = {
  arrStatus: [],
};

export const StatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATUS_TYPE_REDUCER:
      return { ...state, arrStatus: action.arrStatus };

    default:
      return state;
  }
};
