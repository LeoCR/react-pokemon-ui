import React from 'react';
import {loadPokemons} from "../actions/pokemonActions";
import {connect} from "react-redux";
import Pokemon from "../components/Pokemon/Pokemon"
interface AppProps {
    pokemons:any,
    pokemonsDetails:any,
    loadPokemons:(page:number) => void
 }
 
 interface AppState {
    currentPage: number,
    totalItems:number,
    maxItemsPerPage:number,
    pokemonsToShow:any,
    firstItemToShow:any,
    totalPagination:any
 }
 
class ShowPokemons extends React.Component<AppProps, AppState>  {
    constructor(props:any){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:4,
            pokemonsToShow:[
                 {
                    name: "ivysaur",
                    url: "https://pokeapi.co/api/v2/pokemon/2/"
                },
                {
                    name: "venusaur",
                    url: "https://pokeapi.co/api/v2/pokemon/3/"
                },
                {
                    name: "charmander",
                    url: "https://pokeapi.co/api/v2/pokemon/4/"
                },
                {
                    name: "charmeleon",
                    url: "https://pokeapi.co/api/v2/pokemon/5/"
                },
                {
                    name: "charizard",
                    url: "https://pokeapi.co/api/v2/pokemon/6/"
                },
                {
                    name: "squirtle",
                    url: "https://pokeapi.co/api/v2/pokemon/7/"
                },
                {
                    name: "wartortle",
                    url: "https://pokeapi.co/api/v2/pokemon/8/"
                },
                {
                    name: "blastoise",
                    url: "https://pokeapi.co/api/v2/pokemon/9/"
                },
                {
                    name: "caterpie",
                    url: "https://pokeapi.co/api/v2/pokemon/10/"
                },
                {
                    name: "metapod",
                    url: "https://pokeapi.co/api/v2/pokemon/11/"
                }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
    }
    async componentDidMount(){
        try {
            this.props.loadPokemons(this.state.firstItemToShow);
            const {pokemons}= this.props;
            this.setState({
                totalItems:pokemons.length
            });
            var tempTotalPages=Math.ceil(pokemons.length/this.state.maxItemsPerPage);
            var tempItems=[];
            for (let index = 1; index <= tempTotalPages; index++) {
                tempItems.push(index);
            }
            this.setState({
                totalPagination:tempItems
            });
            //this.setDessertsItems();
        } catch (error) {
            console.log('An error occurs in ShowDesserts.componentDidMount()');
            console.log(error);
        }
    }
    render() { 
        const {pokemonsDetails}=this.props.pokemonsDetails;
         const renderedPokemons=(pokemonsDetails!==null)&& pokemonsDetails.map((pokemon:any,index:number)=>{
            return(
                <React.Fragment key={pokemon.id}>
                     <Pokemon details={pokemonsDetails[index]} /> 
                </React.Fragment>
            )
        }) 
        return (
            <div className="pokemons_container">
               { (pokemonsDetails.isLoading===false)?'Loading':renderedPokemons}
            </div>
        );
    }
}
const mapStateToProps=(state:any)=>({
    pokemons:state.pokemons.pokemons,
    pokemonsDetails:state.pokemonsDetails
})
export default connect(mapStateToProps,{loadPokemons})(ShowPokemons); 