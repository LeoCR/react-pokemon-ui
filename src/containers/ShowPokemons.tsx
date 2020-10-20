import React from "react"
import {loadPokemons,clearPokemons,clearPokemonDetails} from "../actions/pokemonActions";
import {connect} from "react-redux";
import Pokemon from "../components/Pokemon/Pokemon";
import $ from 'jquery'; 
import { Link ,withRouter} from 'react-router-dom';
import {logout} from "../actions/securityActions";

interface ShowPokemonsProps {
    pokemons:any,
    pokemonsDetails:any,
    loadPokemons:(page:number) => void,
    clearPokemons:() => void,
    clearPokemonDetails:()=>void,
    match:{
        params:{
            page:number
        }
    },
    history:any,
    user:any,
    logout:()=>void
   // history:any
 }
interface PokemonInterface{
     name:string,
     url:string
}
interface ShowPokemonsState {
    currentPage: number,
    totalItems:number,
    maxItemsPerPage:number,
    pokemonsToShow:Array<PokemonInterface>,
    totalPagination:Array<number>,
    pokemonsDetails:any,
    isLoading:boolean,
    currentTime:number
}
 
class ShowPokemons extends React.PureComponent<ShowPokemonsProps, ShowPokemonsState>  {
    constructor(props:any){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            currentTime: Date.now(),
            isLoading:true,
            maxItemsPerPage:4,
            pokemonsDetails:[],
            pokemonsToShow:[
                 {
                    name: "ivysaur",
                    url: "https://pokeapi.co/api/v2/pokemon/2/"
                },
                {
                    name: "venusaur",
                    url: "https://pokeapi.co/api/v2/pokemon/3/"
                }
            ],
            totalPagination:[1,2]
        }
    }
    getNextPage=()=>{ 
        try {
        } catch (error) {
            console.log("An error occurs in ShowSDesserts.getNextPage(),but dont worry about it :)");
            console.log(error);
        }
    }
    getPrevPage=()=>{
        try {
            if(this.state.currentPage>1){

            }
        } catch (error) {
            console.log("An error occurs in ShowSDesserts.getPrevPage(),but dont worry about it :)");
            console.log(error);
        }
    }
    getPage=(key:number,index:number)=>{
        try {
            if($('.page-nav').hasClass('active')){
                $('.page-nav').removeClass('active');
            }
            setTimeout(() => {
                $('#page-item-'+ index).addClass('active');
            }, 300);
            this.setState({
                currentPage:key
            })
            this.setPokemons(key);
        } catch (error) {
            console.log('An error occurs in ShowDesserts.getPage() , but dont worry about it');
            console.log(error);
        }
    }
    getPagination=()=>{
        return(
            <React.Fragment>
                <div style={{textAlign:'center',margin:'0 auto'}} className="container">
                    <nav id="pagination-bottom" style={{maxWidth:'580px',margin:'0 auto'}}>
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getPrevPage()} href="#previous">Previous</a>
                            </li> 
                            {
                                this.state.totalPagination.map((index:number,key:number)=> 
                                    <li className="page-item page-nav" id={`page-item-${index}`} key={key}>
                                        <Link to={`/pokemons/${index}`} className="page-link" onClick={()=>this.getPage(key,index)}>{index}</Link>
                                    </li>
                                )
                            }
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getNextPage()} href="#next">Next</a>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    } 
    setPokemons=(page:number)=>{  
        this.props.clearPokemons();
        this.props.clearPokemonDetails();
        setTimeout(() => {
            this.props.loadPokemons(page*10);
        }, 450);
        setTimeout(() => {
            this.setState({
                pokemonsDetails:this.props.pokemonsDetails,
                isLoading:false
            })
        },1300);
    } 
    componentDidMount(){
        try { 
            let page2=0;
            if(isNaN(this.props.match.params.page)===false){
                page2=this.props.match.params.page;
                if(isNaN(page2)===false&& page2>1){ 
                    this.setPokemons(page2);
                    setTimeout(() => {    
                        $("#page-item-"+page2).addClass("active");
                    }, 1400);
                }
                else{
                    this.setPokemons(0);
                    setTimeout(() => {    
                        $("#page-item-1").addClass("active");
                    }, 1400);
                }
            }
            else{
                $("#page-item-1").addClass("active");
                this.setPokemons(page2);
            }
            const {pokemons}= this.props;
            this.setState({
                totalItems:pokemons.length
            }); 
            var tempItems=[];
            for (let index = 1; index <= 10; index++) {
                tempItems.push(index);
            }
            this.setState({
                totalPagination:tempItems
            }); 
            setInterval(()=>{ 
                const currentTime = Date.now()/1000;
                if(this.props.user.user.exp<currentTime){ 
                        this.props.logout()
                        window.location.href="/login";
                }
              },28800000)
        } catch (error) {
            console.log('An error occurs in ShowPokemons.componentDidMount()');
            console.log(error);
        }
    }
    render() { 
        const {pokemonsDetails}=this.state;
        let currentTime= this.state.currentTime;
        const renderedPokemons=(pokemonsDetails.length>0)&& pokemonsDetails.map((pokemon:any,index:number)=>
                <React.Fragment key={(pokemon.name+pokemon.id+'_'+currentTime+Math.random())}>
                     <Pokemon details={pokemonsDetails[index]} /> 
                </React.Fragment>
        ) 
        return (
            <div className="pokemons_container">
               { (this.state.isLoading===false)?renderedPokemons:'Loading,please wait...'}
               {(this.state.isLoading===false)?this.getPagination():''}
            </div>
        );
    }
}
const mapStateToProps=(state:any)=>({
    pokemons:state.pokemons.pokemons,
    pokemonsDetails:state.pokemonsDetails.pokemonsDetails,
    user:state.user
})
export default withRouter(connect(mapStateToProps,{loadPokemons,clearPokemons,clearPokemonDetails,logout})(ShowPokemons)); 