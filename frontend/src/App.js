import React, { useEffect } from "react";

// React Router Dom Import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Redux Toolkit Import
import { useDispatch, useSelector } from "react-redux";

// Redux Actions Import
import { getClients } from "./redux/actions/clientActions";
import { getExpenses } from "./redux/actions/expenseActions";
import {
  getAllSupplements,
  getSupplementsSales,
} from "./redux/actions/supplementActions";
import { getUtilsSales, getAllUtils } from "./redux/actions/utilsActions";
import { getReminders } from "./redux/actions/reminderActions";

// Pages Import
import Dashboard from "./pages/Dashboard";
import Admission from "./pages/Admission";
import Profile from "./pages/Profile";
import ClientProfile from "./pages/ClientProfile";
import Utils from "./pages/Utils";
import Supplement from "./pages/Supplement";

// Components Import
import Header from "./components/Header";
import Expenses from "./pages/Expenses";
import Ledger from "./pages/Ledger";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
    dispatch(getExpenses());
    dispatch(getUtilsSales());
    dispatch(getSupplementsSales());
    dispatch(getAllSupplements());
    dispatch(getAllUtils());
    dispatch(getReminders())
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients/admission" element={<Admission />} />
        <Route path="/clients/profiles" element={<Profile />} />
        <Route path="/clients/profiles/:id" element={<ClientProfile />} />
        <Route path="/sales/utilities" element={<Utils />} />
        <Route path="/sales/supplements" element={<Supplement />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/ledger" element={<Ledger />} />
      </Routes>
    </Router>
  );
}

export default App;
