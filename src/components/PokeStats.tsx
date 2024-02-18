import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokeInfo, Pokemon } from "./Interfaces";
import "../components/styles/poke-stats.scss";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const PokeStats = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [allPokemon, setAllPokemon] = useState<PokeInfo[]>([]);
  const [total, setTotal] = useState<number | 0>(0);
  const [pokeBack, setPokeBack] = useState<Pokemon>();
  const [pokeNext, setPokeNext] = useState<Pokemon>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json";
        const response = await axios.get(url);
        const jsonData: PokeInfo[] = response.data;

        if (jsonData && name) {
          const filteredPokemon = jsonData.find((poke) =>
            poke.name.english.toLowerCase().includes(name.toLowerCase())
          );
          if (filteredPokemon) {
            setPokemon(
              (poke) =>
                ({
                  poke,
                  id: filteredPokemon.id,
                  name: filteredPokemon.name.english,
                  type: filteredPokemon.type,
                  hp: filteredPokemon.base.HP,
                  attack: filteredPokemon.base.Attack,
                  defense: filteredPokemon.base.Defense,
                  spattack: filteredPokemon.base["Sp. Attack"],
                  spdefense: filteredPokemon.base["Sp. Defense"],
                  speed: filteredPokemon.base.Speed,
                } || null)
            );
          }
        }

        if (jsonData) {
          setAllPokemon(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  useEffect(() => {
    if (pokemon) {
      setTotal(
        pokemon.hp +
          pokemon.attack +
          pokemon.defense +
          pokemon.spattack +
          pokemon.spdefense +
          pokemon.speed
      );
      const prevPoke = allPokemon.find((poke) => poke.id == pokemon.id - 1);
      if (prevPoke) {
        setPokeBack(
          (pokeBk) =>
            ({
              pokeBk,
              id: prevPoke.id,
              name: prevPoke.name.english,
              type: prevPoke.type,
              hp: prevPoke.base.HP,
              attack: prevPoke.base.Attack,
              defense: prevPoke.base.Defense,
              spattack: prevPoke.base["Sp. Attack"],
              spdefense: prevPoke.base["Sp. Defense"],
              speed: prevPoke.base.Speed,
            } || null)
        );
      }
      console.log(pokeBack);
      const nextPoke = allPokemon.find((poke) => poke.id === pokemon.id + 1);
      if (nextPoke) {
        setPokeNext(
          (pokeNx) =>
            ({
              pokeNx,
              id: nextPoke.id,
              name: nextPoke.name.english,
              type: nextPoke.type,
              hp: nextPoke.base.HP,
              attack: nextPoke.base.Attack,
              defense: nextPoke.base.Defense,
              spattack: nextPoke.base["Sp. Attack"],
              spdefense: nextPoke.base["Sp. Defense"],
              speed: nextPoke.base.Speed,
            } || null)
        );
      }
    }
  }, [pokemon]);

  const calcPercentage = (statNum: number) => {
    return (statNum / 255) * 100;
  };

  return (
    <>
      {pokeBack && pokeNext ? (
        <div className="btn-container">
          <Link className="btn-back" to={`/stats/${pokeBack.name}`}>
            <button>
              <FaArrowLeft />
              {`${pokeBack.name} #${pokeBack.id}`}
            </button>
          </Link>
          <Link className="btn-next" to={`/stats/${pokeNext.name}`}>
            <button>
              {`${pokeNext.name} #${pokeNext.id}`}
              <FaArrowRight />
            </button>
          </Link>
        </div>
      ) : null}
      {pokemon && (
        <article className="description-article">
          <img
            src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokemon.id
              .toString()
              .padStart(3, "0")}.png`}
            alt={pokemon.name}
          />
          <section className="desc-sect">
            <div className="first-sub-desc">
              <p className="nameNhash">
                {pokemon.name} #{pokemon.id}
              </p>
              <div className="typebox">
                {pokemon.type.map((kind: string) => (
                  <p className={`type ${kind.toLowerCase()}`} key={kind}>
                    {kind}
                  </p>
                ))}
              </div>
            </div>
            <div className="stat-sect">
              <p>{`HP: ${pokemon.hp} `}</p>
              <div className="stat-container" style={{ background: "#ff5959" }}>
                <span
                  style={{
                    width: `${calcPercentage(pokemon.hp)}%`,
                    background: "#FF0000",
                  }}
                ></span>
              </div>
              <p>{`Attack: ${pokemon.attack}`}</p>
              <div className="stat-container" style={{ background: "#f5ac78" }}>
                <span
                  style={{
                    width: `${calcPercentage(pokemon.attack)}%`,
                    background: "#F08030",
                  }}
                ></span>
              </div>
              <p>{`Defense: ${pokemon.defense}`}</p>
              <div className="stat-container" style={{ background: "#fae078" }}>
                <span
                  style={{
                    width: ` ${calcPercentage(pokemon.defense)}%`,
                    background: "#F8D030",
                  }}
                ></span>
              </div>
              <p>{`Sp. Attack: ${pokemon.spattack}`}</p>
              <div className="stat-container" style={{ background: "#9db7f5" }}>
                <span
                  style={{
                    width: `${calcPercentage(pokemon.spattack)}%`,
                    background: "#6890F0",
                  }}
                ></span>
              </div>
              <p>{`Sp. Defense: ${pokemon.spdefense}`}</p>
              <div className="stat-container" style={{ background: "#a7db8d" }}>
                <span
                  style={{
                    width: `${calcPercentage(pokemon.spdefense)}%`,
                    background: "#78C850",
                  }}
                ></span>
              </div>
              <p>{`Speed: ${pokemon.speed}`}</p>
              <div className="stat-container" style={{ background: "#fa92b2" }}>
                <span
                  style={{
                    width: `${calcPercentage(pokemon.speed)}%`,
                    background: "#F85888",
                  }}
                ></span>
              </div>
              <p>{`Total: ${total}`}</p>
              <p></p>
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default PokeStats;
