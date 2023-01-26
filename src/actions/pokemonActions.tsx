import { POKEMON, POKEMONS, POKEMON_DETAILS } from "../constants/pokemonsTypes";
import { PokemonsResponse } from "../interfaces/Pokemon.interface";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";

export const clearPokemons = () => ({
  type: POKEMONS.CLEAR_POKEMONS,
});

export const loadPokemons = (page: number) => ({
  type: POKEMONS.LOAD,
  page,
});

export const setPokemons = (pokemons: PokemonsResponse) => {
  return {
    type: POKEMONS.LOAD_SUCCESS,
    pokemons: pokemons.results,
  };
};

export const setPokemon = (pokemon: PokemonDetailsResponse) => ({
  type: POKEMONS.SET_POKEMON,
  pokemon,
});

export const setPokemonEvolutions = (
  pokemonEvolutions: PokemonDetailsResponse[]
) => ({
  type: POKEMONS.SET_POKEMON_EVOLUTIONS,
  pokemonEvolutions,
});

export const setPokemonsError = (error: Error | string) => ({
  type: POKEMONS.LOAD_FAIL,
  error,
});

export const loadPokemonDetails = (name: string) => ({
  type: POKEMON_DETAILS.LOAD,
  name,
});

export const setPokemonDetails = (
  name: string,
  details: PokemonDetailsResponse
) => ({
  type: POKEMON_DETAILS.LOAD_SUCCESS,
  name,
  details,
});

export const setPokemonDetailsError = (name: string) => ({
  type: POKEMON_DETAILS.LOAD_FAIL,
  name,
});

export const clearPokemonDetails = () => ({
  type: POKEMON_DETAILS.CLEAR_POKEMON_DETAILS,
});

export const searchPokemon = (pokemonName: string) => ({
  type: POKEMON.SEARCH,
  name: pokemonName,
});

export const clearSearchPokemonResults = () => ({
  type: POKEMON.SEARCH_CLEAN,
});
