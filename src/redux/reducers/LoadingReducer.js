import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/CyberJiraNew";

const initialState = {
  isLoading: false,
};

export let LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING:
      state.isLoading = true;
      return { ...state };

    case HIDE_LOADING:
      state.isLoading = false;
      return { ...state };

    default:
      return { ...state };
  }
};
