import { POKEMONS } from "../constants/pokemonsTypes";
const initialState = {
  isLoading: false,
  pokemons: [],
  page: 0,
  pokemon: [],
  pokemonEvolutions: [],
};
export default function (state = initialState, action: any) {
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
