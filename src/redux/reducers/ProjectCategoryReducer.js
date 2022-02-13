import { GET_ALL_PROJECT_CATEGORY_REDUCER } from "../constants/JiraNewConstants";

const stateDefault = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY_REDUCER: {
      state.arrProjectCategory = action.data;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
