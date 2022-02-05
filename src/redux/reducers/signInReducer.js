const stateSignIn = {
  email: "",
  password: "",
};

const signInReducer = (state = stateSignIn, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default signInReducer;
