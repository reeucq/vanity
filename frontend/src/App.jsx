import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Sidebar from "./components/Sidebar";
import PaintingsView from "./components/PaintingsView";
import SearchView from "./components/SearchView";
import SinglePaintingView from "./components/SinglePaintingView";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row">
        <Routes>
          <Route
            path="/"
            element={<HomePage className="flex-grow order-1 md:order-2 px-3" />}
          />
          <Route
            path="/filter"
            element={
              <PaintingsView
                className="className="
                flex-grow
                order-1
                md:order-2
                px-3
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchView className="flex-grow order-1 md:order-2 px-3" />
            }
          />
          <Route
            path="/painting/:id"
            element={
              <SinglePaintingView className="flex-grow order-1 md:order-2 px-3" />
            }
          />
        </Routes>
        <Sidebar className="w-full md:w-80 p-3 border-t md:border-t-0 md:border-r order-last md:order-first" />
      </div>
      <Footer />
    </div>
  );
};

export default App;
