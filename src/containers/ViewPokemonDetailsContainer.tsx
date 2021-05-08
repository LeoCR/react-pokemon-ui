import { Paper, Container, AppBar, Tabs, Tab, Button } from "@material-ui/core";
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
import SwipeableViews from "react-swipeable-views";
import { useStyles } from "./ViewPokemonDetailsContainer.style";
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

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const ViewPokemonDetailsContainer: React.FC<ViewPokemonDetailsContainerProps> = ({
  match,
  history,
}) => {
  const dispatch = useDispatch();
  const pokemonDetailsProps = useSelector(
    (state: IStore) => state.pokemons.pokemon
  );
  const classes = useStyles();
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
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonAreas, setPokemonAreas] = useState<
    PokemonLocationAreasResponse[]
  >();
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
  const setPokemonAreasResponse=useCallback(async(pokemonName:string)=>{
    await fetchPokemonAreas(pokemonName).then((res) => {
      setPokemonAreas(res as PokemonLocationAreasResponse[]);
    });
  },[pokemonDetailsProps])
  useEffect(() => {
    try {
      if (pokemonDetailsProps && pokemonDetailsProps.name) {
        const pokemonName = (pokemonDetailsProps.name as string)
          .toString()
          .toLowerCase();
        setPokemonAreasResponse(pokemonName)
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
  const setPokemonDetailData = async (pokemonDetailsResponse: PokemonDetailsResponse) => {
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
      setIsLoading(false);
    }
  };
  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  const onClickBack = () => {
    history.go(-1);
  };
  let hasPokemons;
  try {
    hasPokemons =
      pokemonDetails &&
      pokemonDetailsProps &&
      pokemonDetailsProps.sprites &&
      pokemonDetailsProps.sprites.front_default &&
      pokemonDetailsProps.name &&
      pokemonDetails.sprites &&
      pokemonDetails.sprites.front_default;
  } catch (error) {
    console.error("An error occurs ViewPokemonDetailsContainer", error);
  }
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        className={classes.btnBack}
        onClick={() => onClickBack()}
      >
        Back
      </Button>
      {
        <Paper className={classes.paperDetails}>
          <Container maxWidth="sm" style={{ padding: "30px 0px" }}>
            {hasPokemons &&
            pokemonDetailsProps &&
            pokemonDetailsProps.sprites &&
            pokemonDetailsProps.sprites.front_default &&
            pokemonDetailsProps.name ? (
              <React.Fragment>
                <h2 style={{ textTransform: "capitalize" }}>
                  {pokemonDetails.name}
                </h2>
                <img
                  src={pokemonDetailsProps.sprites.front_default}
                  alt={pokemonDetailsProps.name}
                  title={pokemonDetailsProps.name}
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
                <SwipeableViews
                  index={tabValue}
                  onChangeIndex={handleChangeIndex}
                >
                  <PokemonEvolutions
                    value={tabValue}
                    isLoading={isLoading}
                    pokemonEvolutions={pokemonEvolutionsState}
                  />
                  {pokemonAreas ? (
                    <PokemonAreas
                      value={tabValue}
                      isLoading={isLoading}
                      pokemonAreas={pokemonAreas}
                    />
                  ) : (
                    <TabPanel value={tabValue} index={1} dir={"rtl"}>
                      Loading Pokemon Areas
                    </TabPanel>
                  )}
                  <PokemonAbilities
                    value={tabValue}
                    abilities={pokemonDetailsProps.abilities}
                  />
                </SwipeableViews>
                <Button className={classes.btnAddToMyFavorites}>
                  Add to My Favorites
                </Button>
              </React.Fragment>
            ) : (
              "Loading..."
            )}
          </Container>
        </Paper>
      }
    </React.Fragment>
  );
};
export default withRouter(React.memo(ViewPokemonDetailsContainer));
