import { Scatter } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getColors } from "@/requests";

// Import necessary parts from Chart.js
import {
  Chart as ChartJS,
  LinearScale,
  ScatterController,
  PointElement,
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
  ScatterController,
  PointElement,
  LinearScale,
  Title,
  Legend,
  Tooltip,
);

const ColorChart = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["colorData"],
    queryFn: getColors,
    retry: 3,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const scatterData = [];
  data.forEach((item) => {
    item.colors.forEach((color) => {
      scatterData.push({
        x: item.year,
        y: Math.random(),
        backgroundColor: color,
      });
    });
  });

  const chartData = {
    datasets: scatterData.map((dataPoint) => ({
      label: dataPoint.x.toString(),
      data: [{ x: dataPoint.x, y: dataPoint.y }],
      backgroundColor: dataPoint.backgroundColor,
      pointRadius: 7,
    })),
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Colors",
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chronological Color Patterns in Van Gogh's Art",
        font: {
          size: 18,
          weight: 600,
        },
        padding: {
          bottom: 18,
          top: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `Year: ${context.raw.x}, Color: ${context.dataset.backgroundColor}`,
        },
      },
    },
  };

  return (
    <div className="border p-6">
      <Scatter data={chartData} options={options} />
      <p className="mt-3">
        <span className="font-semibold">Observations: </span>The graph
        illustrates the dominant colors in Van Gogh&apos;s paintings from 1881
        to 1890, revealing significant insights into his artistic journey.
        Throughout these years, Van Gogh&apos;s use of color varied widely,
        showcasing his experimentation with different palettes. The later years
        (1884-1890) exhibit a higher density of color points, indicating an
        increased volume of paintings and greater variety in color use,
        reflecting a period of prolific work and intense creativity. In
        contrast, earlier years like 1882 and 1883 display fewer color points,
        possibly signifying fewer paintings or more uniform color usage.
        Notably, there is a visible transition from muted, darker colors in the
        early years to more vibrant and diverse colors in the later years,
        highlighting changes in his artistic style and influences. Certain
        years, such as 1884, 1885, 1887, and 1888, show peaks in color variety,
        suggesting these years were particularly innovative. Dark and earth
        tones are frequently observed throughout the years, characteristic of
        Van Gogh&apos;s early works influenced by Dutch masters and his
        depiction of peasant life. Further analysis could provide deeper
        insights into how Van Gogh&apos;s environment and mental state
        influenced his color choices during these periods.
      </p>
    </div>
  );
};

export default ColorChart;
