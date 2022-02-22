import {
  EDIT_PROJECT_SAGA,
  GET_PROJECT_DETAIL_REDUCER,
} from "../constants/JiraNewConstants";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "projectName",
    creator: 0,
    description: "<h1>description</h1>description",
    categoryId: "cateaID",
  },
  projectDetail: {},
};

export const ProjectEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT_SAGA: {
      state.projectEdit = action.projectEditModel;
      return { ...state };
    }

    case GET_PROJECT_DETAIL_REDUCER: {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }

    default:
      return state;
  }
};
