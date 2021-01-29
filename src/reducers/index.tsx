import { combineReducers } from "redux";
import userReducer from "./userReducer";
import pokemonsReducer from "./pokemonsReducer";
import pokemonsDetailsReducer from "./pokemonsDetailsReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    pokemons: pokemonsReducer,
    pokemonsDetails:pokemonsDetailsReducer, 
});
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;