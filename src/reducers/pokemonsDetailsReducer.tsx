import { POKEMON_DETAILS } from "../constants/pokemonsTypes";
const initialState = {
  isLoading: false,
  pokemonsDetails: [],
};
export default function (state = initialState, action: any) {
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
        pokemonsDetails: state.pokemonsDetails.concat(action.details),
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
