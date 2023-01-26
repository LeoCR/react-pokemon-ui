import { takeLatest, call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { fetchPokemonDetails } from "../api/apiPokemon";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { POKEMON } from "../constants/pokemonsTypes";
import { Action } from "redux";
import { setPokemonDetails } from "../actions/pokemonActions";

interface PokemonSearchPayload {
  name: string;
}
interface PokemonSearchAction extends Action, PokemonSearchPayload {
  type: typeof POKEMON.SEARCH;
}
export function* searchPokemonByName(payload: PokemonSearchPayload) {
  try {
    const response: AxiosResponse<PokemonDetailsResponse> = yield call(
      fetchPokemonDetails,
      payload.name
    );
    yield put({ type: POKEMON.SEARCH_SUCCESSFULLY, response });
  } catch (error) {
    yield put({ type: POKEMON.SEARCH_FAIL, error });
  }
}

export default function* whatchPokemonSearch() {
  yield takeLatest<PokemonSearchAction>(POKEMON.SEARCH, searchPokemonByName);
}
