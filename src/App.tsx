import DataFetching from "./DataFetching";
import SearchBar from "./SearchBar";
import "./search-bar-style.css";
/* import SearchResultsList from "./SearchResultsList"; */

function App() {
  return (
    <>
      <div>
        <h1>PoKeDex</h1>
        <SearchBar />
        <DataFetching />
      </div>
    </>
  );
}

export default App;
