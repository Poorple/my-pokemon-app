import "../type-colors.scss";
import { useEffect } from "react";

const PokemonCardList = ({
  pokemon,
  filteredPokemon = [],
  filterType = [],
  finalFilterList = [],
}: any) => {
  useEffect(() => {
    console.log(filterType);
    console.log(finalFilterList);
    console.log(filteredPokemon);
  }, [finalFilterList, filteredPokemon]);
  return (
    <div className="pkmn-cards">
      {finalFilterList && finalFilterList.length !== 0
        ? finalFilterList.map((poke: any) => (
            <article key={poke.id}>
              {poke.id < 10 ? (
                <img
                  key={poke.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                  loading="lazy"
                />
              ) : poke.id < 100 ? (
                <img
                  key={poke.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
                  key={poke.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                  loading="lazy"
                />
              )}
              <p key={poke.name} className="nameNhash">
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
        : filteredPokemon.length !== 0
        ? filteredPokemon.map((poke: any) => (
            <article key={poke.id}>
              {poke.id < 10 ? (
                <img
                  key={poke.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                  loading="lazy"
                />
              ) : poke.id < 100 ? (
                <img
                  key={poke.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
                  key={poke.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                  loading="lazy"
                />
              )}
              <p key={poke.name} className="nameNhash">
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
                      key={poke.name.english}
                      src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                      loading="lazy"
                    />
                  ) : poke.id < 100 ? (
                    <img
                      key={poke.name.english}
                      src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      key={poke.name.english}
                      src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                      loading="lazy"
                    />
                  )}
                  <p key={poke.name} className="nameNhash">
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
    </div>
  );
};
export default PokemonCardList;
