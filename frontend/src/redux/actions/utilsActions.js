import axios from "axios";

// Constants Import
import {
  GET_ALL_UTILS_REQUEST,
  GET_ALL_UTILS_SUCCESS,
  GET_ALL_UTILS_FAIL,
  CREATE_UTILS_REQUEST,
  CREATE_UTILS_SUCCESS,
  CREATE_UTILS_FAIL,
  GET_UTILS_SALES_REQUEST,
  GET_UTILS_SALES_SUCCESS,
  GET_UTILS_SALES_FAIL,
  CREATE_UTILS_SALES_REQUEST,
  CREATE_UTILS_SALES_SUCCESS,
  CREATE_UTILS_SALES_FAIL,
  UPDATE_UTILS_SALES_REQUEST,
  UPDATE_UTILS_SALES_SUCCESS,
  UPDATE_UTILS_SALES_FAIL,
  UPDATE_UNPAID_UTILS_SALES_REQUEST,
  UPDATE_UNPAID_UTILS_SALES_SUCCESS,
  UPDATE_UNPAID_UTILS_SALES_FAIL,
  DELETE_UTILS_SALES_REQUEST,
  DELETE_UTILS_SALES_SUCCESS,
  DELETE_UTILS_SALES_FAIL,
  UPDATE_UTILS_STOCK_REQUEST,
  UPDATE_UTILS_STOCK_SUCCESS,
  UPDATE_UTILS_STOCK_FAIL,
} from "../constants/utilsConstants";

// Get all Utils
export const getAllUtils = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_UTILS_REQUEST });
    const { data } = await axios.get("/api/v1/utils");
    dispatch({ type: GET_ALL_UTILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_UTILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Utils
export const createUtils = (utilsData) => async (dispatch) => {
  dispatch({ type: CREATE_UTILS_REQUEST });

  const { data } = await axios({
    url: "/api/v1/utils/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      utils: utilsData.utils,
      image: utilsData.image,
    },
  })
    .then((r) => {
      dispatch({ type: CREATE_UTILS_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: CREATE_UTILS_FAIL,
        payload: err,
      });
    });
};

// Get all utils Sales

export const getUtilsSales = () => async (dispatch) => {
  try {
    dispatch({ type: GET_UTILS_SALES_REQUEST });
    const { data } = await axios.get("/api/v1/utils/sales");
    dispatch({ type: GET_UTILS_SALES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_UTILS_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Utils Sales
export const createUtilsSales = (utilsSalesData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_UTILS_SALES_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/v1/utils/sales/create",
      utilsSalesData,
      config
    );

    dispatch({ type: CREATE_UTILS_SALES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_UTILS_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Sales
export const updateUtilsSales = (utilsSalesUpdateData) => async (dispatch) => {
  dispatch({ type: UPDATE_UTILS_SALES_REQUEST });

  const { data } = await axios({
    url: "/api/v1/utils/sales/update",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      userId: utilsSalesUpdateData.userId,
      salesData: utilsSalesUpdateData.salesData,
    },
  })
    .then((r) => {
      dispatch({ type: UPDATE_UTILS_SALES_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: UPDATE_UTILS_SALES_FAIL,
        payload: err,
      });
    });
};

// Update unpaid sales
export const updateUnpaidUtilsSalesReceipt =
  (utilsSalesUpdateData) => async (dispatch) => {
    dispatch({ type: UPDATE_UNPAID_UTILS_SALES_REQUEST });
    const data = await axios({
      url: "/api/v1/utils/sales/update/unpaid",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        saleId: utilsSalesUpdateData.saleId,
        isPaid: utilsSalesUpdateData.isPaid,
        amountBalance: utilsSalesUpdateData.amountBalance,
        amountPaid: utilsSalesUpdateData.amountPaid,
      },
    })
      .then((r) => {
        console.log(r);
        dispatch({ type: UPDATE_UNPAID_UTILS_SALES_SUCCESS, payload: r.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_UNPAID_UTILS_SALES_FAIL,
          payload: err,
        });
      });
  };

// Delete sales receipt
// export const deleteSalesReceipt = (utilsSalesUpdateData) => async (
//   dispatch,
// ) => {
//   dispatch({ type: UPDATE_UNPAID_UTILS_SALES_REQUEST })
//   const { data } = await axios({
//     url: '/api/v1/utils/sales/delete',
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//     data: {
//       userId: utilsSalesUpdateData.userId,
//       receiptId: utilsSalesUpdateData.receiptId,
//     },
//   })
//     .then((r) => {
//       console.log(r.data)
//       dispatch({ type: UPDATE_UNPAID_UTILS_SALES_SUCCESS, payload: r.data })
//     })
//     .catch((err) => {
//       console.log(err)
//       dispatch({
//         type: UPDATE_UNPAID_UTILS_SALES_FAIL,
//         payload: err,
//       })
//     })
// }

// Update Utils Stock
export const updateUtilsStock = (updateData) => async (dispatch) => {
  dispatch({ type: UPDATE_UTILS_STOCK_REQUEST });
  const data = await axios({
    url: "/api/v1/utils/stock",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      utilId: updateData?.utilId,
      stock: updateData?.stock,
    },
  })
    .then((r) => {
      console.log(r);
      dispatch({ type: UPDATE_UTILS_STOCK_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: UPDATE_UTILS_STOCK_FAIL,
        payload: err,
      });
    });
};
