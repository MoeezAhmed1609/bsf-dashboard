import axios from "axios";

// Constants Import
import {
  GET_ALL_SUPPLEMENTS_REQUEST,
  GET_ALL_SUPPLEMENTS_SUCCESS,
  GET_ALL_SUPPLEMENTS_FAIL,
  CREATE_SUPPLEMENTS_REQUEST,
  CREATE_SUPPLEMENTS_SUCCESS,
  CREATE_SUPPLEMENTS_FAIL,
  GET_SUPPLEMENTS_SALES_REQUEST,
  GET_SUPPLEMENTS_SALES_SUCCESS,
  GET_SUPPLEMENTS_SALES_FAIL,
  CREATE_SUPPLEMENTS_SALES_REQUEST,
  CREATE_SUPPLEMENTS_SALES_SUCCESS,
  CREATE_SUPPLEMENTS_SALES_FAIL,
  UPDATE_SUPPLEMENTS_SALES_REQUEST,
  UPDATE_SUPPLEMENTS_SALES_SUCCESS,
  UPDATE_SUPPLEMENTS_SALES_FAIL,
  UPDATE_UNPAID_SUPPLEMENTS_SALES_REQUEST,
  UPDATE_UNPAID_SUPPLEMENTS_SALES_SUCCESS,
  UPDATE_UNPAID_SUPPLEMENTS_SALES_FAIL,
  DELETE_SUPPLEMENTS_SALES_REQUEST,
  DELETE_SUPPLEMENTS_SALES_SUCCESS,
  DELETE_SUPPLEMENTS_SALES_FAIL,
  UPDATE_SUPPLEMENTS_STOCK_REQUEST,
  UPDATE_SUPPLEMENTS_STOCK_SUCCESS,
  UPDATE_SUPPLEMENTS_STOCK_FAIL,
} from "../constants/supplementConstants";

// Get all Supplements
export const getAllSupplements = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SUPPLEMENTS_REQUEST });
    const { data } = await axios.get("/api/v1/supplement");
    dispatch({ type: GET_ALL_SUPPLEMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SUPPLEMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Supplement
export const createSupplement = (supplementData) => async (dispatch) => {
  dispatch({ type: CREATE_SUPPLEMENTS_REQUEST });

  const { data } = await axios({
    url: "/api/v1/supplement/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      supplement: supplementData.supplement,
      image: supplementData.image,
    },
  })
    .then((r) => {
      dispatch({ type: CREATE_SUPPLEMENTS_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: CREATE_SUPPLEMENTS_FAIL,
        payload: err,
      });
    });
};

// Get all supplement Sales

export const getSupplementsSales = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUPPLEMENTS_SALES_REQUEST });
    const { data } = await axios.get("/api/v1/supplement/sales");
    dispatch({ type: GET_SUPPLEMENTS_SALES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SUPPLEMENTS_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Supplement Sales
export const createSupplementSales =
  (supplementSalesData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SUPPLEMENTS_SALES_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/v1/supplement/sales/create",
        supplementSalesData,
        config
      );

      dispatch({ type: CREATE_SUPPLEMENTS_SALES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_SUPPLEMENTS_SALES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Sales
// export const updateUtilsSales = (utilsSalesUpdateData) => async (dispatch) => {
//   dispatch({ type: UPDATE_UTILS_SALES_REQUEST });

//   const { data } = await axios({
//     url: "/api/v1/utils/sales/update",
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     data: {
//       userId: utilsSalesUpdateData.userId,
//       salesData: utilsSalesUpdateData.salesData,
//     },
//   })
//     .then((r) => {
//       dispatch({ type: UPDATE_UTILS_SALES_SUCCESS, payload: r.data });
//     })
//     .catch((err) => {
//       console.log(err.message);
//       dispatch({
//         type: UPDATE_UTILS_SALES_FAIL,
//         payload: err,
//       });
//     });
// };

// Update unpaid sales
export const updateUnpaidSupplementSalesReceipt =
  (utilsSalesUpdateData) => async (dispatch) => {
    dispatch({ type: UPDATE_UNPAID_SUPPLEMENTS_SALES_REQUEST });
    const data = await axios({
      url: "/api/v1/supplement/sales/update",
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
        dispatch({
          type: UPDATE_UNPAID_SUPPLEMENTS_SALES_SUCCESS,
          payload: r.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_UNPAID_SUPPLEMENTS_SALES_FAIL,
          payload: err,
        });
      });
  };

// Delete sales
export const deleteSupplementSales = (supplementId) => async (dispatch) => {
  dispatch({ type: DELETE_SUPPLEMENTS_SALES_REQUEST });
  const { data } = await axios({
    url: "/api/v1/utils/sales/delete",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    data: {
      id: supplementId,
    },
  })
    .then((r) => {
      console.log(r.data);
      dispatch({ type: DELETE_SUPPLEMENTS_SALES_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: DELETE_SUPPLEMENTS_SALES_FAIL,
        payload: err,
      });
    });
};

export const updateSupplementStock = (updateData) => async (dispatch) => {
  dispatch({ type: DELETE_SUPPLEMENTS_SALES_REQUEST });
  const { data } = await axios({
    url: "/api/v1/supplement/stock",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      supplementId: updateData.id,
      stock: updateData.stock,
    },
  })
    .then((r) => {
      console.log(r.data);
      dispatch({ type: DELETE_SUPPLEMENTS_SALES_SUCCESS, payload: r.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: DELETE_SUPPLEMENTS_SALES_FAIL,
        payload: err,
      });
    });
};
