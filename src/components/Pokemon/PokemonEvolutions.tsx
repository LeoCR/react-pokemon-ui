import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { PokemonDetailsResponse } from "../../interfaces/PokemonDetails.interface";
import TabPanel from "../Layout/TabPane";
import { useDispatch } from "react-redux";
import { setPokemon } from "../../actions/pokemonActions";
import { Preloader } from "../Layout/Preloader";
interface PokemonEvolutionsProps {
  pokemonEvolutions: PokemonDetailsResponse[];
  value: number;
}
const PokemonEvolutions = (props: PokemonEvolutionsProps) => {
  const [evolutions, setEvolutions] = useState(props.pokemonEvolutions);
  const dispatch = useDispatch();
  useEffect(() => {
    setEvolutions(props.pokemonEvolutions);
  }, [props]);
  return (
    <TabPanel value={props.value} index={0} dir={"ltr"}>
      <ul style={{ listStyle: "none" }}>
        {evolutions.length > 0 ? (
          evolutions.map((pokemon: PokemonDetailsResponse, index: number) => {
            const frontDefaultImage =
              pokemon.sprites && pokemon.sprites.front_default
                ? pokemon.sprites.front_default
                : "";
            const pokemonName = pokemon.name ? pokemon.name : "";
            if (frontDefaultImage !== "") {
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
                      color: "#000",
                    }}
                  >
                    {pokemonName}
                  </h3>
                  <Link
                    to={`/react-pokemon-ui/pokemon/${pokemonName}`}
                    onClick={() => {
                      dispatch(setPokemon(pokemon as PokemonDetailsResponse));
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ margin: "20px", float: "right" }}
                    >
                      View
                    </Button>
                  </Link>
                </li>
              );
            } else {
              return <>This Pokemon doesn't have any Evolutions.</>;
            }
          })
        ) : (
          <>
            <Preloader />
          </>
        )}
      </ul>
    </TabPanel>
  );
};

export default PokemonEvolutions;
