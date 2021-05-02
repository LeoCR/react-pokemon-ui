import axios from "axios";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import {
  PokemonEvolutionChain,
  PokemonEvolutionsChainURLResponse,
} from "../interfaces/PokemonEvolutions.interface";
import { PokemonLocationAreasResponse } from "../interfaces/PokemonLocationAreas.interface";
export const apiPokemon = axios.create({
  baseURL: "https://pokeapi.co/",
  responseType: "json",
});
export const fetchPokemons = async (page: number) => {
  let pokemons = "";
  await apiPokemon
    .get("/api/v2/pokemon", {
      params: {
        offset: page,
        limit: 10,
      },
    })
    .then((res) => {
      pokemons = res.data;
      return res.data;
    });
  return pokemons;
};
export const fetchPokemonDetails = async (name: string = "pikachu") => {
  let pokemonDetails: PokemonDetailsResponse = {};
  await apiPokemon.get("/api/v2/pokemon/" + name.toLowerCase()).then((res) => {
    pokemonDetails = res.data;
    return res.data;
  });
  return pokemonDetails;
};

export const fetchPokemonEvolutionsChainURL = async (
  pokemonName: string = "pikachu"
) => {
  let pokemonEvolutionsChainUrl = "";
  await apiPokemon
    .get("/api/v2/pokemon-species/" + pokemonName.toLowerCase())
    .then((res: PokemonEvolutionsChainURLResponse) => {
      if (res.data.evolution_chain.url) {
        pokemonEvolutionsChainUrl = res.data.evolution_chain.url;
      }
      return res.data;
    });

  return pokemonEvolutionsChainUrl;
};
export const fetchPokemonEvolutions = async (urlChain: string = "") => {
  let pokemonEvolutions: PokemonEvolutionChain = {};
  await apiPokemon.get<PokemonEvolutionChain>(urlChain).then((res) => {
    pokemonEvolutions = res.data;
    return res.data;
  });

  return pokemonEvolutions;
};

export const fetchPokemonAreas = async (pokemonName: string = "pikachu") => {
  let pokemonAreas: PokemonLocationAreasResponse[] = [];
  await apiPokemon
    .get("/api/v2/pokemon/" + pokemonName + "/encounters")
    .then((res) => {
      if (res.data) {
        pokemonAreas = res.data;
      }
      return res.data;
    });

  return pokemonAreas;
};
