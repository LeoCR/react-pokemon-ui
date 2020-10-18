import { POKEMONS,POKEMON_DETAILS} from "../constants/pokemonsTypes";

export const loadPokemons = () => ({
    type: POKEMONS.LOAD,
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