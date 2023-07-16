import "./type-colors.scss";
import "./type-filter-style.scss";
import { useEffect } from "react";

const selectedTypeArray: Array<Element> = [];
let wantedTypeArray: Array<string> = [];

const ActivateFilter = () => {
  const filterBox = document.querySelector(".type-filter");
  if (filterBox !== null) {
    filterBox.classList.toggle("visible");
  }
};
const TypeSelect = (event: React.MouseEvent<HTMLParagraphElement>) => {
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
  console.log(selectedTypeArray);
};

const ClearFilter = () => {
  const paraSelect = document.querySelectorAll(".type");
  for (let para of paraSelect) {
    if (para.classList.contains("selected")) {
      para.classList.toggle("selected");
    } else continue;
  }
  selectedTypeArray.length = 0;
};

const TypeFilter = ({ setWantedTypes }: any) => {
  const wantedTypes: Element[] = selectedTypeArray;
  useEffect(() => {
    setWantedTypes(wantedTypes);
  }, []);
  return (
    <>
      <button onClick={ActivateFilter} className="button-filter">
        Type Filter
      </button>
      <div className="type-filter">
        <p className="type normal" onClick={TypeSelect}>
          Normal
        </p>
        <p className="type fire" onClick={TypeSelect}>
          Fire
        </p>
        <p className="type water" onClick={TypeSelect}>
          Water
        </p>
        <p className="type grass" onClick={TypeSelect}>
          Grass
        </p>
        <p className="type electric" onClick={TypeSelect}>
          Electric
        </p>
        <p className="type ice" onClick={TypeSelect}>
          Ice
        </p>
        <p className="type fighting" onClick={TypeSelect}>
          Fighting
        </p>
        <p className="type poison" onClick={TypeSelect}>
          Poison
        </p>
        <p className="type ground" onClick={TypeSelect}>
          Ground
        </p>
        <p className="type flying" onClick={TypeSelect}>
          Flying
        </p>
        <p className="type psychic" onClick={TypeSelect}>
          Psychic
        </p>
        <p className="type bug" onClick={TypeSelect}>
          Bug
        </p>
        <p className="type rock" onClick={TypeSelect}>
          Rock
        </p>
        <p className="type ghost" onClick={TypeSelect}>
          Ghost
        </p>
        <p className="type dark" onClick={TypeSelect}>
          Dark
        </p>
        <p className="type dragon" onClick={TypeSelect}>
          Dragon
        </p>
        <p className="type steel" onClick={TypeSelect}>
          Steel
        </p>
        <p className="type fairy" onClick={TypeSelect}>
          Fairy
        </p>
        <button onClick={ClearFilter}>Clear selected</button>
      </div>
    </>
  );
};
export default TypeFilter;
