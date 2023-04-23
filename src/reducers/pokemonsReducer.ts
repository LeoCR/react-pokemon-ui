/* eslint-disable import/no-anonymous-default-export */
import { Action } from "redux";
import { POKEMONS } from "../constants/pokemonsConstants";
import { Pokemon, PokemonInfo } from "../interfaces/Pokemon.interface";
import { PokemonEvolutionChain } from "../interfaces/PokemonEvolutions.interface";
export interface PokemonsReducer {
  isLoading: boolean;
  pokemons: Pokemon[];
  page: number;
  pokemon: PokemonInfo[];
  pokemonEvolutions: PokemonEvolutionChain[];
  error: null | object;
}
interface PokemonActions extends Action {
  pokemon: PokemonInfo[];
  pokemonEvolutions: PokemonEvolutionChain[];
  page: number;
  pokemons: Pokemon[];
  error: null | object;
}
const initialState: PokemonsReducer = {
  isLoading: false,
  pokemons: [],
  page: 0,
  pokemon: [],
  pokemonEvolutions: [],
  error: null,
};
export default function (
  state = initialState,
  action: PokemonActions
): PokemonsReducer {
  switch (action.type) {
    case POKEMONS.SET_POKEMON:
      return {
        ...state,
        pokemon: action.pokemon,
      };
    case POKEMONS.SET_POKEMON_EVOLUTIONS:
      return {
        ...state,
        pokemonEvolutions: action.pokemonEvolutions,
      };
    case POKEMONS.LOAD:
      return {
        ...state,
        page: action.page,
        isLoading: true,
      };
    case POKEMONS.CLEAR_POKEMONS:
      return {
        ...state,
        isLoading: false,
        pokemons: [],
      };
    case POKEMONS.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemons: action.pokemons,
      };
    case POKEMONS.LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        pokemons: [],
        error: action.error,
      };
    default:
      return state;
  }
}
