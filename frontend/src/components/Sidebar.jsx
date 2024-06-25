import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import YearList from "./YearList";
import LocationList from "./LocationList";
import QuoteOfTheDay from "./QuoteOfTheDay";
import Timeline from "./Timeline";

const Sidebar = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <aside
      className={`bg-gradient-to-t from-goghFive-200 to-goghSeven-200 ${className}`}
    >
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Search paintings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="mt-3 w-full" variant="outline" type="submit">
          Search
        </Button>
      </form>
      <LocationList />
      <YearList />
      <QuoteOfTheDay />
      <Timeline />
    </aside>
  );
};

export default Sidebar;
