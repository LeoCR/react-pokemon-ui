import { POKEMON_DETAILS } from "../constants/pokemonsTypes";
import {Action} from "redux"
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";

interface PokemonsDetailsActions extends Action{
  details:PokemonDetailsResponse
}
interface PokemonsDetailsReducer{
  isLoading:boolean
  error?:boolean|object|null
  pokemonsDetails:Array<PokemonDetailsResponse>
}
const initialState:PokemonsDetailsReducer = {
  isLoading: false,
  pokemonsDetails: [],
};
export default function (state = initialState, action: PokemonsDetailsActions):PokemonsDetailsReducer {
  switch (action.type) {
    case POKEMON_DETAILS.LOAD:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case POKEMON_DETAILS.LOAD_SUCCESS: 
      return {
        ...state,
        pokemonsDetails: state.pokemonsDetails.concat(action.details as PokemonDetailsResponse),
        isLoading: false,
        error: false,
      };
    case POKEMON_DETAILS.CLEAR_POKEMON_DETAILS:
      return {
        ...state,
        pokemonsDetails: [],
        isLoading: false,
      };
    default:
      return state;
  }
}
