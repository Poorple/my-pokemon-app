import "./search-bar-style.css";
import PokemonCardList from "./components/PokemonListCard";
import FetchAndFilter from "./FetchAndFilter";

function App() {
  return (
    <>
      <div>
        <h1>PoKeDex</h1>
        <FetchAndFilter />
      </div>
    </>
  );
}

export default App;
