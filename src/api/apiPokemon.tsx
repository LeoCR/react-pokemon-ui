import axios from 'axios'; 
export const apiPokemon= axios.create({
    baseURL:'https://pokeapi.co/',
    responseType: 'json' 
}) 
export const fetchPokemons=async(page:number=0)=>{
    let pokemons='';
    await apiPokemon.get('/api/v2/pokemon',{
        params:{
            offset:page,
            limit:10
        }
    })
    .then((res:any)=>{
        pokemons=res.data;
        return res.data;
    })
    .catch((err:any)=>{
        throw new Error(err); 
    })
    return pokemons;
}
export const fetchPokemonDeatils=async(name:string='pikachu')=>{
    let pokemonDetails='';
    await apiPokemon.get('/api/v2/pokemon/'+name)
    .then((res:any)=>{
        pokemonDetails=res.data;
        return res.data;
    })
    .catch((err:any)=>{
        throw new Error(err); 
    })
    console.log(pokemonDetails);
    
    return pokemonDetails;
}