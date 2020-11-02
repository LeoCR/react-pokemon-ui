import React, { useState, useEffect } from "react";
import { fetchPokemonDeatils } from "../../api/apiPokemon";
import TabPanel from "../Layout/TabPane";

const PokemonEvolutions = (props: any) => {
  const [evolutions, setEvolutions] = useState(props.pokemonEvolutions);
  useEffect(() => {
    setEvolutions(props.pokemonEvolutions);
  }, [props]);
  let pokemonsEvolvedLenght = evolutions.length + 1;
  return (
    <TabPanel value={props.value} index={0} dir={"ltr"}>
      <ul style={{ listStyle: "none" }}>
        {props.isLoading === false
          ? evolutions.map((pokemon: any, index: number) => {
              pokemonsEvolvedLenght--;
              return (
                <li
                  key={pokemon.name + "-" + pokemon.id}
                  style={{
                    float: "left",
                    width: "100%",
                  }}
                >
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
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
                    {"0" +
                      pokemonsEvolvedLenght.toString() +
                      "-" +
                      pokemon.name}
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
