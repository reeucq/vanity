import { Input } from "./ui/input";
import { Button } from "./ui/button";
import YearList from "./YearList";
import LocationList from "./LocationList";
import QuoteOfTheDay from "./QuoteOfTheDay";
import Timeline from "./Timeline";

const Sidebar = ({ className }) => {
  return (
    <aside
      className={`bg-gradient-to-t from-goghFive-200 to-goghSeven-200 ${className}`}
    >
      <Input type="text" label="Search" placeholder="text to search..." />
      <Button className="mt-3" variant="outline">
        Search
      </Button>
      <LocationList />
      <YearList />
      <QuoteOfTheDay />
      <Timeline />
    </aside>
  );
};

export default Sidebar;
