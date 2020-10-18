 import { all } from 'redux-saga/effects'; 
import pokemonsSaga from './pokemonsSaga'; 

/*import abilitySaga from './abilitySaga';
import placeSaga from './placeSaga';
 */// watcher saga
const rootSaga= function* root()  {
    //yield all([fork(pokemonsSaga()),fork(abilitySaga()),fork(placeSaga())]);
    yield all([pokemonsSaga()]);
}
export default rootSaga;