import {
  GET_ALL_COMMENT_REDUCER,
  INSERT_COMMENT_REDUCER,
} from "../constants/JiraNewConstants";

const initialState = {
  commentList: [],
  dateTime: {},
};

export const CommentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT_REDUCER: {
      state.commentList = action.commentList;
      state.dateTime = action.dateTime;

      return { ...state };
    }

    case INSERT_COMMENT_REDUCER: {
      state.commentList = [...state.commentList, action.commentList];

      return { ...state };
    }

    default:
      return { ...state };
  }
};
