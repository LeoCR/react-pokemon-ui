/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Container, AppBar, Tabs, Tab, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { setPokemon, setPokemonEvolutions } from "../actions/pokemonActions";
import {
  fetchPokemonDetails,
  fetchPokemonEvolutionsChainURL,
  fetchPokemonEvolutions,
  fetchPokemonAreas,
} from "../api/apiPokemon";
import TabPanel from "../components/Layout/TabPane";
import PokemonEvolutions from "../components/Pokemon/PokemonEvolutions";
import PokemonAreas from "../components/Pokemon/PokemonAreas";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { PokemonLocationAreasResponse } from "../interfaces/PokemonLocationAreas.interface";
import {
  PokemonEvolutionChain,
  EvolvesTo,
} from "../interfaces/PokemonEvolutions.interface";
import { IStore } from "../store/store";
import PokemonAbilities from "../components/Pokemon/PokemonAbilities";
import { ViewPokemonDetailsContainerProps } from "../types/ViewPokemonDetailsContainer.types";
import { Dialog } from "../components/Layout/Dialog";
import { Preloader } from "../components/Layout/Preloader";

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const ViewPokemonDetailsContainer: React.FC<
  ViewPokemonDetailsContainerProps
> = ({ match, history }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const pokemonDetailsProps = useSelector(
    (state: IStore) => state.pokemons.pokemon
  );
  const [pokemonDetails, setPokemonState] = useState<PokemonDetailsResponse>({
    name: "",
    id: 1,
    sprites: {
      front_default: null,
    },
  });
  const [pokemonEvolutionsState, setPokemonEvolutionsState] = useState<
    PokemonDetailsResponse[]
  >([]);

  const [pokemonAreas, setPokemonAreas] =
    useState<PokemonLocationAreasResponse[]>();
  const [tabValue, setTabValue] = React.useState(0);

  const fetchPokemonDetailsCallback = useCallback(async () => {
    try {
      await fetchPokemonDetails(match.params.pokemon, setPokemonDetailData);
      await fetchPokemonEvolutionsChainURL(
        match.params.pokemon,
        setPokemonsEvolutionsChainData
      );
    } catch (error) {
      console.error(
        "An error occurs inside ViewPokemonDetailsContainer.fetchPokemonDetailsCallback ",
        error
      );
    }
  }, [match.params.pokemon]);
  const setPokemonAreasResponse = useCallback(
    async (pokemonName: string) => {
      await fetchPokemonAreas(pokemonName).then((res) => {
        setPokemonAreas(res as PokemonLocationAreasResponse[]);
      });
    },
    [pokemonDetailsProps]
  );
  useEffect(() => {
    try {
      if (pokemonDetailsProps && pokemonDetailsProps.name) {
        const pokemonName = (pokemonDetailsProps.name as string)
          .toString()
          .toLowerCase();
        setPokemonAreasResponse(pokemonName);
      }
    } catch (error) {
      console.error(
        "An error occurs in ViewPokemonDetailsContainer useEffect(()=>{},[pokemonDetailsProps])",
        error
      );
    }
  }, [setPokemonAreasResponse]);

  useEffect(() => {
    if (match && match.params && match.params.pokemon) {
      fetchPokemonDetailsCallback();
    }
  }, [fetchPokemonDetailsCallback]);
  const setPokemonDetailData = async (
    pokemonDetailsResponse: PokemonDetailsResponse
  ) => {
    dispatch(setPokemon(pokemonDetailsResponse as PokemonDetailsResponse));
    setPokemonState(pokemonDetailsResponse as PokemonDetailsResponse);
  };
  const setPokemonsDetailsData = async (pokemons: PokemonDetailsResponse[]) => {
    let tempPokemons: PokemonDetailsResponse[] = [];
    for (const pkmn of pokemons) {
      await fetchPokemonDetails(pkmn as string)
        .then((res) => {
          tempPokemons.push(res as PokemonDetailsResponse);
        })
        .catch((err) => {
          console.error("An error occurs in setPokemonsDetailsData", err);
        });
    }
    dispatch(setPokemonEvolutions(tempPokemons));
    setPokemonEvolutionsState(tempPokemons);
  };
  const setPokemonsEvolutionsChainData = async (chainUrl: string) => {
    await fetchPokemonEvolutions(chainUrl, setPokemonsEvolutionsData);
  };
  const setPokemonsEvolutionsData = async (
    resChainURL: PokemonEvolutionChain
  ) => {
    let pokemons: Array<string> = [];
    if (resChainURL && resChainURL.chain && resChainURL.chain.evolves_to) {
      if (
        Array.isArray(resChainURL.chain.evolves_to) &&
        resChainURL.chain.evolves_to.length
      ) {
        const chainEvolves: EvolvesTo[] = resChainURL.chain.evolves_to;
        chainEvolves.forEach((evolution: EvolvesTo) => {
          if (
            evolution.evolves_to &&
            evolution.evolves_to[0] &&
            evolution.evolves_to[0].species &&
            evolution.evolves_to[0].species.name
          ) {
            pokemons.push(evolution.evolves_to[0].species.name);
          }
          if (evolution && evolution.species && evolution.species.name) {
            pokemons.push(evolution.species.name);
          }
        });
        if (resChainURL.chain.species && resChainURL.chain.species.name) {
          pokemons.push(resChainURL.chain.species.name);
        }
        await setPokemonsDetailsData(pokemons as PokemonDetailsResponse[]);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  const onClickBack = () => {
    history.go(-1);
  };
  const hasPokemons =
    pokemonDetails &&
    pokemonDetailsProps &&
    pokemonDetailsProps?.sprites &&
    pokemonDetailsProps?.sprites?.front_default &&
    pokemonDetailsProps?.name &&
    pokemonDetails?.sprites &&
    pokemonDetails?.sprites?.front_default;

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={"btnBack"}
        onClick={() => onClickBack()}
      >
        Back
      </Button>
      {
        <Paper className={"paperDetails"}>
          <Container maxWidth="sm" style={{ padding: "30px 0px" }}>
            {hasPokemons ? (
              <>
                <div className="pokemon_overview_container">
                  <h2 className="pokemon_name">{pokemonDetails.name}</h2>
                  <img
                    src={pokemonDetailsProps?.sprites?.front_default as string}
                    alt={pokemonDetailsProps?.name}
                    title={pokemonDetailsProps?.name}
                    className="pokemon_image"
                  />
                  <AppBar position="static" color="default">
                    <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      textColor="primary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                      <Tab label="Evolutions" {...a11yProps(0)} />
                      <Tab label="Encounter" {...a11yProps(1)} />
                      <Tab label="Abilities" {...a11yProps(2)} />
                    </Tabs>
                  </AppBar>

                  <PokemonEvolutions
                    value={tabValue}
                    pokemonEvolutions={pokemonEvolutionsState}
                  />
                  {pokemonAreas ? (
                    <PokemonAreas
                      value={tabValue}
                      pokemonAreas={pokemonAreas}
                    />
                  ) : (
                    <TabPanel value={tabValue} index={1} dir={"rtl"}>
                      <Preloader />
                    </TabPanel>
                  )}
                  <PokemonAbilities
                    value={tabValue}
                    abilities={pokemonDetailsProps.abilities}
                  />
                </div>
                <Button
                  variant="contained"
                  className="btnAddToMyFavorites"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add to My Favorites
                </Button>
                <Dialog
                  isOpen={open}
                  setOpen={setOpen}
                  pokemonName={pokemonDetailsProps?.name as string}
                />
              </>
            ) : (
              <>
                <Preloader />
              </>
            )}
          </Container>
        </Paper>
      }
    </>
  );
};
export default withRouter(React.memo(ViewPokemonDetailsContainer));
