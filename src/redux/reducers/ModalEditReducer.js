import React from "react";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_CREATE_TASK,
  SET_SUBMIT_EDIT_PROJECT,
} from "../constants/JiraNewConstants";
const stateDefault = {
  visible: false,
  ComponentContentDrawer: <p>default Drawer Content</p>,
  callBackSubmit: () => {
    alert("Submit Values");
  },
  title: "",
};

export const ModalEditReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, visible: true };
    }

    case CLOSE_DRAWER: {
      return { ...state, visible: false };
    }
    case OPEN_FORM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };
    }

    case SET_SUBMIT_EDIT_PROJECT: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    case SET_SUBMIT_CREATE_TASK: {
      state.callBackSubmit = action.submitFunctionCreateTask;
      return { ...state };
    }
    case OPEN_FORM_CREATE_TASK: {
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      state.title = action.title;
      return { ...state };
    }

    default: {
      return state;
    }
  }
};
