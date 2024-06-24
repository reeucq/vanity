import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getYearsAndCount } from "@/requests";

// Import necessary parts from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  defaults,
} from "chart.js";

defaults.font.family = "Inter";
defaults.font.size = 14;
defaults.color = "#000";

// Registering components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
);

const YearChart = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["yearsAndCount"],
    queryFn: getYearsAndCount,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  data.sort((a, b) => a.year - b.year);

  const years = data.map((item) => item.year);
  const counts = data.map((item) => item.count);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Number of Paintings",
        data: counts,
        backgroundColor: [
          "#123f77",
          "#165389",
          "#1a689b",
          "#1e7dac",
          "#2393bd",
          "#2aa9ce",
          "#33c0de",
          "#9ed0b6",
          "#e2dd8f",
          "#fbefcb",
        ],
        borderColor: [
          "#123f77",
          "#165389",
          "#1a689b",
          "#1e7dac",
          "#2393bd",
          "#2aa9ce",
          "#33c0de",
          "#9ed0b6",
          "#e2dd8f",
          "#fbefcb",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: true,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Van's Paintings Over Time",
        font: {
          size: 18,
          weight: 600,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Paintings",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
    maintainAspectRatio: false,
  };

  return <Bar data={chartData} options={options} />;
};

export default YearChart;
