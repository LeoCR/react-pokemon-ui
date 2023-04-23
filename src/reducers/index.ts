import { combineReducers } from "redux";
import userReducer from "./userReducer";
import pokemonsReducer from "./pokemonsReducer";
import pokemonsDetailsReducer from "./pokemonsDetailsReducer";
import searchPokemonReducer from "./searchPokemonReducer";
import favoritesReducer from "./favoritesReducer";
export const rootReducer = combineReducers({
  user: userReducer,
  pokemons: pokemonsReducer,
  pokemonsDetails: pokemonsDetailsReducer,
  search: searchPokemonReducer,
  favorites: favoritesReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
