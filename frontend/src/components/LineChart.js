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
        label: "Expenses",
        data: lineData?.map((line) => line?.expenses),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Collected Fees",
        data: lineData?.map((line) => line?.fees),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Utilities Sales",
        data: lineData?.map((line) => line?.utilsSales),
        backgroundColor: "red",
      },
      {
        label: "Supplements Sales",
        data: lineData?.map((line) => line?.supplementsSales),
        backgroundColor: "blue",
      },
    ],
  };
  return <Bar options={options} data={data} style={{ width: "100%" }} />;
}
