import { put, call, takeEvery, select } from "redux-saga/effects";
import { POKEMONS } from "../constants/pokemonsConstants";
import { fetchPokemons } from "../api/apiPokemon";
import { setPokemons, setPokemonsError } from "../actions/pokemonActions";
import { PokemonsResponse } from "../interfaces/Pokemon.interface";
import { IStore } from "../store/store";

export const getPage = (state: IStore) => state.pokemons.page;

export function* handlePokemonsLoad() {
  try {
    const page: number = yield select(getPage);
    const pokemonsGenerated: PokemonsResponse = yield call(fetchPokemons, page);
    yield put(setPokemons(pokemonsGenerated));
  } catch (error) {
    yield put(setPokemonsError(JSON.stringify(error)));
  }
}

export default function* pokemonsSaga() {
  yield takeEvery(POKEMONS.LOAD, handlePokemonsLoad);
}
