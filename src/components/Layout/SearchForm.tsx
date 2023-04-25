import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import Field from "./Field";
import {
  searchPokemon,
  clearSearchPokemonResults,
} from "../../actions/pokemonActions";

const SearchForm: React.FC = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const findPokemon = (pkmnName: string) => {
    console.log("pkmnName", pkmnName);
    navigate({
      pathname: "/react-pokemon-ui/search",
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
  const clearInput = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(clearSearchPokemonResults());
    setPokemonName("");
    navigate(-2);
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
        type="search"
        variant="standard"
        value={pokemonName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChagePokemonName(e)
        }
        InputProps={{
          startAdornment: <React.Fragment></React.Fragment>,
          endAdornment: <React.Fragment></React.Fragment>,
          type: "text",
        }}
        className="search_field"
      />
      {pokemonName !== "" ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={(e: React.MouseEvent<HTMLElement>) => clearInput(e)}
          className="clear_btn"
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
