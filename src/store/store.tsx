import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Pokemon } from "../interfaces/Pokemon.interface";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { User } from "../interfaces/Security.interface";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import thunk from "redux-thunk";

export interface IStore {
  user?: {
    user?: {
      user?: User;
      iat?: number;
      exp?: number;
    };
    validToken?: boolean;
    error?: string | null;
  };
  pokemons: {
    isLoading?: boolean;
    pokemons?: Pokemon[];
    page?: number;
    pokemon?: PokemonDetailsResponse;
    pokemonEvolutions?: PokemonDetailsResponse[];
  };
  pokemonsDetails: {
    isLoading?: boolean;
    pokemonsDetails?: PokemonDetailsResponse[];
    error?: boolean | null | string;
  };
  search: {
    pokemon?: PokemonDetailsResponse;
    error?: Error | null;
    severity?: "error" | "warning" | "success";
    message: null | string;
  };
}

let storageState = JSON.parse(localStorage.getItem("pokedex_app") || "{}");

export const store = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, thunk];
  const store = createStore(
    rootReducer,
    storageState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);

  store.subscribe(() => {
    localStorage.setItem("pokedex_app", JSON.stringify(store.getState()));
  });
  return store;
};

export default store;
