import React from 'react';
type Props = {
    details:any;
};
const Pokemon: React.FC<Props> = props =>{
        if(!props.details){
            return(
                <React.Fragment>
                    Loading...
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <h4 className="pokemon_name">{props.details.name}</h4>
                <img src={props.details.sprites.front_default} alt={props.details.name}/>
            </React.Fragment>
        );
}
export default Pokemon;