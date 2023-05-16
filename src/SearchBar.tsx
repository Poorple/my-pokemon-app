import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const fetchData = (value: string) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  };
  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div>
      <div className="outer-searchbar-container">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search.."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          ></input>
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
