import React from "react";
import { PokemonDetailsResponse } from "../../interfaces/PokemonDetails.interface";
import Pokemon from "./Pokemon";
import { Button } from "@mui/material";

export interface PokemonOverviewProps {
  pokemon: PokemonDetailsResponse;
  currentTime: Date | number;
  viewPokemon(pokemon: PokemonDetailsResponse): void;
}
const PokemonOverview: React.FC<PokemonOverviewProps> = (
  props: PokemonOverviewProps
) => {
  return (
    <div
      className="pokemon_container"
      key={
        (props.pokemon.name as string) +
        props.pokemon.id +
        "_" +
        props.currentTime +
        Math.random()
      }
    >
      <Pokemon details={props.pokemon} />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.viewPokemon(props.pokemon)}
      >
        View Details
      </Button>
    </div>
  );
};
export default PokemonOverview;
