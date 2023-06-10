const PokemonCardList = ({ filteredItems }: any) => {
  return (
    <ul className="pkmn-list">
      {filteredItems.map((item: any) => (
        <li key={item.id}>
          <p>{item.name}</p>
          <p>#{item.id}</p>
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
        </li>
      ))}
    </ul>
  );
};
export default PokemonCardList;
