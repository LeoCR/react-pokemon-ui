import axios from "axios";
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
    .then((res: any) => {
      pokemons = res.data;
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
  return pokemons;
};
export const fetchPokemonDeatils = async (name: string = "pikachu") => {
  let pokemonDetails = "";
  await apiPokemon
    .get("/api/v2/pokemon/" + name.toLowerCase())
    .then((res: any) => {
      pokemonDetails = res.data;
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
  //console.log(pokemonDetails);

  return pokemonDetails;
};
export const fetchPokemonEvolutionsChainURL = async (
  pokemonName: string = "pikachu"
) => {
  let pokemonEvolutionsChainUrl = "";
  await apiPokemon
    .get("/api/v2/pokemon-species/" + pokemonName.toLowerCase())
    .then((res: any) => {
      if (res.data.evolution_chain.url !== undefined) {
        pokemonEvolutionsChainUrl = res.data.evolution_chain.url;
      }
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });

  return pokemonEvolutionsChainUrl;
};
export const fetchPokemonEvolutions = async (urlChain: string = "") => {
  let pokemonEvolutions = "";
  await apiPokemon
    .get(urlChain)
    .then((res: any) => {
      pokemonEvolutions = res.data;
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err);
    });

  return pokemonEvolutions;
};
