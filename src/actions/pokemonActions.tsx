import { POKEMONS,POKEMON_DETAILS} from "../constants/pokemonsTypes";
export const clearPokemons=()=>({
    type: POKEMONS.CLEAR_POKEMONS,
})
export const loadPokemons = (page:number) => ({
    type: POKEMONS.LOAD,
    page
});

export const setPokemons = (pokemons:any) => ({
    type: POKEMONS.LOAD_SUCCESS,
    pokemons:pokemons.results,
});

export const setPokemonsError = (error:any) => ({
    type: POKEMONS.LOAD_FAIL,
    error,
});
export const loadPokemonDetails = (name:string) => ({
    type: POKEMON_DETAILS.LOAD,
    name,
}); 
export const setPokemonDetails = (name:string, details:any) => ({
    type: POKEMON_DETAILS.LOAD_SUCCESS,
    name,
    details,
});

export const setPokemonDetailsError = (name:string) => ({
    type: POKEMON_DETAILS.LOAD_FAIL,
    name,
});
export const clearPokemonDetails=()=>({
    type:POKEMON_DETAILS.CLEAR_POKEMON_DETAILS
})