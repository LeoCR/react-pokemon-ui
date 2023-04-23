/* eslint-disable import/no-anonymous-default-export */
import { Action } from "redux";
import { FAVORITES } from "../constants/favoritesConstants";

interface FavoritesActions extends Action {
  pokemon: string;
}
interface FavoritesReducer {
  names: string[];
}
const initialState: FavoritesReducer = {
  names: [],
};
export default function (
  state = initialState,
  action: FavoritesActions
): FavoritesReducer {
  switch (action.type) {
    case FAVORITES.ADD:
      return {
        ...state,
        names: !state.names.includes(action.pokemon)
          ? state.names.concat(action.pokemon)
          : [...state.names],
      };
    default:
      return state;
  }
}
