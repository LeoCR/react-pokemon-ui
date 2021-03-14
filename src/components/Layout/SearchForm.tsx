import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Field from "./Field";
import ClearIcon from "@material-ui/icons/Clear";

const SearchForm = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const searchPokemon = (pkmnName: string) => {
    console.log("pkmnName", pkmnName);
  };
  const onChagePokemonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPokemonName = e.target.value;
    if (newPokemonName) {
      setPokemonName(newPokemonName);
    }
  };
  const clearInput = () => {
    setPokemonName("");
  };
  const submitSearchForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting Form", pokemonName);
  };

  return (
    <form autoComplete="on" id="form_search" onSubmit={submitSearchForm}>
      <Button
        variant="contained"
        color="primary"
        style={{ minHeight: "55px", float: "left" }}
        onClick={() => searchPokemon(pokemonName)}
      >
        Search
      </Button>
      <Field
        id="outlined-basic"
        label="Search Pokemon"
        type="search"
        variant="outlined"
        value={pokemonName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChagePokemonName(e)
        }
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
