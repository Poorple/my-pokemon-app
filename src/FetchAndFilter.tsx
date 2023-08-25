import { useEffect, useState } from "react";
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
  //Get data on load and change title on mount
  useEffect(() => {
    if (pokemon.length === 0) {
      fetchData();
    }
    document.title = "Pokédex Copycat";
  }, []);

  const [query, setQuery] = useState<string>("");

  //Wanted type filter state
  const [PokemonTypeFromTypeComponent, setPokemonTypeFromTypeComponent] =
    useState<string[]>([]);

  const receivePokemonTypeFromTypeComponent = (data: any) => {
    setPokemonTypeFromTypeComponent(data);
  };

  //Return updated array based on input change and type change
  /* const filteredItems = useMemo(() => {
    return pokemon.filter((item) => {
      if (typeof PokemonTypeFromTypeComponent === "undefined") {
        return item.name.toLowerCase().includes(query.toLowerCase());
      } else if (!(typeof PokemonTypeFromTypeComponent === "undefined")) {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.type.some((type) => PokemonTypeFromTypeComponent.includes(type))
        );
      }
    });
  }, [pokemon, query, PokemonTypeFromTypeComponent]); */
  let pokemonToBeFiltered = pokemon;
  let filteredPokemon: Pkmn[] = [];
  let listIncludingType: Pkmn[] = [];
  let finalFilterList: Pkmn[] = [];
  const [theVeryBest, setTheVeryBest] = useState<Pkmn[]>();
  const [inputFilter, setInputFilter] = useState<Pkmn[]>();

  //If item contains input make an array of Pokemon containing input && if item contains type make an array of Pokemon containing type
  useEffect(() => {
    pokemonToBeFiltered.filter((item) => {
      item.name.toLowerCase().includes(query.toLowerCase())
        ? filteredPokemon.push(item)
        : null;
    });
    setInputFilter(filteredPokemon);

    PokemonTypeFromTypeComponent
      ? pokemonToBeFiltered.filter((item) => {
          item.type.some((type) => PokemonTypeFromTypeComponent.includes(type))
            ? listIncludingType.push(item)
            : null;
        })
      : null;
    finalFilter(filteredPokemon, listIncludingType);
  }, [query, PokemonTypeFromTypeComponent]);
  // If item contains type make an array of Pokemon containing type

  //Filtered list of Pokemon checking type and input and creating new list containing both
  const finalFilter = (filteredPokemon: Pkmn[], listIncludingType: Pkmn[]) => {
    filteredPokemon.length == 0 || listIncludingType.length == 0
      ? (finalFilterList.length = 0)
      : null;
    filteredPokemon && listIncludingType
      ? filteredPokemon.forEach((x: Pkmn) =>
          listIncludingType.includes(x) ? finalFilterList.push(x) : null
        )
      : null;
    setTheVeryBest(finalFilterList);
    console.log(theVeryBest);
  };

  //2.

  //debounce
  //1. 1 komponenta- svi pokemoni->onMount ✓
  //2. jos jedan state koji su filtrirani pokemoni ✓
  //3. filter onChange prima value inputa e.target.value kojeg prima lista filtriraj_mi_pokemone
  //4. const x ce biti svi pokemoni.filter koji ce bit e.target.value od html elementa
  //5. na input staviti debounce
  //6. setFiltriraniPokemoni(x)
  //7. filter mora ukljucivati i tip isto kako je u losoj verziji napisano
  //8. jos jedna metoda koja ce filtrirati samo na temelju tipa
  //9. prva metoda ce primati input i filtrirati na temelju toga i tipa koji je odabran ako je settan
  //10. druga metoda koja ce se pozivati kada cu odabrati tip i ona ce primati kao argument tip koji sam odabrao i onda filtrira na temelju tipa i naziva ako postoji
  //11. filtrirana lista koja sadrzi samo tipove
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
          filteredPokemon.length == 0
            ? PokemonTypeFromTypeComponent &&
              !(typeof PokemonTypeFromTypeComponent === "undefined")
              ? PokemonTypeFromTypeComponent
              : null
            : listIncludingType
            ? listIncludingType
            : null
        }
        filteredPokemon={query.length > 0 ? inputFilter : []}
        pokemon={query.length == 0 ? pokemon : []}
        finalFilterList={theVeryBest}
      />
    </>
  );
};

export default FetchAndFilter;
