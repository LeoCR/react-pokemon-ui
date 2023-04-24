import { FAVORITES } from "../constants/favoritesConstants";

export const addPokemonToFavorites = (pokemonName: string) => ({
  type: FAVORITES.ADD,
  pokemon: pokemonName,
});

export const deletePokemon = (pokemonName: string) => ({
  type: FAVORITES.DELETE,
  pokemon: pokemonName,
});
