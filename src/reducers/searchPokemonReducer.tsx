import { POKEMON } from "../constants/pokemonsTypes";
import { Action } from "redux";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";

interface PokemonsDetailsActions extends Action {
  response: PokemonDetailsResponse;
  error?: Error;
}
interface PokemonsDetailsReducer {
  isLoading: boolean;
  error?: boolean | object | Error;
  pokemon: PokemonDetailsResponse;
}
const initialState: PokemonsDetailsReducer = {
  isLoading: false,
  pokemon: {},
};
export default function (
  state = initialState,
  action: PokemonsDetailsActions
): PokemonsDetailsReducer {
  switch (action.type) {
    case POKEMON.SEARCH:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case POKEMON.SEARCH_SUCCESSFULLY:
      return {
        ...state,
        pokemon: Object.assign(
          state.pokemon,
          action.response as PokemonDetailsResponse
        ),
        isLoading: false,
        error: false,
      };
    case POKEMON.SEARCH_FAIL:
      return {
        ...state,
        pokemon: {},
        error: action.error,
        isLoading: false,
      };
    case POKEMON.SEARCH_CLEAN:
      return {
        ...state,
        pokemon: {},
        error: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
