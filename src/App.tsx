import Comparison from "./components/Comparison";
import FetchAndFilter from "./components/FetchAndFilter";
import Header from "./components/Header";
import PokeStats from "./components/PokeStats";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FetchAndFilter />} />
        <Route path="/stats/:name" element={<PokeStats />} />
        <Route path="/comparison" element={<Comparison />} />
      </Routes>
    </Router>
  );
}

export default App;
