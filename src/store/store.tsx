import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

let storageState:any = JSON.parse(localStorage.getItem('pokedex_app') || '{}');;
  
export const store=()=> {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];
    const store = createStore(rootReducer, storageState, composeWithDevTools(applyMiddleware(...middleware)));
    sagaMiddleware.run(rootSaga);
  
    store.subscribe(() => {
      localStorage.setItem('pokedex_app', JSON.stringify(store.getState()))
    })
    return store;
}

export default store;