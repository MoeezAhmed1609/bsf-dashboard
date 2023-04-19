import React from "react";

// Redux Toolkit Import
import { useSelector } from "react-redux";

// Material UI Import
import { Box, Typography, colors } from "@mui/material";

// Components Import
import LedgerTable from "../components/LedgerTable";

const Ledger = () => {
  // Getting sales from redux state
  const { supplementsSalesData } = useSelector(
    (state) => state.supplementsSales
  );
  const { utilsSalesData } = useSelector((state) => state.utilsSales);

  // React States
  const ledger = [];

  supplementsSalesData?.supplementSales?.map((sales) => {
    if(sales?.sale?.isPaid === false) {
      ledger.push({
        customer: sales?.customer,
        sales,
      });
    }
  });
  console.log(ledger)
  return (
    <>
      <Box
        sx={{
          padding: "80px 0 80px 65px",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "74px",
            width: "88%",
            display: "flex",
            alignItems: "center",
            paddingLeft: { xs: "10px", sm: "20px", md: "30px" },
            paddingTop: { xs: "10px", sm: "20px", md: "30px" },
            borderBottom: `2px solid ${colors.lightGreen[700]}`,
          }}
        >
          <Typography variant="h5">Ledger</Typography>
        </Box>
        <Box
          sx={{
            minHeight: "65vh",
            width: "90%",
            border: `2px solid ${colors.lightGreen[700]}`,
            marginTop: "30px",
            borderRadius: "20px",
            padding: {
              xs: "20px 14px",
              sm: "20px",
            },
          }}
        >
          <LedgerTable ledger={ledger} />
        </Box>
      </Box>
    </>
  );
};

export default Ledger;
