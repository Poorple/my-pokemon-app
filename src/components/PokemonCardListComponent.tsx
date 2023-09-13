import "./styles/type-colors.scss";
import { useEffect, useState } from "react";
import { GrLinkTop } from "react-icons/gr";

const PokemonCardList = ({
  pokemon,
  filteredPokemon = [],
  filterType = [],
  finalFilterList = [],
}: any) => {
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
        ? finalFilterList.map((poke: any) => (
            <article key={poke.id}>
              {poke.id < 10 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                  loading="lazy"
                />
              ) : poke.id < 100 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                  loading="lazy"
                />
              )}
              <p className="nameNhash">
                {poke.name} #{poke.id}
              </p>
              <div className="typebox">
                {poke.type.map((kind: any) => (
                  <p className={`type ${kind.toLowerCase()}`} key={kind.id}>
                    {kind}
                  </p>
                ))}
              </div>
            </article>
          ))
        : filteredPokemon.length !== 0
        ? filteredPokemon.map((poke: any) => (
            <article key={poke.id}>
              {poke.id < 10 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                  loading="lazy"
                />
              ) : poke.id < 100 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                  loading="lazy"
                />
              )}
              <p className="nameNhash">
                {poke.name} #{poke.id}
              </p>
              <div key={poke.type} className="typebox">
                {poke.type.map((kind: any) => (
                  <p className={`type ${kind.toLowerCase()}`} key={kind.id}>
                    {kind}
                  </p>
                ))}
              </div>
            </article>
          ))
        : filteredPokemon.length == 0 && filterType
        ? pokemon.map((poke: any) =>
            poke.type.map((x: string) =>
              filterType.includes(x) ? (
                <article key={poke.id}>
                  {poke.id < 10 ? (
                    <img
                      src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                      loading="lazy"
                    />
                  ) : poke.id < 100 ? (
                    <img
                      src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                      loading="lazy"
                    />
                  )}
                  <p className="nameNhash">
                    {poke.name} #{poke.id}
                  </p>
                  <div key={poke.type} className="typebox">
                    {poke.type.map((kind: any) => (
                      <p className={`type ${kind.toLowerCase()}`} key={kind.id}>
                        {kind}
                      </p>
                    ))}
                  </div>
                </article>
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
