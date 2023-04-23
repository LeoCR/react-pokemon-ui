import React from "react";
import { Button } from "@mui/material";
import { PokemonDetailsResponse } from "../../interfaces/PokemonDetails.interface";
import Pokemon from "./Pokemon";

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
