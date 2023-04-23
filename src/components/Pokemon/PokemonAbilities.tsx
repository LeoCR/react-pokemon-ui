import React, { useState, useEffect } from "react";
import TabPanel from "../Layout/TabPane";
import {
  ability,
  IPokemonAbilities,
} from "../../interfaces/PokemonDetails.interface";
import IconAttack from "../../assets/img/icon_attack.svg";

const PokemonAbilities: React.FC<IPokemonAbilities> = (
  props: IPokemonAbilities
) => {
  const [pokemonAbilities, setPokemonAbilities] = useState<ability[]>([]);

  useEffect(() => {
    if (props.abilities) {
      setPokemonAbilities(props.abilities);
    }
  }, [props.abilities]);

  return (
    <TabPanel value={props.value} index={2} dir={"ltr"}>
      <ul style={{ listStyle: "decimal" }}>
        {pokemonAbilities.length > 0 ? (
          pokemonAbilities.map((ability: ability, index: number) => {
            if (ability.ability.name) {
              return (
                <li
                  key={ability.ability.name + "_" + index}
                  style={{ float: "left", position: "relative", width: "100%" }}
                >
                  <img
                    src={IconAttack}
                    alt={ability.ability.name}
                    style={{
                      float: "left",
                      maxWidth: "50px",
                      margin: "5px",
                      position: "relative",
                    }}
                  />
                  <p
                    style={{
                      float: "left",
                      maxWidth: "600px",
                      position: "relative",
                    }}
                  >
                    {ability.ability.name}
                  </p>
                </li>
              );
            }
          })
        ) : (
          <>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading Abilities...</span>
            </div>
            <div className="spinner-grow text-success" role="status"></div>
            <div className="spinner-grow text-primary" role="status"></div>
          </>
        )}
      </ul>
    </TabPanel>
  );
};
export default PokemonAbilities;
