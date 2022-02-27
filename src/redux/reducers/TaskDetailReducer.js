import {
  CHANGE_TASK_ASSIGNEE,
  CHANGE_TASK_DETAIL,
  GET_TASK_DETAIL_REDUCER,
  REMOVE_TASK_ASSIGNEE,
} from "../constants/JiraNewConstants";

const initialState = {
  taskDetailModel: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 850,
        avatar: "https://ui-avatars.com/api/?name=thangtva",
        name: "thangtva",
        alias: "thangtv",
      },
      {
        id: 913,
        avatar: "https://ui-avatars.com/api/?name=Supper Hoàng",
        name: "Supper Hoàng",
        alias: "supper-hoang",
      },
      {
        id: 923,
        avatar: "https://ui-avatars.com/api/?name=Hello",
        name: "Hello",
        alias: "hello",
      },
    ],
    lstComment: [],
    taskId: 2894,
    taskName: "test create 3",
    alias: "test-create-3",
    description: "<p>sdfasdfdsfsdf</p>",
    statusId: "3",
    originalEstimate: 11,
    timeTrackingSpent: 3,
    timeTrackingRemaining: 7,
    typeId: 2,
    priorityId: 1,
    projectId: 3400,
  },
};

export const TaskDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL_REDUCER: {
      return { ...state, taskDetailModel: action.taskDetailSaga };
    }
    case CHANGE_TASK_DETAIL: {
      const { name, value } = action;

      return {
        ...state,
        taskDetailModel: { ...state.taskDetailModel, [name]: value },
      };
    }

    case CHANGE_TASK_ASSIGNEE: {
      state.taskDetailModel.assigness = [
        ...state.taskDetailModel.assigness,
        action.userSelected,
      ];
      return { ...state };
    }

    case REMOVE_TASK_ASSIGNEE: {
      state.taskDetailModel.assigness = [
        ...state.taskDetailModel.assigness.filter(
          (user) => user.id !== action.userId
        ),
      ];
      return { ...state };
    }

    default:
      return state;
  }
};
