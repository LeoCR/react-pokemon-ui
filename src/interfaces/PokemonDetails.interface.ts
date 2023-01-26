import {
  Pokemon,
  GameIndex,
  Stat,
  Sprites,
  Move,
  PokemonType,
} from "./Pokemon.interface";

export interface IPokemonAbilities {
  value: number;
  abilities?: ability[];
}
export interface VersionDetail {
  rarity?: number;
  version?: Pokemon;
}
export interface Item {
  item?: Pokemon;
  version_details?: VersionDetail[];
}
export interface ability {
  ability: Pokemon;
  is_hidden: boolean;
  slot: number;
}
export interface PokemonDetailsResponse {
  id?: number;
  name?: string;
  base_experience?: number;
  height?: number;
  is_default?: boolean;
  order?: number;
  weight?: number;
  abilities?: ability[];
  forms?: Pokemon[];
  game_indices?: GameIndex[];
  held_items?: Item[];
  location_area_encounters?: string;
  moves?: Move[];
  species?: Pokemon;
  sprites?: Sprites;
  stats?: Stat[];
  types?: PokemonType;
}
