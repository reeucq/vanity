import YearChart from "./YearChart";
import LocationChart from "./LocationChart";

const ChartView = () => {
  return (
    <div className="flex flex-col h-full border">
      <div className="min-h-96 h-1/2">
        <YearChart />
      </div>
      <div className="min-h-96 h-1/2">
        <LocationChart />
      </div>
    </div>
  );
};

export default ChartView;
