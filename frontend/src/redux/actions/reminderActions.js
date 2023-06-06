import axios from "axios";
// Constants Import
import {
  GET_ALL_REMINDER_REQUEST,
  GET_ALL_REMINDER_SUCCESS,
  GET_ALL_REMINDER_FAIL,
  CREATE_REMINDER_REQUEST,
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER_FAIL,
} from "../constants/reminderConstants";

// Get all reminders
export const getReminders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_REMINDER_REQUEST });
    const { data } = await axios.get("/api/v1/reminder");
    dispatch({ type: GET_ALL_REMINDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_REMINDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Reminder
export const createReminder = (reminderData) => async (dispatch) => {
  dispatch({ type: CREATE_REMINDER_REQUEST });

  const { data } = await axios({
    url: "/api/v1/reminder/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      reminder: reminderData,
    },
  })
    .then((r) => {
      dispatch({ type: CREATE_REMINDER_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: CREATE_REMINDER_FAIL,
        payload: err,
      });
    });
};
