import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PokemonCardListComponent from "./components/PokemonCardListComponent";
import "./pokemon-card-style.css";
import TypeFilter from "./TypeFilter";

const FetchAndFilter = () => {
  interface Pkmn {
    id: number;
    name: string;
    type: string[];
    hp: number;
    attack: number;
    defense: number;
    spattack: number;
    spdefense: number;
    speed: number;
  }

  const [pokemon, setPokemon] = useState<Pkmn[]>([]);
  const fetchData = async () => {
    try {
      const url =
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";
      const response = await axios.get(url);
      const jsonData = response.data;

      const fetchedPokemon: Pkmn[] = jsonData.map((item: any) => ({
        id: item.id,
        name: item.name.english,
        type: item.type,
        hp: item.base[0],
        attack: item.base[1],
        defense: item.base[2],
        spattack: item.base[3],
        spdefense: item.base[4],
        speed: item.base[5],
      }));

      setPokemon(fetchedPokemon);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //Get data on load
  useEffect(() => {
    fetchData();
  }, []);

  const [query, setQuery] = useState("");

  //Return updated array based on input change
  const filteredItems = useMemo(() => {
    return pokemon.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [pokemon, query]);
  //Wanted type filter state
  const [PokemonTypeFromTypeComponent, setPokemonTypeFromTypeComponent] =
    useState<string[]>([]);

  const receivePokemonTypeFromTypeComponent = (data: any) => {
    setPokemonTypeFromTypeComponent(data);
  };

  useEffect(() => {
    console.log(PokemonTypeFromTypeComponent);
  }, [PokemonTypeFromTypeComponent]);
  //Title Change
  useEffect(() => {
    document.title = "Pokédex Copycat";
  }, []);

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
        filterType={PokemonTypeFromTypeComponent}
        filteredItems={query.length > 0 ? filteredItems : []}
      />
    </>
  );
};

export default FetchAndFilter;
