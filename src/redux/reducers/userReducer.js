import { USER_LOGIN } from "../../GlobalSetting/domain";
import { USER_LOG_IN } from "../constants/JiraNewConstants";
let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = { userLogin: usLogin, arrUser: [] };

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USER_LOG_IN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
