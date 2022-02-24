import { SEARCH_USER_BY_PROJECT_ID_REDUCER } from "../constants/JiraNewConstants";

const initialState = {
  userSearchByProjectId: [],
};

export const SearchUserReducerByProjectId = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER_BY_PROJECT_ID_REDUCER: {
      state.userSearchByProjectId = action.listUserSearchByProjectId;

      return { ...state };
    }

    default:
      return state;
  }
};
