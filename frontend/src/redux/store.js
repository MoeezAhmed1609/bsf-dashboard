import { configureStore } from "@reduxjs/toolkit";

// Reducers Import
import { clientReducer, clientDetailsReducer } from "./reducers/clientReducer";
import { utilsReducer, utilsSalesReducer } from "./reducers/utilsReducer";
import {
  supplementReducer,
  supplementsSalesReducer,
} from "./reducers/supplementReducer";
import { expenseReducer } from "./reducers/expenseReducer";

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    clientDetail: clientDetailsReducer,
    utils: utilsReducer,
    utilsSales: utilsSalesReducer,
    supplements: supplementReducer,
    supplementsSales: supplementsSalesReducer,
    expenses: expenseReducer,
  },
});
