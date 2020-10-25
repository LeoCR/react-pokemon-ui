import { put, call, take,fork} from 'redux-saga/effects';
import {POKEMONS} from "../constants/pokemonsTypes";
import {fetchPokemonDeatils} from "../api/apiPokemon";
import {setPokemonDetailsError,loadPokemonDetails,setPokemonDetails} from "../actions/pokemonActions";

export function* handlePokemonDetailsRequest(name:string) { 
    for (let i = 0; i < 10; i++) {
        try {
            yield put(loadPokemonDetails(name));
            const res = yield call(fetchPokemonDeatils, name); 
            yield put(setPokemonDetails(name, res));
            // pokemon was loaded so we exit the generator
            return true;
        } catch (e) {
            // we just need to retry and dispactch an error
            // if we tried more than 3 times
        }
    }
    yield put(setPokemonDetailsError(name));
}
export default function* pokemonsDetails(){
    while (true) {
        // we get the action here
        const { pokemons } = yield take(
            /**
             * Creates an Effect description that instructs
             * the middleware to wait for a specified action
             * on the Store.
             */
            POKEMONS.LOAD_SUCCESS,
        ); 
        for (let i = 0; i < pokemons.length; i++) {
            yield fork(
                /**
                 * Creates an Effect description that instructs
                 * the middleware to perform a
                 * non-blocking call on fn
                 **/
                handlePokemonDetailsRequest,
                pokemons[i].name,
            );
        }
    }
}