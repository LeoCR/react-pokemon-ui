import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

export default function store(initialState:any={}) {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
    sagaMiddleware.run(rootSaga);
    return store;
}