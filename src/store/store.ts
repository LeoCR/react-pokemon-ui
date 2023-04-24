import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { Pokemon } from "../interfaces/Pokemon.interface";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { User } from "../interfaces/Security.interface";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

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
  favorites: {
    names: string[];
  };
}

let storageState = {};

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
    const state = store.getState();
    if (state.favorites.names.length > 0) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...state.favorites.names])
      );
    } else if (state.favorites.names.length === 0) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  });
  return store;
};

export default store;
