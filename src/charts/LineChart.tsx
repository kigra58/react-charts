import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useFetch from "../hooks/useFetch";

const LineChart: React.FC = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const { data, loading, error } = useFetch(`http://localhost:3021/friends`);
  if (loading) return <h1> Loading...</h1>;
  if (error) return <h1> Unbale to fetch data</h1>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const datas = {
    labels: ["School", "College", "Office"],
    datasets: [
      {
        label: "My First Dataset",
        data: data.map((it: any) => it.fc),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="container mt-5 mx-auto" style={{ height: 650, width: 700 }}>
      <Line data={datas} options={options} />;
    </div>
  );
};

export default LineChart;
