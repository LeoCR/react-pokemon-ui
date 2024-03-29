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
  names:
    localStorage.getItem("favorites") !== null
      ? JSON.parse(localStorage.getItem("favorites")!)
      : [],
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
    case FAVORITES.DELETE:
      return {
        ...state,
        names: state.names.filter(
          (pokemon) =>
            action.pokemon.toLocaleLowerCase() !== pokemon.toLowerCase()
        ),
      };
    default:
      return state;
  }
}
