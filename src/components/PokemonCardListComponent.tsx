import "./styles/type-colors.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrLinkTop } from "react-icons/gr";
import { combinedInterface, Pokemon, PokemonType } from "./Interfaces";

const PokemonCardList = ({
  pokemon,
  filteredPokemon,
  filterType,
  finalFilterList,
}: combinedInterface) => {
  const btnTopSelector: HTMLElement | null =
    document.querySelector(".scrollToTop");
  const [scrollPosition, setPosition] = useState(0);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    setPosition(window.scrollY);
    scrollPosition > 600
      ? !btnTopSelector?.classList.contains("visible")
        ? btnTopSelector?.classList.toggle("visible")
        : null
      : null;
    scrollPosition < 600 && btnTopSelector?.classList.contains("visible")
      ? btnTopSelector?.classList.toggle("visible")
      : null;
  };
  useEffect(() => {
    handleScroll();
  }, [window.scrollY]);

  const backToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="pkmn-cards">
      {finalFilterList && !(finalFilterList.length == 0)
        ? finalFilterList.map((poke: Pokemon) => (
            <Link key={poke.id} to={`/stats/${poke.name}`}>
              <article>
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  alt={poke.name}
                  loading="lazy"
                />
                <p className="nameNhash">
                  {poke.name} #{poke.id}
                </p>
                <div className="typebox">
                  {poke.type.map((kind: PokemonType) => (
                    <p className={`type ${kind.toLowerCase()}`} key={kind}>
                      {kind}
                    </p>
                  ))}
                </div>
              </article>
            </Link>
          ))
        : filteredPokemon.length !== 0
        ? filteredPokemon.map((poke: Pokemon) => (
            <Link key={poke.id} to={`/stats/${poke.name}`}>
              <article>
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  alt={poke.name}
                  loading="lazy"
                />
                <p className="nameNhash">
                  {poke.name} #{poke.id}
                </p>
                <div className="typebox">
                  {poke.type.map((kind: PokemonType) => (
                    <p className={`type ${kind.toLowerCase()}`} key={kind}>
                      {kind}
                    </p>
                  ))}
                </div>
              </article>
            </Link>
          ))
        : filteredPokemon.length == 0 && filterType
        ? pokemon.map((poke: Pokemon) =>
            poke.type.map((x: PokemonType) =>
              filterType.typeArr.includes(x) ? (
                <Link key={poke.id} to={`/stats/${poke.name}`}>
                  <article key={poke.id}>
                    <img
                      src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id
                        .toString()
                        .padStart(3, "0")}.png`}
                      alt={poke.name}
                      loading="lazy"
                    />
                    <p className="nameNhash">
                      {poke.name} #{poke.id}
                    </p>
                    <div className="typebox">
                      {poke.type.map((kind: PokemonType) => (
                        <p className={`type ${kind.toLowerCase()}`} key={kind}>
                          {kind}
                        </p>
                      ))}
                    </div>
                  </article>
                </Link>
              ) : null
            )
          )
        : null}
      <button className="scrollToTop" {...GrLinkTop} onClick={backToTop}>
        <GrLinkTop className="btnIco" />
      </button>
    </div>
  );
};
export default PokemonCardList;
