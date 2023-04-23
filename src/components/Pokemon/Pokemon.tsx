import React from "react";
import { PokemonProps } from "../../types/Pokemon.types";
import Pokeball from "../../assets/img/pokeball.png";
import "./Pokemon.css";

const Pokemon: React.FC<PokemonProps> = (props) => {
  if (!props.details) {
    return (
      <React.Fragment>
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status"></div>
        <div className="spinner-grow text-primary" role="status"></div>
      </React.Fragment>
    );
  }
  const frontDefaultImage =
    props.details &&
    props.details.sprites &&
    props.details.sprites.front_default
      ? props.details.sprites.front_default
      : Pokeball;
  const PokemonName =
    props.details && props.details.name ? props.details.name : "";
  return (
    <React.Fragment>
      <h4 className="pokemon_name">{PokemonName}</h4>
      <img
        src={frontDefaultImage}
        alt={PokemonName}
        className={
          frontDefaultImage === Pokeball ? "pokeball-img" : "pokemon-image"
        }
      />
    </React.Fragment>
  );
};
export default Pokemon;
