import { GET_ALL_TASK_TYPE_REDUCER } from "../constants/JiraNewConstants";

const stateDefault = {
  taskType: [],
};

export const TaskTypeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_TASK_TYPE_REDUCER: {
      state.taskType = action.taskType;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
