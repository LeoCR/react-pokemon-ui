import React, { useEffect, useState } from "react";
import TabPanel from "../Layout/TabPane";
import { useSelector } from "react-redux";
import { PokemonLocationAreasResponse } from "../../interfaces/PokemonLocationAreas.interface";
import { IStore } from "../../store/store";

interface PokemonAreasProps{
  pokemonAreas:PokemonLocationAreasResponse[]
  value:number
  isLoading:boolean
}
const PokemonAreas = (props: PokemonAreasProps) => {
  const [pokemonAreasState, setPokemonAreas] = useState<PokemonLocationAreasResponse[]>([]);
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
      if(pokemonArea.location_area&&pokemonArea.location_area.name){
        const RandomNumber=Math.random();
        return (
          <li key={index+'_'+pokemonArea.location_area.name+'_'+RandomNumber}>
            <p>{pokemonArea.location_area.name}</p>
          </li>
        );
      } 
    }
  );
  return (
    <TabPanel value={props.value} index={1} dir={"ltr"}>
      <ul style={{listStyle:'decimal'}}>{(pokemonAreasState.length>0) ? pokemonAreasRender : "This Pokemon has not Areas for the moment"}</ul>
    </TabPanel>
  );
};

export default React.memo(PokemonAreas);
