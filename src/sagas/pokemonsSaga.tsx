import { put, call, takeEvery,select} from 'redux-saga/effects';
import {POKEMONS} from "../constants/pokemonsTypes";
import {fetchPokemons} from "../api/apiPokemon";
import {setPokemons,setPokemonsError} from "../actions/pokemonActions";

export const getPage = (state:any) => state.pokemons.page;

export function* handlePokemonsLoad(){
    try {
        const page = yield select(getPage);
        const pokemonsGenerated = yield call(fetchPokemons,page);
        yield put(setPokemons(pokemonsGenerated));
    } catch (error) {
        yield put(setPokemonsError(error.toString()))
    }
}

export default function* pokemonsSaga(){
    yield takeEvery(POKEMONS.LOAD, handlePokemonsLoad);
}