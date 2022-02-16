import { EDIT_PROJECT_SAGA } from "../constants/JiraNewConstants";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "projectName",
    creator: 0,
    description: "<h1>description</h1>description",
    categoryId: "cateaID",
  },
};

export const ProjectEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT_SAGA: {
      state.projectEdit = action.projectEditModel;
      return { ...state };
    }

    default:
      return state;
  }
};
