import { useEffect } from "react";
import "../type-colors.scss";

const PokemonCardList = ({ filteredItems, filterType = [] }: any) => {
  console.log(filteredItems);
  useEffect(() => {
    console.log(filterType);
  }, [filterType]);
  return (
    <div className="pkmn-cards">
      {filteredItems.map((item: any) => (
        <article key={item.id}>
          {filterType.length === 0 || filterType?.includes(item.id) ? (
            <>
              {item.id < 10 ? (
                <img
                  key={item.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${item.id}.png`}
                  loading="lazy"
                />
              ) : item.id < 100 ? (
                <img
                  key={item.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${item.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
                  key={item.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${item.id}.png`}
                  loading="lazy"
                />
              )}
              <p key={item.name} className="nameNhash">
                {item.name} #{item.id}
              </p>
              <div key={item.type} className="typebox">
                {item.type.map((kind: any) => (
                  <p className={`type ${kind.toLowerCase()}`} key={kind.id}>
                    {kind}
                  </p>
                ))}
              </div>
            </>
          ) : !filterType.includes(item.id) ? (
            <>
              {item.id < 10 ? (
                <img
                  key={item.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${item.id}.png`}
                  loading="lazy"
                />
              ) : item.id < 100 ? (
                <img
                  key={item.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${item.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
                  key={item.name.english}
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${item.id}.png`}
                  loading="lazy"
                />
              )}
              <p className="nameNhash">
                {item.name} #{item.id}
              </p>
              <div className="typebox">
                {item.type.map((kind: any) => (
                  <p className={`type ${kind.toLowerCase()}`} key={kind.id}>
                    {kind}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </article>
      ))}
    </div>
  );
};
export default PokemonCardList;
