import React, { useEffect, useState } from "react";
import TabPanel from "../Layout/TabPane";
import { useSelector } from "react-redux";
import {
  PokemonAreasProps,
  PokemonLocationAreasResponse,
} from "../../interfaces/PokemonLocationAreas.interface";
import { IStore } from "../../store/store";

const PokemonAreas = (props: PokemonAreasProps) => {
  const [pokemonAreasState, setPokemonAreas] = useState<
    PokemonLocationAreasResponse[]
  >([]);
  const pokemonDetailsProps = useSelector(
    (state: IStore) => state.pokemons.pokemon
  );
  useEffect(() => {
    if (props.pokemonAreas) {
      setPokemonAreas(props.pokemonAreas);
    }
  }, [pokemonDetailsProps]);

  let pokemonAreasRender = pokemonAreasState.map(
    (pokemonArea: PokemonLocationAreasResponse, index: number) => {
      if (pokemonArea.location_area && pokemonArea.location_area.name) {
        const RandomNumber = Math.random();
        return (
          <li
            key={
              index + "_" + pokemonArea.location_area.name + "_" + RandomNumber
            }
            style={{ float: "left", position: "relative", width: "100%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{
                float: "left",
                maxWidth: "20px",
                margin: "5px",
                position: "relative",
              }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <p
              style={{
                float: "left",
                maxWidth: "700px",
                position: "relative",
              }}
            >
              {pokemonArea.location_area.name}
            </p>
          </li>
        );
      }
    }
  );
  return (
    <TabPanel value={props.value} index={1} dir={"ltr"}>
      <ul style={{ listStyle: "decimal" }}>
        {pokemonAreasState.length > 0
          ? pokemonAreasRender
          : "This Pokemon has not Areas for the moment"}
      </ul>
    </TabPanel>
  );
};

export default PokemonAreas;
