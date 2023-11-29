import "./styles/type-colors.scss";
import "./styles/type-filter-style.scss";
import { useEffect, useState } from "react";

interface TypeFilterProps {
  sendPokemonTypeToFetchComponent: (types: string[]) => void;
}

const TypeFilter = ({ sendPokemonTypeToFetchComponent }: TypeFilterProps) => {
  const selectedTypeArray: Array<Element> = [];
  let wantedTypeArray: Array<string> = [];
  const [PokemonTypeState, setPokemontypestate] = useState<string[]>([]);

  //Show type box
  const ActivateFilter = () => {
    const filterBox = document.querySelector(".type-filter");
    if (filterBox !== null) {
      filterBox.classList.toggle("visible");
    }
  };

  //Assign class to wanted type
  const TypeSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.classList.toggle("selected");
    typeReturn();
  };

  const typeReturn = () => {
    const selectedType = document.querySelectorAll(".type");
    const selectedTypeArray: Element[] = [];
    for (let chosen of selectedType) {
      if (chosen.classList.contains("selected")) {
        selectedTypeArray.push(chosen);
      } else continue;
    }

    wantedTypeArray = selectedTypeArray.map((x) => {
      if (!x.classList.contains("selected")) {
        selectedTypeArray.splice(selectedTypeArray.indexOf(x), 1);
      }
      return x.textContent || "";
    });
    setPokemontypestate(wantedTypeArray);
  };

  const ClearFilter = () => {
    const paraSelect = document.querySelectorAll(".type");
    for (let para of paraSelect) {
      if (para.classList.contains("selected")) {
        para.classList.toggle("selected");
      } else continue;
    }
    selectedTypeArray.length = 0;
    wantedTypeArray.length = 0;
    setPokemontypestate(wantedTypeArray);
  };
  useEffect(() => {
    sendPokemonTypeToFetchComponent(PokemonTypeState);
  }, [wantedTypeArray]);

  return (
    <>
      <button onClick={ActivateFilter} className="button-filter">
        Type Filter
      </button>
      <div className="type-filter">
        <button className="type normal" onClick={TypeSelect}>
          Normal
        </button>
        <button className="type fire" onClick={TypeSelect}>
          Fire
        </button>
        <button className="type water" onClick={TypeSelect}>
          Water
        </button>
        <button className="type grass" onClick={TypeSelect}>
          Grass
        </button>
        <button className="type electric" onClick={TypeSelect}>
          Electric
        </button>
        <button className="type ice" onClick={TypeSelect}>
          Ice
        </button>
        <button className="type fighting" onClick={TypeSelect}>
          Fighting
        </button>
        <button className="type poison" onClick={TypeSelect}>
          Poison
        </button>
        <button className="type ground" onClick={TypeSelect}>
          Ground
        </button>
        <button className="type flying" onClick={TypeSelect}>
          Flying
        </button>
        <button className="type psychic" onClick={TypeSelect}>
          Psychic
        </button>
        <button className="type bug" onClick={TypeSelect}>
          Bug
        </button>
        <button className="type rock" onClick={TypeSelect}>
          Rock
        </button>
        <button className="type ghost" onClick={TypeSelect}>
          Ghost
        </button>
        <button className="type dark" onClick={TypeSelect}>
          Dark
        </button>
        <button className="type dragon" onClick={TypeSelect}>
          Dragon
        </button>
        <button className="type steel" onClick={TypeSelect}>
          Steel
        </button>
        <button className="type fairy" onClick={TypeSelect}>
          Fairy
        </button>
        <button onClick={ClearFilter}>Clear selected</button>
      </div>
    </>
  );
};
export default TypeFilter;
