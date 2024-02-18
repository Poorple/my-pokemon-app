import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCardListComponent from "./PokemonCardListComponent";
import "./styles/pokemon-card-style.css";
import TypeFilter from "./TypeFilter";
import { PokeInfo, Pokemon } from "./Interfaces";

const FetchAndFilter = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const fetchData = async () => {
    try {
      const url =
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";
      const response = await axios.get(url);
      const jsonData = response.data;

      const fetchedPokemon: Pokemon[] = jsonData.map((item: PokeInfo) => ({
        id: item.id,
        name: item.name.english,
        type: item.type,
        hp: item.base.HP,
        attack: item.base.Attack,
        defense: item.base.Defense,
        spattack: item.base["Sp. Attack"],
        spdefense: item.base["Sp. Defense"],
        speed: item.base.Speed,
      }));

      setPokemon(fetchedPokemon);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //Get data on load and change title on mount
  useEffect(() => {
    if (pokemon.length === 0) {
      fetchData();
    }
  }, []);

  const [query, setQuery] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  //Wanted type filter state
  const [PokemonTypeFromTypeComponent, setPokemonTypeFromTypeComponent] =
    useState<string[]>([]);

  const receivePokemonTypeFromTypeComponent = (data: any) => {
    setPokemonTypeFromTypeComponent(data);
  };

  let pokemonToBeFiltered = pokemon;
  let filteredPokemon: Pokemon[] = [];
  let listIncludingType: Pokemon[] = [];
  let finalFilterList: Pokemon[] = [];
  const [theVeryBest, setTheVeryBest] = useState<Pokemon[]>();
  const [inputFilter, setInputFilter] = useState<Pokemon[]>();

  //If item contains input make an array of Pokemon containing input && if item contains type make an array of Pokemon containing type
  useEffect(() => {
    pokemonToBeFiltered.filter((item) => {
      item.name.toLowerCase().includes(query.toLowerCase())
        ? filteredPokemon.push(item)
        : null;
    });
    setInputFilter(filteredPokemon);
    // If item contains type make an array of Pokemon containing type
    PokemonTypeFromTypeComponent
      ? pokemonToBeFiltered.filter((item) => {
          item.type.some((type) => PokemonTypeFromTypeComponent.includes(type))
            ? listIncludingType.push(item)
            : null;
        })
      : null;
    finalFilter(filteredPokemon, listIncludingType);
  }, [debouncedInputValue, PokemonTypeFromTypeComponent]);

  //Filtered list of Pokemon checking type and input and creating new list containing both
  const finalFilter = (
    filteredPokemon: Pokemon[],
    listIncludingType: Pokemon[]
  ) => {
    filteredPokemon.length === 0 || listIncludingType.length === 0
      ? (finalFilterList.length = 0)
      : null;
    filteredPokemon && listIncludingType
      ? filteredPokemon.forEach((x: Pokemon) =>
          listIncludingType.includes(x) ? finalFilterList.push(x) : null
        )
      : null;
    setTheVeryBest(finalFilterList);
    console.log(theVeryBest);
    console.log(filteredPokemon);
  };
  // 1 second debounce/delay on input field
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(query);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query, 1000]);

  return (
    <>
      <div className="search-bar">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search.."
        />
      </div>
      <TypeFilter
        sendPokemonTypeToFetchComponent={receivePokemonTypeFromTypeComponent}
      />
      <PokemonCardListComponent
        filterType={
          PokemonTypeFromTypeComponent &&
          PokemonTypeFromTypeComponent.length > 0
            ? { typeArr: PokemonTypeFromTypeComponent }
            : { typeArr: [] }
        }
        filteredPokemon={
          debouncedInputValue.length > 0 ? inputFilter || [] : []
        }
        pokemon={debouncedInputValue.length == 0 ? pokemon : []}
        finalFilterList={theVeryBest ?? []}
      />
    </>
  );
};

export default FetchAndFilter;
