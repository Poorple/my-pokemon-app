/* import { useState, useEffect } from "react";
import axios from "axios";

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

const MyComponent: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pkmn[]>([]);
  const [filteredData, setFilteredData] = useState<Pkmn[]>([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  const filterData = (input: string) => {
    const filtered = pokemon.filter((item) => {
      return item.name.includes(input);
    });
    setFilteredData(filtered);
  };
  return pokemon;
};
export default MyComponent; */
