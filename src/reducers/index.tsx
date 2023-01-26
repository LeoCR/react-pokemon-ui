import { combineReducers } from "redux";
import userReducer from "./userReducer";
import pokemonsReducer from "./pokemonsReducer";
import pokemonsDetailsReducer from "./pokemonsDetailsReducer";
import searchPokemonReducer from "./searchPokemonReducer";
export const rootReducer = combineReducers({
  user: userReducer,
  pokemons: pokemonsReducer,
  pokemonsDetails: pokemonsDetailsReducer,
  search: searchPokemonReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
