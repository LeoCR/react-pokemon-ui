import { Paper, Container, AppBar, Tabs, Tab, Button } from "@material-ui/core";
import React, { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter,useLocation } from "react-router-dom";
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
import { RouteComponentProps } from 'react-router';
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { PokemonLocationAreasResponse } from "../interfaces/PokemonLocationAreas.interface";
import { PokemonEvolutionChain,EvolvesTo } from "../interfaces/PokemonEvolutions.interface";
import { IStore } from "../store/store";
import PokemonAbilities from "../components/Pokemon/PokemonAbilities";

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

type ViewPokemonDetailsContainerParams = {
  pokemon: string
};
type ViewPokemonDetailsContainerProps = RouteComponentProps<ViewPokemonDetailsContainerParams>;
const ViewPokemonDetailsContainer : React.FC<ViewPokemonDetailsContainerProps> = ({
  match,
  location,
  history
}) => {
  const dispatch = useDispatch();
  const pokemonDetailsProps = useSelector(
    (state: IStore) => state.pokemons.pokemon
  ); 
  const classes = useStyles();
  const [pokemonDetails, setPokemonState] = useState<PokemonDetailsResponse>({
    name: '',
    id:1,
    sprites: {
      front_default: null,
    },
  });
  let [pokemonEvolutionsState, setPokemonEvolutionsState] = useState<PokemonDetailsResponse[]>([]);
  let [isLoading, setIsLoading] = useState(true);
  let [pokemonAreas, setPokemonAreas] = useState<PokemonLocationAreasResponse[]>();
  let [value, setValue] = React.useState(0);
  useEffect(() => {
    try {
      if (pokemonDetailsProps&&pokemonDetailsProps.name) {
        const pokemonName=(pokemonDetailsProps.name as string).toString().toLowerCase();
        fetchPokemonAreas(pokemonName).then((res) => { 
          setPokemonAreas(res as PokemonLocationAreasResponse[]);
        });
      }
    } catch (error) {
      console.error(
        "An error occurs in ViewPokemonDetailsContainer useEffect(()=>{},[pokemonDetailsProps])",
        error
      );
    }
  }, [pokemonDetailsProps]);
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const onClickBack = () => {
    history.go(-1);
  };
  const fetchPokemonDetailsCallback= useCallback(async()=>{
    try {
      await fetchPokemonDetails(match.params.pokemon)
        .then((res) => {
          dispatch(setPokemon(res as PokemonDetailsResponse));
          setPokemonState(res as PokemonDetailsResponse);
        })
        .catch((error: Error) => {
          console.error("An error occurs fetchPokemonDeatils",error);
        });
        await fetchPokemonEvolutionsChainURL(match.params.pokemon).then(
        async(res) => {
        await fetchPokemonEvolutions(res)
            .then((resChainURL: PokemonEvolutionChain) => {
              console.log('resChainURL',resChainURL)
              setTimeout(async() => {
                let pokemons = [];
                if (resChainURL.chain !== undefined) {
                  if (resChainURL.chain.evolves_to !== undefined) {
                    if (
                      Array.isArray(resChainURL.chain.evolves_to) &&
                      resChainURL.chain.evolves_to.length
                    ) {
                      if(resChainURL&&resChainURL.chain&&resChainURL.chain.evolves_to){
                        const chainEvolves:EvolvesTo[]=resChainURL.chain.evolves_to;
                        chainEvolves.map((evolution: EvolvesTo) => { 
                            try {
                              if (evolution.evolves_to&&evolution.evolves_to[0]&&evolution.evolves_to[0].species&&evolution.evolves_to[0].species.name ) {
                                pokemons.push(
                                  evolution.evolves_to[0].species.name
                                );
                              }
                            } catch (error) {
                              console.error(
                                "An error occurs inside resChainURL.chain.evolves_to.map",
                                error
                              );
                            } finally {
                              if (evolution.species&&evolution.species.name) {
                                pokemons.push(evolution.species.name);
                              }
                            } 
                        });
                      }
                      
                      try {
                        if (resChainURL&&resChainURL.chain&&resChainURL.chain.species&&resChainURL.chain.species.name) {
                          pokemons.push(resChainURL.chain.species.name);
                        }
                      } catch (error) {
                        console.error(
                          "An error occurs inside fetchPokemonEvolutions",
                          error
                        );
                      }
                      let tempPokemons: PokemonDetailsResponse[] = [];
                      for (
                        let indexPokemon = 0;
                        indexPokemon < pokemons.length;
                        indexPokemon++
                      ) {
                        await fetchPokemonDetails(pokemons[indexPokemon])
                          .then((res) => {
                            tempPokemons.push(res as PokemonDetailsResponse);
                          })
                          .catch((err) => {
                            console.error("An error occurs in useEffect(()=>{ fetchPokemonEvolutionsChainURL.fetchPokemonDetails },[])",err);
                          });
                      }
                      dispatch(setPokemonEvolutions(tempPokemons));
                      setPokemonEvolutionsState(tempPokemons);
                    }
                  }
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 700);
                }
              }, 300);
            })
            .catch((e: Error) => {
              console.error(
                "An error occurs inside ViewPokemonDetailsContainer Components in fetchPokemonEvolutions",e);
            });
        }
      );
    } catch (error) {
      console.error(
        "An error occurs inside ViewPokemonDetailsContainer in useEffect ",error)
    }
  },[])
  useEffect(() => {
    if (match&&match.params&&match.params.pokemon) {
      fetchPokemonDetailsCallback()
    }
  }, [fetchPokemonDetailsCallback]);
  try {
    const hasPokemons=(pokemonDetails&& pokemonDetailsProps&&pokemonDetailsProps.sprites && pokemonDetailsProps.sprites.front_default&& pokemonDetailsProps.name && pokemonDetails.sprites && pokemonDetails.sprites.front_default);
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
        <Paper className={classes.paperDetails}>
          <Container maxWidth="sm" style={{ padding: "30px 0px" }}>
            {(hasPokemons&&pokemonDetailsProps&&pokemonDetailsProps.sprites&&pokemonDetailsProps.sprites.front_default&&pokemonDetailsProps.name) ? (
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
                    value={value}
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
                <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                  <PokemonEvolutions
                    value={value}
                    isLoading={isLoading}
                    pokemonEvolutions={pokemonEvolutionsState}
                  />
                  {
                    (pokemonAreas)?(<PokemonAreas
                      value={value}
                      isLoading={isLoading}
                      pokemonAreas={pokemonAreas}
                    />):<TabPanel value={value} index={1} dir={"rtl"}>
                    Loading Pokemon Areas 
                  </TabPanel>
                  }
                  <PokemonAbilities value={value} abilities={pokemonDetailsProps.abilities}/>
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
      </React.Fragment>
    );
  } catch (error) {
    return (
      <React.Fragment>
        <Link to="/dashboard">
          <Button
            variant="contained"
            color="secondary"
            className={classes.btnBack}
          >
            Back
          </Button>
        </Link>
        <Paper style={{ padding: "30px 90px" }}>An Error Occurs. {error}</Paper>
      </React.Fragment>
    );
  }
};
export default withRouter(ViewPokemonDetailsContainer);
