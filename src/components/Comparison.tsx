import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon, PokeInfo, PokeStats } from "./Interfaces";
import "./styles/comparison.scss";

const Comparison = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [filterTextOne, setFilterTextOne] = useState("");
  const [filterTextTwo, setFilterTextTwo] = useState("");
  const [showDropdownOne, setShowDropdownOne] = useState<boolean>(false);
  const [showDropdownTwo, setShowDropdownTwo] = useState<boolean>(false);
  const [pokeStats, setPokeStats] = useState<PokeStats>();
  const [totalFirst, setTotalFirst] = useState<number>(0);
  const [totalSecond, setTotalSecond] = useState<number>(0);

  const handleFilterChangeOne = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterTextOne(event.target.value);
    if (filterTextOne !== "") {
      setShowDropdownOne(true);
    }
  };
  const handleFilterChangeTwo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterTextTwo(event.target.value);
    if (filterTextTwo !== "") {
      setShowDropdownTwo(true);
    } else setShowDropdownTwo(false);
  };

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

      setAllPokemon(fetchedPokemon);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (allPokemon.length === 0) {
      fetchData();
    }
  }, []);

  const firstFilteredPokemonList = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filterTextOne.toLowerCase())
  );
  const secondFilteredPokemonList = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filterTextTwo.toLowerCase())
  );

  const handlePokemonSelectOne = (selectedPokemon: Pokemon) => {
    setPokemon1(selectedPokemon);
    setShowDropdownOne(false);
  };
  const handlePokemonSelectTwo = (selectedPokemon: Pokemon) => {
    setPokemon2(selectedPokemon);
    setShowDropdownTwo(false);
  };

  const calcDifference = (pok1: Pokemon, pok2: Pokemon) => {
    setPokeStats((stats) => ({
      stats,
      hp: pok1.hp - pok2.hp,
      attack: pok1.attack - pok2.attack,
      defense: pok1.defense - pok2.defense,
      spattack: pok1.spattack - pok2.spattack,
      spdefense: pok1.spdefense - pok2.spdefense,
      speed: pok1.speed - pok2.speed,
      total:
        pok1.attack +
        pok1.defense +
        pok1.hp +
        pok1.spattack +
        pok1.spdefense +
        pok1.speed -
        pok2.attack -
        pok2.defense -
        pok2.hp -
        pok2.spattack -
        pok2.spdefense -
        pok2.speed,
    }));
  };

  const calcSpanWidth = (num: number) => {
    return (num / 255) * 100;
  };
  const betterPkmn = (num1: number, num2: number) => {
    if (pokemon1 && pokemon2) {
      if (num1 === num2) {
        return null;
      } else if (num1 > num2) {
        return pokemon1.name;
      } else return pokemon2.name;
    }
  };

  useEffect(() => {
    if (pokemon1 && pokemon2) {
      calcDifference(pokemon1, pokemon2);
      setTotalFirst(
        pokemon1.attack +
          pokemon1.defense +
          pokemon1.hp +
          pokemon1.spattack +
          pokemon1.spdefense +
          pokemon1.speed
      );
      setTotalSecond(
        pokemon2.attack +
          pokemon2.defense +
          pokemon2.hp +
          pokemon2.spattack +
          pokemon2.spdefense +
          pokemon2.speed
      );
    }
  }, [pokemon1, pokemon2]);

  useEffect(() => {
    if (filterTextOne == "") {
      setShowDropdownOne(false);
    }
  }, [filterTextOne]);

  useEffect(() => {
    if (filterTextTwo == "") {
      setShowDropdownOne(false);
    }
  }, [filterTextTwo]);

  return (
    <main>
      <h1>Pokemon Comparator</h1>
      <div className="search-containter">
        <div>
          <h2>Select Pokemon 1</h2>
          <input
            type="text"
            placeholder="Search Pokemon"
            value={filterTextOne}
            onChange={handleFilterChangeOne}
          />
          {showDropdownOne && (
            <ul>
              {firstFilteredPokemonList.map((pokemon) => (
                <li
                  key={pokemon.id}
                  onClick={() => handlePokemonSelectOne(pokemon)}
                  style={{ padding: "5px", cursor: "pointer" }}
                >
                  {pokemon.name} (ID: {pokemon.id})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2>Select Pokemon 2</h2>
          <input
            type="text"
            placeholder="Search Pokemon"
            value={filterTextTwo}
            onChange={handleFilterChangeTwo}
          />
          {showDropdownTwo ? (
            <ul>
              {secondFilteredPokemonList.map((pokemon) => (
                <li
                  key={pokemon.id}
                  onClick={() => handlePokemonSelectTwo(pokemon)}
                  style={{ padding: "5px", cursor: "pointer" }}
                >
                  {pokemon.name} (ID: {pokemon.id})
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <article className="comparison-article">
        <div>
          {pokemon1 && (
            <div>
              <h3>Pokemon One</h3>
              <img
                src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokemon1.id
                  .toString()
                  .padStart(3, "0")}.png`}
                alt={pokemon1.name}
              ></img>
              <p>Name: {pokemon1.name}</p>
              <p>ID: {pokemon1.id}</p>
              <p>Hp: {pokemon1.hp}</p>
              <p>Attack: {pokemon1.attack}</p>
              <p>Sp. Attack: {pokemon1.spattack}</p>
              <p>Sp. Defense: {pokemon1.spdefense}</p>
              <p>Speed: {pokemon1.speed}</p>
            </div>
          )}
        </div>
        <div className="stat-bar-div">
          {pokeStats && pokemon1 && pokemon2 ? (
            <div className="central-piece">
              <h3>Stat Difference</h3>
              <div className="graph-sect">
                <section className="graph first">
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon1.hp)}%`,
                      background: "#FF0000",
                      height: `1.5rem`,
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon1.attack)}%`,
                      background: "#F08030",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon1.defense)}%`,
                      background: "#F8D030",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon1.spattack)}%`,
                      background: "#6890F0",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon1.spdefense)}%`,
                      background: "#78C850",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon1.speed)}%`,
                      background: "#F85888",
                    }}
                  ></span>
                </section>
                <section className="stat-dif">
                  <div>
                    <p>
                      HP <br />
                      {Math.abs(pokeStats.hp)}
                    </p>
                  </div>
                  <div>
                    <p>
                      Att. <br />
                      {Math.abs(pokeStats.attack)}
                    </p>
                  </div>
                  <div>
                    <p>
                      Def.
                      <br /> {Math.abs(pokeStats.defense)}
                    </p>
                  </div>
                  <div>
                    <p>
                      Sp.Att.
                      <br /> {Math.abs(pokeStats.spattack)}
                    </p>
                  </div>
                  <div>
                    <p>
                      Sp.Def.
                      <br /> {Math.abs(pokeStats.spdefense)}
                    </p>
                  </div>
                  <div>
                    <p>
                      Speed
                      <br /> {Math.abs(pokeStats.speed)}
                    </p>
                  </div>
                  <div>
                    <p>
                      Total {betterPkmn(totalFirst, totalSecond)} Advantage
                      <br /> {Math.abs(pokeStats.total)}
                    </p>
                    <span
                      style={{ width: `${calcSpanWidth(pokeStats.total)}%` }}
                    ></span>
                  </div>
                </section>
                <section className="graph">
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon2.hp)}%`,
                      background: "#FF0000",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon2.attack)}%`,
                      background: "#F08030",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon2.defense)}%`,
                      background: "#F8D030",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon2.spattack)}%`,
                      background: "#6890F0",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon2.spdefense)}%`,
                      background: "#78C850",
                    }}
                  ></span>
                  <span
                    style={{
                      width: `${calcSpanWidth(pokemon2.speed)}%`,
                      background: "#F85888",
                    }}
                  ></span>
                </section>
              </div>
            </div>
          ) : null}
        </div>
        {pokemon2 && (
          <div>
            <h3>Pokemon Two</h3>
            <img
              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokemon2.id
                .toString()
                .padStart(3, "0")}.png`}
              alt={pokemon2.name}
            ></img>
            <p>Name: {pokemon2.name}</p>
            <p>ID: {pokemon2.id}</p>
            <p>Hp: {pokemon2.hp}</p>
            <p>Attack: {pokemon2.attack}</p>
            <p>Sp. Attack: {pokemon2.spattack}</p>
            <p>Sp. Defense: {pokemon2.spdefense}</p>
            <p>Speed: {pokemon2.speed}</p>
          </div>
        )}
      </article>
    </main>
  );
};
export default Comparison;
