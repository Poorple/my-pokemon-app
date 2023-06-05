import "./search-bar-style.css";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

function App() {
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

  useEffect(() => {
    fetchData();
    console.log(pokemon);
  }, []);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return pokemon.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [pokemon, query]);
  return (
    <>
      <div>
        <h1>PoKeDex</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search.."
        />
        <h3>Pokemon:</h3>
        <div></div>
      </div>
    </>
  );
}

export default App;
