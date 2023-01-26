/* eslint-disable import/no-anonymous-default-export */
import { POKEMON } from "../constants/pokemonsTypes";
import { Action } from "redux";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";

interface PokemonsDetailsActions extends Action {
  response: PokemonDetailsResponse;
  error?: Error;
}
interface PokemonsDetailsReducer {
  isLoading: boolean;
  error?: object | Error | string | null;
  pokemon: PokemonDetailsResponse;
  severity?: "error" | "warning" | "success";
  message: null | string;
}
const initialState: PokemonsDetailsReducer = {
  isLoading: false,
  pokemon: {},
  message: null,
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
        error: null,
        message: null,
        severity: "warning",
      };
    case POKEMON.SEARCH_SUCCESSFULLY:
      return {
        ...state,
        pokemon: Object.assign(
          state.pokemon,
          action.response as PokemonDetailsResponse
        ),
        isLoading: false,
        error: null,
        severity: "success",
        message: "The Pokemon was found successfully",
      };
    case POKEMON.SEARCH_FAIL:
      return {
        ...state,
        pokemon: {},
        error: action.error?.message,
        isLoading: false,
        severity: "error",
        message: "The Pokemon that you are looking doesn't exist",
      };
    case POKEMON.SEARCH_CLEAN:
      return {
        ...state,
        pokemon: {},
        error: null,
        isLoading: false,
        message: null,
        severity: "warning",
      };
    default:
      return state;
  }
}
