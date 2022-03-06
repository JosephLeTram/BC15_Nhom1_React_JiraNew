import { GET_LIST_USER_REDUCER } from "../constants/JiraNewConstants";

const stateDefault = {
  userList: [],
};

export const UserListReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_USER_REDUCER: {
      state.userList = action.userList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
