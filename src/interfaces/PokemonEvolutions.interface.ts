import { Pokemon } from './Pokemon.interface';
import { Item } from './PokemonDetails.interface';
export interface PokemonEvolutionsChainURLResponse{
    data:PokemonSpecies
}
export interface PokedexNumbers{
  entry_number?:number
  pokedex?:Pokemon
}
export interface PokemonNames{
  name?:string
  language?:Pokemon
}
export interface FlavorTextEntries{
  flavor_text?:string
  language?:Pokemon
  version?:Pokemon
}
export interface FormDescriptions{
  description?:string
  language?:Pokemon
}
export interface Genera{
  genus?:string
  language?:Pokemon
}
export interface Varieties{
  is_default?:boolean
  pokemon?:Pokemon
}
export interface PokemonSpecies{
  id?:number
  name?:string
  order?:number
  gender_rate?:number
  capture_rate?:number
  base_happiness?:number
  is_baby?:number
  is_legendary?:boolean
  is_mythical?:boolean
  hatch_counter?:number
  has_gender_differences?:boolean
  forms_switchable?:boolean
  growth_rate?:Pokemon
  pokedex_numbers?:PokedexNumbers[]
  egg_groups?:Pokemon[]
  color?:Pokemon
  shape?:Pokemon
  evolves_from_species?:Pokemon
  evolution_chain:{
    url?:string
  }
  habitat?:string|null
  generation?:Pokemon
  names?:PokemonNames[]
  flavor_text_entries?:FlavorTextEntries[]
  form_descriptions?:FormDescriptions[]
  genera?:Genera[]
  varieties?:Varieties[]
}
export interface EvolutionDetails{
  gender?: null|string,
  held_item?: null|Item,
  item?: null,
  known_move?: null|string|boolean,
  known_move_type?: null|string,
  location?: null|string,
  min_affection?: null|string|number,
  min_beauty?: null|string|number,
  min_happiness?: null|string|number,
  min_level?: number,
  needs_overworld_rain?: boolean,
  party_species?: null|string|number,
  party_type?: null |string|number|boolean,
  relative_physical_stats?: null|string|number|boolean,
  time_of_day?: null|string,
  trade_species?: null|string|number,
  trigger?: Pokemon,
  turn_upside_down?: boolean
}
export interface EvolvesTo{
  is_baby:boolean
  species:Pokemon
  evolution_details:null|EvolutionDetails[]
  evolves_to?:EvolvesTo[]
}
export interface Chain{
  is_baby?:boolean
  species:Pokemon
  evolution_details:null|EvolutionDetails[]
  evolves_to:EvolvesTo[]
}
export interface PokemonEvolutionChain{
  id?:number
  baby_trigger_item?:null|string|number
  chain?:Chain
}
