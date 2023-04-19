import axios from 'axios'

// Constants Import
import {
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  GET_CLIENTS_DETAIL_REQUEST,
  GET_CLIENTS_DETAIL_SUCCESS,
  GET_CLIENTS_DETAIL_FAIL,
  CREATE_CLIENTS_REQUEST,
  CREATE_CLIENTS_SUCCESS,
  CREATE_CLIENTS_FAIL,
  UPDATE_CLIENT_STATUS_REQUEST,
  UPDATE_CLIENT_STATUS_SUCCESS,
  UPDATE_CLIENT_STATUS_FAIL,
  UPDATE_CLIENT_FEES_REQUEST,
  UPDATE_CLIENT_FEES_SUCCESS,
  UPDATE_CLIENT_FEES_FAIL,
  CLEAR_ALL_ERRORS,
} from '../constants/clientConstants'

// Get all clients
export const getClients = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CLIENTS_REQUEST })
    const { data } = await axios.get('/api/v1/clients')
    dispatch({ type: GET_CLIENTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_CLIENTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Create Client
export const createClient = (clientData) => async (dispatch) => {
  dispatch({ type: CREATE_CLIENTS_REQUEST })

  const { data } = await axios({
    url: '/api/v1/clients/admission',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      client: clientData.client,
      profile: clientData.profile,
    },
  })
    .then((r) => {
      dispatch({ type: CREATE_CLIENTS_SUCCESS, payload: r.data })
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({
        type: CREATE_CLIENTS_FAIL,
        payload: err,
      })
    })
}

// Get Client Details
export const getClientDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CLIENTS_DETAIL_REQUEST })
    const { data } = await axios.get(`/api/v1/clients/${id}`)
    dispatch({ type: GET_CLIENTS_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_CLIENTS_DETAIL_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Update Client Status
export const updateClientFees = (clientData) => async (dispatch) => {
  dispatch({ type: UPDATE_CLIENT_FEES_REQUEST })

  const { data } = await axios({
    url: '/api/v1/clients/update/fees',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {
      clientId: clientData.id,
      updateFee: clientData.updateFeeData,
      feeReminder: clientData.feeReminder,
      isFeeReminded: false,
      lastFeePaidDate: clientData.lastFeePaidDate,
    },
  })
    .then((r) => {
      dispatch({ type: UPDATE_CLIENT_FEES_SUCCESS, payload: r.data })
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({
        type: UPDATE_CLIENT_FEES_FAIL,
        payload: err,
      })
    })
}

// Update Client Status
export const updateClientStatus = (clientData) => async (dispatch) => {
  dispatch({ type: UPDATE_CLIENT_STATUS_REQUEST })

  const { data } = await axios({
    url: '/api/v1/clients/update/status',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {
      clientId: clientData.id,
      status: clientData.status,
    },
  })
    .then((r) => {
      dispatch({ type: UPDATE_CLIENT_STATUS_SUCCESS, payload: r.data })
    })
    .catch((err) => {
      console.log(err.message)
      dispatch({
        type: UPDATE_CLIENT_STATUS_FAIL,
        payload: err,
      })
    })
}

// Function to clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALL_ERRORS })
}
