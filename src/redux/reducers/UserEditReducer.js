import { EDIT_USER_SAGA } from "../constants/JiraNewConstants";

const initialState = {
  userEdit: {
    id: "1200",
    passWord: "123456",
    email: "hungletram@gmail.com",
    name: "Hung",
    phoneNumber: "0909285690",
  },
};

export const UserEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_SAGA: {
      state.userEdit = action.userEditModel;
      return { ...state };
    }

    default:
      return state;
  }
};
