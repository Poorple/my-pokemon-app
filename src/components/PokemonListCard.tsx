import "../type-colors.scss";

const PokemonCardList = ({ filteredItems, filterType }: any) => {
  console.log(filterType);
  return (
    <div className="pkmn-cards">
      {filteredItems.map((item: any) => (
        <article key={item.id}>
          {filterType.includes(item.id) ? (
            <>
              {item.id < 10 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${item.id}.png`}
                  loading="lazy"
                />
              ) : item.id < 100 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${item.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
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
          ) : !filterType.includes(item.id) ? (
            <>
              {item.id < 10 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${item.id}.png`}
                  loading="lazy"
                />
              ) : item.id < 100 ? (
                <img
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${item.id}.png`}
                  loading="lazy"
                />
              ) : (
                <img
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
