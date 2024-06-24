import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row">
        <MainContent className="flex-grow order-1 md:order-2 px-3" />
        <Sidebar className="w-full md:w-80 p-3 border-t md:border-t-0 md:border-r order-last md:order-first" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
