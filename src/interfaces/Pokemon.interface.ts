import { Item } from "./PokemonDetails.interface";

export interface Pokemon {
  name?: string;
  url?: string;
}
export interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string;
  results: Pokemon[] | [];
}

export interface PokemonAbility {
  abilities?: Pokemon[];
}
export interface GameIndex {
  game_index?: number;
  version?: Pokemon[];
}
export interface VersionGroupDetails {
  level_learned_at?: number;
  move_learn_method?: Pokemon;
  version_group?: Pokemon;
}
export interface Move {
  move?: Pokemon[];
  version_group_details?: VersionGroupDetails[];
}
interface OtherSprite {
  dream_world?: Sprite;
  "oficial-artwork"?: Sprite;
}
interface GenerationI extends Sprite {
  "red-blue"?: Animated;
  yellow?: Animated;
}
interface GenerationII extends Sprite {
  crystal?: Animated;
  gold?: Animated;
  silver?: Animated;
}
interface GenerationIII extends Sprite {
  emerald?: Animated;
  "firered-leafgreen"?: Animated;
  "ruby-sapphire"?: Animated;
}
interface GenerationIV extends Sprite {
  "diamond-pearl"?: Animated;
  "heartgold-soulsilver"?: Animated;
  platinum?: Animated;
}
interface Animated {
  animated?: Sprite;
}
interface GenerationV extends Sprite {
  "black-white"?: Animated;
}
interface GenerationVI extends Sprite {
  "omegaruby-alphasapphire"?: Animated;
  "x-y"?: Animated;
}
interface GenerationVII extends Sprite {
  icons?: Animated;
  "ultra-sun-ultra-moon"?: Animated;
}
interface GenerationVIII extends Sprite {
  icons?: Animated;
}
export interface VersionSprite {
  "generation-i"?: GenerationI;
  "generation-ii"?: GenerationII;
  "generation-iii"?: GenerationIII;
  "generation-iv"?: GenerationIV;
  "generation-v"?: GenerationV;
  "generation-vi"?: GenerationVI;
  "generation-vii"?: GenerationVII;
  "generation-viii"?: GenerationVIII;
}
export interface Sprite {
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
  back_gray?: string | null;
  front_gray?: string | null;
}
export interface Sprites extends Sprite {
  other?: OtherSprite;
  versions?: VersionSprite;
}
export interface IType {
  slot?: number | null;
  type?: Pokemon;
}
export interface PokemonType {
  [index: number]: IType[];
  weight?: number | null;
}
export interface Stat {
  base_stat?: number | null;
  effort?: number | null;
  stat?: Pokemon;
}
export interface PokemonInfo {
  abilities?: PokemonAbility[] | null;
  base_experience?: number;
  forms?: Pokemon[];
  game_indices?: GameIndex[];
  height?: number;
  held_items?: Item[];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: Move[];
  name?: string;
  order?: number;
  species?: Pokemon;
  sprites?: Sprites;
  stats?: Stat[];
  types?: PokemonType;
  weight?: number;
}
