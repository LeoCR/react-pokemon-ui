import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Field from "./Field";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPokemon,
  clearSearchPokemonResults,
} from "../../actions/pokemonActions";
import { SearchFormProps } from "../../types/SearchForm.types";
import { IStore } from "../../store/store";

const SearchForm: React.FC<SearchFormProps> = ({ match, history }) => {
  const { pokemon } = useSelector((state: IStore) => state.search);
  const [pokemonName, setPokemonName] = useState<string>("");
  const dispatch = useDispatch();
  const findPokemon = (pkmnName: string) => {
    console.log("pkmnName", pkmnName);
    history.push({
      pathname: "/search",
      search: "?pokemon=" + pkmnName,
    });
    dispatch(searchPokemon(pkmnName.toLowerCase()));
  };
  const onChagePokemonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPokemonName = e.target.value;
    if (newPokemonName) {
      setPokemonName(newPokemonName);
    }
  };
  const clearInput = () => {
    setPokemonName("");
    if (pokemon && "name" in pokemon) {
      history.go(-2);
    }
    dispatch(clearSearchPokemonResults());
  };
  const submitSearchForm = (event: React.FormEvent) => {
    event.preventDefault();
    findPokemon(pokemonName);
  };

  return (
    <form autoComplete="on" id="form_search" onSubmit={submitSearchForm}>
      <Button
        variant="contained"
        color="primary"
        style={{ minHeight: "55px", float: "left" }}
        onClick={() => findPokemon(pokemonName)}
      >
        Search
      </Button>
      <Field
        id="standard-basic"
        label="Search Pokemon"
        type="search"
        variant="outlined"
        value={pokemonName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChagePokemonName(e)
        }
        InputProps={{
          startAdornment: <React.Fragment></React.Fragment>,
          endAdornment: <React.Fragment></React.Fragment>,
          type: "text",
        }}
        style={{ maxWidth: "443px", float: "left" }}
      />
      {pokemonName !== "" ? (
        <Button
          variant="contained"
          color="secondary"
          style={{ minHeight: "55px", float: "right" }}
          onClick={() => clearInput()}
        >
          <ClearIcon />
        </Button>
      ) : (
        ""
      )}
    </form>
  );
};
export default SearchForm;
