import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { colors } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Comparison Chart",
    },
  },
};

export default function LineChart({ lineData }) {
  const data = {
    labels: lineData?.map((line) => line?.month),
    datasets: [
      {
        label: "Collected Fees",
        data: lineData?.map((line) => line?.fees),
        backgroundColor: colors.teal[500],
      },
      {
        label: "Supplements Sales",
        data: lineData?.map((line) => line?.supplementsSales),
        backgroundColor: colors.cyan[500],
      },
      {
        label: "Utilities Sales",
        data: lineData?.map((line) => line?.utilsSales),
        backgroundColor: colors.green[300],
      },
      {
        label: "Expenses",
        data: lineData?.map((line) => line?.expenses),
        backgroundColor: colors.teal[800],
      },
      {
        label: "Ledger",
        data: lineData?.map((line) => line?.ledger),
        backgroundColor: colors.teal[200],
      },
    ],
  };
  return <Bar options={options} data={data} style={{ width: "100%" }} />;
}
