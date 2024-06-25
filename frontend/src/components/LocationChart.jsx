import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getLocationsAndCount } from "@/requests";

// Import necessary parts from Chart.js
import {
  Chart as ChartJS,
  ArcElement,
  PieController,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

// Registering components globally
ChartJS.register(ArcElement, PieController, Title, Legend, Tooltip);

const LocationChart = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["locationsAndCount"],
    queryFn: getLocationsAndCount,
    retry: 3,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const locations = data.map((item) => item.location);
  const counts = data.map((item) => item.count);

  const chartData = {
    labels: locations,
    datasets: [
      {
        label: "Number of Paintings",
        data: counts,
        backgroundColor: [
          "#123F77",
          "#A3BED3",
          "#1E7CAB",
          "#A8D7E7",
          "#31BADA",
          "#85CEC6",
          "#C2D59D",
          "#E2DE8F",
          "#FBF5D8",
          "#978F7A",
          "#85cec6",
        ],
        borderColor: [
          "#123F77",
          "#A3BED3",
          "#1E7CAB",
          "#A8D7E7",
          "#31BADA",
          "#85CEC6",
          "#C2D59D",
          "#E2DE8F",
          "#FBF5D8",
          "#978F7A",
          "#85cec6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Van's Paintings Over Locations",
        font: {
          size: 18,
          weight: 600,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of Paintings",
        },
        ticks: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Locations",
        },
        ticks: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} />;
};

export default LocationChart;
