import About from "./About";
import ChartView from "./ChartView";
import FactOfTheDay from "./FactOfTheDay";
import ColorChart from "./ColorChart";
import CarouselView from "./CarouselView";
import InteractiveMap from "./InteractiveMap";

const HomePage = ({ className }) => {
  return (
    <main className={`w-full mx-auto p-3 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-3">
          <FactOfTheDay />
        </div>
        <div className="md:col-span-2">
          <About />
        </div>
        <div className="md:col-span-1">
          <ChartView />
        </div>
        <div className="md:col-span-3">
          <CarouselView />
        </div>
        <div className="md:col-span-3">
          <ColorChart />
        </div>
        <div className="md:col-span-3">
          <InteractiveMap />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
