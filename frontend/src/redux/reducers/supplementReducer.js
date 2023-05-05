import { createReducer } from "@reduxjs/toolkit";

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

const initialState = {
  supplements: [],
  supplementsSales: [],
};

export const supplementReducer = createReducer(
  initialState.supplements,
  (builder) => {
    builder.addCase(GET_ALL_SUPPLEMENTS_REQUEST, (state, action) => {
      return {
        loading: true,
        supplementsData: [],
      };
    });
    builder.addCase(GET_ALL_SUPPLEMENTS_SUCCESS, (state, action) => {
      return {
        loading: false,
        supplementsData: action.payload,
      };
    });
    builder.addCase(GET_ALL_SUPPLEMENTS_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(CREATE_SUPPLEMENTS_REQUEST, (state, action) => {
      return {
        loading: true,
        supplementsData: [],
      };
    });
    builder.addCase(CREATE_SUPPLEMENTS_SUCCESS, (state, action) => {
      return {
        loading: false,
        supplementsData: action.payload,
      };
    });
    builder.addCase(CREATE_SUPPLEMENTS_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_SUPPLEMENTS_STOCK_REQUEST, (state, action) => {
      return {
        loading: true,
        supplementsData: [],
      };
    });
    builder.addCase(UPDATE_SUPPLEMENTS_STOCK_SUCCESS, (state, action) => {
      return {
        loading: false,
        supplementsData: action.payload,
      };
    });
    builder.addCase(UPDATE_SUPPLEMENTS_STOCK_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
  }
);

export const supplementsSalesReducer = createReducer(
  initialState.supplementsSales,
  (builder) => {
    builder.addCase(GET_SUPPLEMENTS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        supplementsSalesData: [],
      };
    });
    builder.addCase(GET_SUPPLEMENTS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        supplementsSalesData: action.payload,
      };
    });
    builder.addCase(GET_SUPPLEMENTS_SALES_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(CREATE_SUPPLEMENTS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(CREATE_SUPPLEMENTS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        supplementsData: action.payload.sales,
      };
    });
    builder.addCase(CREATE_SUPPLEMENTS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_SUPPLEMENTS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(UPDATE_SUPPLEMENTS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        supplementsData: action.payload.sales,
      };
    });
    builder.addCase(UPDATE_SUPPLEMENTS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(
      UPDATE_UNPAID_SUPPLEMENTS_SALES_REQUEST,
      (state, action) => {
        return {
          loading: true,
          ...state,
        };
      }
    );
    builder.addCase(
      UPDATE_UNPAID_SUPPLEMENTS_SALES_SUCCESS,
      (state, action) => {
        return {
          loading: false,
          success: action.payload.success,
          supplementsData: action.payload.sales,
        };
      }
    );
    builder.addCase(UPDATE_UNPAID_SUPPLEMENTS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(DELETE_SUPPLEMENTS_SALES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(DELETE_SUPPLEMENTS_SALES_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        supplementsData: action.payload.sales,
      };
    });
    builder.addCase(DELETE_SUPPLEMENTS_SALES_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
  }
);
