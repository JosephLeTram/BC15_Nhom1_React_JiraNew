import { GET_ALL_PRIORITY_TYPE_REDUCER } from "../constants/JiraNewConstants";

const stateDefault = {
  priorityType: [],
};

export const PriorityTypeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PRIORITY_TYPE_REDUCER: {
      state.priorityType = action.priorityType;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
