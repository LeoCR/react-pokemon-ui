 import { all,fork } from 'redux-saga/effects'; 
import pokemonsSaga from './pokemonsSaga';
import pokemonsDetailsSaga from './pokemonsDetailsSaga';
import {watchUserAuthenticationByUsername,watchUserAuthenticationByEmail} from './watchUserAuthentication';

const rootSaga= function* root()  {
    yield fork(watchUserAuthenticationByUsername);
    yield fork(watchUserAuthenticationByEmail);
    yield all([pokemonsSaga(),pokemonsDetailsSaga()]);
}
export default rootSaga;
