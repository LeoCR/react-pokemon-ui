import { combineReducers } from "redux";
import userReducer from "./userReducer";
import pokemonsReducer from "./pokemonsReducer";
import placeReducer from "./placeReducer";
import abilityReducer from "./abilityReducer";
import pokemonsDetailsReducer from "./pokemonsDetailsReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    pokemons: pokemonsReducer,
    pokemonsDetails:pokemonsDetailsReducer,
    place: placeReducer,
    ability: abilityReducer,
});
export default rootReducer;