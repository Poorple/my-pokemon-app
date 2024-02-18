export interface Pokemon {
    id: number;
    name: string;
    type: string[];
    hp: number;
    attack: number;
    defense: number;
    spattack: number;
    spdefense: number;
    speed: number;
  }

  export interface combinedInterface {
    pokemon: Pokemon[];
    filteredPokemon: Pokemon[];
    filterType: { typeArr: string[] };
    finalFilterList: Pokemon[];
  }

  export interface PokeInfo {
    id: number;
    name: {
      english: string;
      japanese: string;
      chinese: string;
      french: string;
    };
    type: string[];
    base: {
      HP: number;
      Attack: number;
      Defense: number;
      "Sp. Attack": number;
      "Sp. Defense": number;
      Speed: number;
    };
  }

  export interface PokeStats{
    hp: number;
    attack: number;
    defense: number;
    spattack: number;
    spdefense: number;
    speed: number;
    total:number;
  }

  export type PokemonType = string;