import { createReducer } from "@reduxjs/toolkit";

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

const initialState = {
  utils: [],
  utilsSales: [],
};

export const utilsReducer = createReducer(initialState.utils, (builder) => {
  builder.addCase(GET_ALL_UTILS_REQUEST, (state, action) => {
    return {
      loading: true,
      utilsData: [],
    };
  });
  builder.addCase(GET_ALL_UTILS_SUCCESS, (state, action) => {
    return {
      loading: false,
      utilsData: action.payload,
    };
  });
  builder.addCase(GET_ALL_UTILS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(CREATE_UTILS_REQUEST, (state, action) => {
    return {
      loading: true,
      utilsData: [],
    };
  });
  builder.addCase(CREATE_UTILS_SUCCESS, (state, action) => {
    return {
      loading: false,
      utilsData: action.payload,
    };
  });
  builder.addCase(CREATE_UTILS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_UTILS_STOCK_REQUEST, (state, action) => {
    return {
      loading: true,
      utilsData: [],
    };
  });
  builder.addCase(UPDATE_UTILS_STOCK_SUCCESS, (state, action) => {
    return {
      loading: false,
      utilsData: action.payload,
    };
  });
  builder.addCase(UPDATE_UTILS_STOCK_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});

export const utilsSalesReducer = createReducer(
  initialState.utilsSales,
  (builder) => {
    builder.addCase(GET_UTILS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        utilsSalesData: [],
      };
    });
    builder.addCase(GET_UTILS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        utilsSalesData: action.payload,
      };
    });
    builder.addCase(GET_UTILS_SALES_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(CREATE_UTILS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(CREATE_UTILS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        salesData: action.payload.sales,
      };
    });
    builder.addCase(CREATE_UTILS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_UTILS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(UPDATE_UTILS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        salesData: action.payload.sales,
      };
    });
    builder.addCase(UPDATE_UTILS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_UNPAID_UTILS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(UPDATE_UNPAID_UTILS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        salesData: action.payload.sales,
      };
    });
    builder.addCase(UPDATE_UNPAID_UTILS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(DELETE_UTILS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(DELETE_UTILS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        salesData: action.payload.sales,
      };
    });
    builder.addCase(DELETE_UTILS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
  }
);
