import React, { useState, useEffect } from "react";
import { PokemonDetailsResponse } from "../../interfaces/PokemonDetails.interface";
import TabPanel from "../Layout/TabPane";
interface PokemonEvolutionsProps {
  pokemonEvolutions: PokemonDetailsResponse[];
  value: number;
}
const PokemonEvolutions = (props: PokemonEvolutionsProps) => {
  const [evolutions, setEvolutions] = useState(props.pokemonEvolutions);
  useEffect(() => {
    setEvolutions(props.pokemonEvolutions);
  }, [props]);
  return (
    <TabPanel value={props.value} index={0} dir={"ltr"}>
      <ul style={{ listStyle: "none" }}>
        {evolutions.length > 0
          ? evolutions.map((pokemon: PokemonDetailsResponse, index: number) => {
              const frontDefaultImage =
                pokemon.sprites && pokemon.sprites.front_default
                  ? pokemon.sprites.front_default
                  : "";
              const pokemonName = pokemon.name ? pokemon.name : "";
              return (
                <li
                  key={pokemonName}
                  style={{
                    float: "left",
                    width: "100%",
                  }}
                >
                  <img
                    src={frontDefaultImage}
                    alt={pokemonName}
                    style={{
                      float: "left",
                    }}
                  />
                  <h3
                    style={{
                      textTransform: "capitalize",
                      maxWidth: "200px",
                      float: "left",
                      margin: "20px 10px",
                    }}
                  >
                    {pokemonName}
                  </h3>
                </li>
              );
            })
          : "Loading Evolutions"}
      </ul>
    </TabPanel>
  );
};

export default PokemonEvolutions;
