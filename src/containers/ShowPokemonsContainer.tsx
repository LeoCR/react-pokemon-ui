import React,{useEffect, useState,useCallback} from 'react';
import $ from 'jquery'; 
import { Link ,withRouter} from 'react-router-dom';
import {logout} from "../actions/securityActions"; 
import {useSelector,useDispatch} from "react-redux";
import Pokemon from "../components/Pokemon/Pokemon";
import {loadPokemons,clearPokemons,clearPokemonDetails} from "../actions/pokemonActions";

interface Props {   
  
}
export const ShowPokemonsContainer : React.FC<Props> = (props:any) =>  {
    const [pokemonsDetails,setPokemonsDetails]=useState([]);
    const [isLoading,setIsLoading]=useState(true); 
    const totalPagination=[1,2,3,4,5,6,7,8,9,10];
    const dispatch=useDispatch();
    const pokemonsDetailsProps=useSelector((state:any)=>state.pokemonsDetails.pokemonsDetails);
    const user=useSelector((state:any)=>state.user);

    
    useEffect(()=>{
        try { 
            let page2=0;
             if(isNaN(props.match.params.page)===false&& props.match.params!==undefined){
                page2=props.match.params.page;
                if(isNaN(page2)===false&& page2>1){ 
                    setPokemonsCallback(page2);
                    props.history.push('/pokemons/'+page2)
                    setTimeout(() => {    
                        $("#page-item-"+page2).addClass("active");
                    }, 1400);
                }
                else{
                    setPokemonsCallback(0);
                    setTimeout(() => {    
                        $("#page-item-1").addClass("active");
                    }, 1400);
                }
            }
            else{
                $("#page-item-1").addClass("active");
                setPokemonsCallback(page2);
            }   
            //setPokemonsCallback(0);
                setInterval(()=>{ 
                    const currentTime = Date.now()/1000;
                    if(user.user.exp<currentTime){ 
                            dispatch(logout());
                            window.location.href="/login";
                    }
                },28800000); 
        } catch (error) {
            console.log('An error occurs in ShowPokemonsContainer.useEffect()');
            console.log(error);
        }
    },[]);
    const setPokemonsCallback=useCallback((page:number)=>{
        setIsLoading(true);
        dispatch(clearPokemons());
        dispatch(clearPokemonDetails());
        setTimeout(() => {
            dispatch(loadPokemons(page*10));
        }, 450);
        setTimeout(() => {
            if(pokemonsDetailsProps.length>9){
                setPokemonsDetails(pokemonsDetailsProps);
                setIsLoading(false);
            }/*  
            else{
                setPokemonsCallback(page);
            } */
        },1500);
    },[]);
    const getPage=(key:number,index:number)=>{
        try { 
            if($('.page-nav').hasClass('active')){
                $('.page-nav').removeClass('active');
            }
            setTimeout(() => {
                $('#page-item-'+ index).addClass('active');
            }, 300); 
            setPokemonsCallback(key);
        } catch (error) {
            console.log('An error occurs in ShowDesserts.getPage() , but dont worry about it');
            console.log(error);
        }
    }
    useEffect(()=>{
        setIsLoading(true);
        setPokemonsDetails(pokemonsDetailsProps);
        setIsLoading(false);
    },[pokemonsDetails,isLoading,pokemonsDetailsProps])

    const getPrevPage=()=>{

    }
    const getNextPage=()=>{

    } 
    const getPagination=()=>{
        return(
            <React.Fragment>
                <div style={{textAlign:'center',margin:'0 auto'}} className="container">
                    <nav id="pagination-bottom" style={{maxWidth:'580px',margin:'0 auto'}}>
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" onClick={()=>getPrevPage()} href="#previous">Previous</a>
                            </li> 
                            {
                                totalPagination.map((index:number,key:number)=> 
                                    <li className="page-item page-nav" id={`page-item-${index}`} key={key}>
                                        <Link to={`/pokemons/${index}`} className="page-link" onClick={()=>getPage(key,index)}>{index}</Link>
                                    </li>
                                )
                            }
                            <li className="page-item">
                                <a className="page-link" onClick={()=>getNextPage()} href="#next">Next</a>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    } 
    let currentTime=  Date.now();
    const renderedPokemons=(pokemonsDetails.length>0)&& pokemonsDetails.map((pokemon:any,index:number)=>
            <React.Fragment key={(pokemon.name+pokemon.id+'_'+currentTime+Math.random())}>
                    <Pokemon details={pokemonsDetails[index]} /> 
            </React.Fragment>
    )  
    return (
        <div className="pokemons_container">
            { (isLoading===false)?renderedPokemons:'Loading,please wait...'}
            {(isLoading===false)?getPagination():''}
        </div>
    )
}

   
export default withRouter(ShowPokemonsContainer); 