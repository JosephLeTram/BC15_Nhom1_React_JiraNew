import { GET_PROJECT_LIST_REDUCER } from "../constants/JiraNewConstants";

const stateDefault = {
  projectList: [],
};

export const ProjectListReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROJECT_LIST_REDUCER: {
      state.projectList = action.projectList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
