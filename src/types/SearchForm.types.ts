import { RouteComponentProps } from "react-router-dom";
export type SearchFormParams = {
  pokemonName?: string;
};
export type SearchFormProps = RouteComponentProps<SearchFormParams>;
