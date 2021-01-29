import React from 'react';
import { PokemonDetailsResponse } from '../../interfaces/PokemonDetails.interface';
type Props = {
    details:PokemonDetailsResponse;
};
const Pokemon: React.FC<Props> = props =>{
        if(!props.details){
            return(
                <React.Fragment>
                    Loading...
                </React.Fragment>
            )
        }
        const frontDefaultImage=(props.details&& props.details.sprites&&props.details.sprites.front_default)?props.details.sprites.front_default:''
        const PokemonName=(props.details&&props.details.name)?props.details.name:'';
        return (
            <React.Fragment>
                <h4 className="pokemon_name">{PokemonName}</h4>
                <img src={frontDefaultImage} alt={PokemonName}/>
            </React.Fragment>
        );
}
export default Pokemon;