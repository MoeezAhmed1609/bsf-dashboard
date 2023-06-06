import { createReducer } from "@reduxjs/toolkit";

// Constants Import
import {
  GET_ALL_REMINDER_REQUEST,
  GET_ALL_REMINDER_SUCCESS,
  GET_ALL_REMINDER_FAIL,
  CREATE_REMINDER_REQUEST,
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER_FAIL,
} from "../constants/reminderConstants";

const initialState = {
  reminders: [],
};

export const reminderReducer = createReducer(initialState, (builder) => {
  builder.addCase(GET_ALL_REMINDER_REQUEST, (state, action) => {
    return {
      loading: true,
      remindersData: [],
    };
  });
  builder.addCase(GET_ALL_REMINDER_SUCCESS, (state, action) => {
    return {
      loading: false,
      remindersData: action.payload,
    };
  });
  builder.addCase(GET_ALL_REMINDER_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(CREATE_REMINDER_REQUEST, (state, action) => {
    return {
      loading: true,
      remindersData: [],
    };
  });
  builder.addCase(CREATE_REMINDER_SUCCESS, (state, action) => {
    return {
      loading: false,
      remindersData: action.payload,
    };
  });
  builder.addCase(CREATE_REMINDER_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});
