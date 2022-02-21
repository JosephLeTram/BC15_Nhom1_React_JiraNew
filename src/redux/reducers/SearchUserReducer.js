import { SEARCH_USER_REDUCER } from "../constants/JiraNewConstants";

const initialState = {
  userSearch: [],
};

export const SearchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER_REDUCER: {
      state.userSearch = action.listUserSearch;

      return { ...state };
    }

    default:
      return state;
  }
};
