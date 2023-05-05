import { createReducer } from "@reduxjs/toolkit";

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
  UPDATE_CLIENT_ADMISSION_REQUEST,
  UPDATE_CLIENT_ADMISSION_SUCCESS,
  UPDATE_CLIENT_ADMISSION_FAIL,
  UPDATE_CLIENT_UNPAID_FEES_REQUEST,
  UPDATE_CLIENT_UNPAID_FEES_SUCCESS,
  UPDATE_CLIENT_UNPAID_FEES_FAIL,
  CLEAR_ALL_ERRORS,
} from "../constants/clientConstants";

const initialState = {
  clients: [],
  clientDetails: {},
};

export const clientReducer = createReducer(initialState.clients, (builder) => {
  builder.addCase(GET_CLIENTS_REQUEST, (state, action) => {
    return {
      loading: true,
      clientsData: [],
    };
  });
  builder.addCase(GET_CLIENTS_SUCCESS, (state, action) => {
    return {
      loading: false,
      clientsData: action.payload,
    };
  });
  builder.addCase(GET_CLIENTS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(CREATE_CLIENTS_REQUEST, (state, action) => {
    return {
      loading: true,
      clientsData: [],
    };
  });
  builder.addCase(CREATE_CLIENTS_SUCCESS, (state, action) => {
    return {
      loading: false,
      clientsData: action.payload,
    };
  });
  builder.addCase(CREATE_CLIENTS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_CLIENT_ADMISSION_REQUEST, (state, action) => {
    return {
      loading: true,
      clientsData: [],
    };
  });
  builder.addCase(UPDATE_CLIENT_ADMISSION_SUCCESS, (state, action) => {
    return {
      loading: false,
      clientsData: action.payload,
    };
  });
  builder.addCase(UPDATE_CLIENT_ADMISSION_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_CLIENT_UNPAID_FEES_REQUEST, (state, action) => {
    return {
      loading: true,
      clientsData: [],
    };
  });
  builder.addCase(UPDATE_CLIENT_UNPAID_FEES_SUCCESS, (state, action) => {
    return {
      loading: false,
      clientsData: action.payload,
    };
  });
  builder.addCase(UPDATE_CLIENT_UNPAID_FEES_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(CLEAR_ALL_ERRORS, (state, action) => {
    return {
      ...state,
      error: null,
    };
  });
});

export const clientDetailsReducer = createReducer(
  initialState.clientDetails,
  (builder) => {
    builder.addCase(GET_CLIENTS_DETAIL_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(GET_CLIENTS_DETAIL_SUCCESS, (state, action) => {
      return {
        loading: false,
        client: action.payload,
      };
    });
    builder.addCase(GET_CLIENTS_DETAIL_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_CLIENT_STATUS_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(UPDATE_CLIENT_STATUS_SUCCESS, (state, action) => {
      return {
        loading: false,
        client: action.payload,
      };
    });
    builder.addCase(UPDATE_CLIENT_STATUS_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_CLIENT_FEES_REQUEST, (state, action) => {
      return {
        loading: true,
        ...state,
      };
    });
    builder.addCase(UPDATE_CLIENT_FEES_SUCCESS, (state, action) => {
      return {
        loading: false,
        client: action.payload,
      };
    });
    builder.addCase(UPDATE_CLIENT_FEES_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
  }
);
