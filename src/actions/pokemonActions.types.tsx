import { POKEMONS, POKEMON_DETAILS } from "../constants/pokemonsTypes";
/**
https://codesandbox.io/s/react-redux-async-e0zcw?file=/src/index.tsx
https://www.carlrippon.com/managing-app-state-with-redux-and-typescript-p2/
**/
export interface setPokemons {
    type:typeof POKEMONS.LOAD_SUCCESS
    pokemons: any
};
export interface setPokemon{
    type:typeof POKEMONS.SET_POKEMON,
    pokemon:any
}
export type PokemonActionsTypes=setPokemons|setPokemon
