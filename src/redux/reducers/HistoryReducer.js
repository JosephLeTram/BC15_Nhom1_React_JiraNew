const historyState = {
  history: {},
};

export const HistoryReducer = (state = historyState, action) => {
  switch (action.type) {
    case "ADD_HISTORY": {
      state.history = action.history;
      console.log("history reducer", state.history);
      return { ...state };
    }

    default:
      return { ...state };
  }
};
