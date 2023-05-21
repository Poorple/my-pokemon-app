import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div>
      <div className="outer-searchbar-container">
        <div className="searchbar">
          <input type="text" placeholder="Search.."></input>
          <button
            className="DocSearch DocSearch-Button"
            type="button"
            aria-label="Search"
          >
            <FaSearch id="search-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
