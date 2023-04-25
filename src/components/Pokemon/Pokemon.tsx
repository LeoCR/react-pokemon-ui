import React from "react";
import { PokemonProps } from "../../types/Pokemon.types";
import Pokeball from "../../assets/img/pokeball.png";

const Pokemon: React.FC<PokemonProps> = (props) => {
  const frontDefaultImage =
    props.details &&
    props.details.sprites &&
    props.details.sprites.front_default
      ? props.details.sprites.front_default
      : Pokeball;
  const PokemonName =
    props.details && props.details.name ? props.details.name : "";
  return (
    <div className="pokemon_overview">
      <h4 className="pokemon_name_title">{PokemonName}</h4>
      <img
        src={frontDefaultImage}
        alt={PokemonName}
        className={
          frontDefaultImage === Pokeball ? "pokeball-img" : "pokemon_image"
        }
      />
    </div>
  );
};
export default Pokemon;
