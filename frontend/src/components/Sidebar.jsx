import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";
import YearList from "./YearList";
import LocationList from "./LocationList";
import QuoteOfTheDay from "./QuoteOfTheDay";
import Timeline from "./Timeline";
import { HomeIcon } from "lucide-react";

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
      <Link
        to="/"
        className="flex items-center mb-3 text-goghOne-800 font-semibold hover:text-goghOne-600 transition-colors"
      >
        <HomeIcon size={16} className="mr-2" />
        <span>Home</span>
      </Link>
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
