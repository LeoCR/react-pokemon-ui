import { all, fork } from "redux-saga/effects";
import pokemonsSaga from "./pokemonsSaga";
import pokemonsDetailsSaga from "./pokemonsDetailsSaga";
import {
  watchUserAuthenticationByUsername,
  watchUserAuthenticationByEmail,
} from "./watchUserAuthentication";
import whatchPokemonSearch from "./searchPokemonSaga";

const rootSaga = function* root() {
  yield fork(watchUserAuthenticationByUsername);
  yield fork(watchUserAuthenticationByEmail);
  yield fork(whatchPokemonSearch);
  yield all([pokemonsSaga(), pokemonsDetailsSaga()]);
};
export default rootSaga;
