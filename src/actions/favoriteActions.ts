import { FAVORITES } from "../constants/favoritesConstants";

export const addPokemonToFavorites = (pokemonName: string) => ({
  type: FAVORITES.ADD,
  pokemon: pokemonName,
});
