/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { Button } from "@mui/material";
import { PokemonDetailsResponse } from "../../interfaces/PokemonDetails.interface";
import Pokemon from "./Pokemon";

export interface PokemonOverviewProps {
  pokemon: PokemonDetailsResponse;
  viewPokemon(pokemon: PokemonDetailsResponse): void;
}
const PokemonOverview: React.FC<PokemonOverviewProps> = (
  props: PokemonOverviewProps
) => {
  return useMemo(
    () => (
      <div className="pokemon_container" key={props.pokemon.name as string}>
        <Pokemon details={props.pokemon} />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.viewPokemon(props.pokemon)}
        >
          View Details
        </Button>
      </div>
    ),
    [JSON.stringify(props.pokemon)]
  );
};
export default PokemonOverview;
