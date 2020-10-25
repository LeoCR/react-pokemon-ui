 import { all,fork } from 'redux-saga/effects'; 
import pokemonsSaga from './pokemonsSaga';
import pokemonsDetailsSaga from './pokemonsDetailsSaga';
import {watchUserAuthenticationByUsername,watchUserAuthenticationByEmail} from './watchUserAuthentication';
/*import abilitySaga from './abilitySaga';
import placeSaga from './placeSaga';
 */// watcher saga
const rootSaga= function* root()  {
    //yield all([fork(pokemonsSaga()),fork(abilitySaga()),fork(placeSaga())]);
    
    yield fork(watchUserAuthenticationByUsername);
    yield fork(watchUserAuthenticationByEmail);
    yield all([pokemonsSaga(),pokemonsDetailsSaga()]);
    
}
export default rootSaga;