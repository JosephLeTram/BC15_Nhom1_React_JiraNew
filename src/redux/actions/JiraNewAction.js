import { USER_SIGNIN_API } from "../constants/JiraNewConstants";

export const signin_action = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
