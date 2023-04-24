/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PokemonFavoritesContainerProps } from "../types/PokemonFavoritesContainerProps.types";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/store";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { fetchPokemonDetails } from "../api/apiPokemon";
import PokemonOverview from "../components/Pokemon/PokemonOverview";
import { setPokemon } from "../actions/pokemonActions";

export const PokemonFavoritesContainer: React.FC<
  PokemonFavoritesContainerProps
> = ({ history }) => {
  const [pokemonsDetails, setPokemonsDetails] = useState<
    PokemonDetailsResponse[]
  >([]);
  const favoritesProps = useSelector((state: IStore) => state.favorites.names);
  const dispatch = useDispatch();
  const onClickBack = () => {
    history.go(-1);
  };
  useEffect(() => {
    if (
      favoritesProps.length > 0 &&
      JSON.parse(localStorage.getItem("favorites")!)
    ) {
      const finalResult: PokemonDetailsResponse[] = [];
      const fetchData = async () => {
        for (const pokemonName of favoritesProps) {
          await fetchPokemonDetails(pokemonName, (res) => {
            finalResult.push(res);
          });
        }
        setPokemonsDetails(finalResult as PokemonDetailsResponse[]);
      };
      fetchData();
    }
  }, [
    favoritesProps,
    favoritesProps.length,
    JSON.stringify(localStorage.getItem("favorites")),
  ]);

  console.log("favoritesProps", favoritesProps);
  console.log("pokemonsDetails", pokemonsDetails);
  const viewPokemon = (pokemon: PokemonDetailsResponse) => {
    dispatch(setPokemon(pokemon as PokemonDetailsResponse));
    if (pokemon.name) {
      history.push("/pokemon/" + pokemon.name);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={"btnBack"}
        onClick={() => onClickBack()}
      >
        Back
      </Button>
      {pokemonsDetails.length > 0 ? (
        pokemonsDetails.map(
          (pokemon: PokemonDetailsResponse, index: number) => (
            <PokemonOverview
              key={pokemon.name}
              pokemon={pokemonsDetails[index]}
              viewPokemon={() =>
                viewPokemon(pokemonsDetails[index] as PokemonDetailsResponse)
              }
              hasDelete={true}
            />
          )
        )
      ) : (
        <>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading Favorites...</span>
          </div>
          <div className="spinner-grow text-success" role="status"></div>
          <div className="spinner-grow text-primary" role="status"></div>
        </>
      )}
    </div>
  );
};
