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
            <div className="pokemon_container">
                <h4 className="pokemon_name">{props.details.name}</h4>
                <img src={props.details.sprites.front_default} alt={props.details.name}/>
            </div>
        );
}
export default Pokemon;