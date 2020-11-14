import { Paper, Container, AppBar, Tabs, Tab, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { setPokemon, setPokemonEvolutions } from "../actions/pokemonActions";
import {
  fetchPokemonDeatils,
  fetchPokemonEvolutionsChainURL,
  fetchPokemonEvolutions,
} from "../api/apiPokemon";
import SwipeableViews from "react-swipeable-views";
import { useStyles } from "./ViewPokemonDetailsContainer.style";
import TabPanel from "../components/Layout/TabPane";
import PokemonEvolutions from "../components/Pokemon/PokemonEvolutions";

const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};
const ViewPokemonDetailsContainer = (props: any) => {
  const dispatch = useDispatch();
  const pokemonDetailsProps = useSelector(
    (state: any) => state.pokemons.pokemon
  );
  const classes = useStyles();
  const [pokemonDetails, setPokemonState] = useState({
    name: null,
    sprites: {
      front_default: null,
    },
  });
  const [pokemonEvolutionsState, setPokemonEvolutionsState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const onClickBack = () => {
    props.history.push({
      pathname: props.location.state.from,
    });
  };
  useEffect(() => {
    if (props.match.params.pokemon !== null) {
      try {
        fetchPokemonDeatils(props.match.params.pokemon)
          .then((res: any) => {
            dispatch(setPokemon(res));
            setPokemonState(res);
          })
          .catch((error: any) => {
            console.log("An error occurs fetchPokemonDeatils");
            console.log(error);
          });
        fetchPokemonEvolutionsChainURL(props.match.params.pokemon).then(
          (res: any) => {
            fetchPokemonEvolutions(res)
              .then((resChainURL: any) => {
                console.log(resChainURL);
                setTimeout(() => {
                  let pokemons = [];
                  if (resChainURL.chain !== undefined) {
                    if (resChainURL.chain.evolves_to !== undefined) {
                      if (
                        Array.isArray(resChainURL.chain.evolves_to) &&
                        resChainURL.chain.evolves_to.length
                      ) {
                        resChainURL.chain.evolves_to.map((evolution: any) => {
                          try {
                            if (
                              evolution.evolves_to[0].species.name !== undefined
                            ) {
                              pokemons.push(
                                evolution.evolves_to[0].species.name
                              );
                            }
                          } catch (error) {
                            console.log(
                              "An error occurs inside resChainURL.chain.evolves_to.map",
                              error
                            );
                          } finally {
                            if (evolution.species.name !== undefined) {
                              pokemons.push(evolution.species.name);
                            }
                          }
                        });
                        try {
                          if (resChainURL.chain.species.name !== undefined) {
                            pokemons.push(resChainURL.chain.species.name);
                          }
                        } catch (error) {
                          console.log(
                            "An error occurs inside fetchPokemonEvolutions",
                            error
                          );
                        }
                        let tempPokemons: any = [];
                        for (
                          let indexPokemon = 0;
                          indexPokemon < pokemons.length;
                          indexPokemon++
                        ) {
                          fetchPokemonDeatils(pokemons[indexPokemon])
                            .then((res) => {
                              tempPokemons.push(res);
                            })
                            .catch((err) => {
                              console.log(err);
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
              .catch((e: any) => {
                console.log(
                  "An error occurs inside ViewPokemonDetailsContainer Components in fetchPokemonEvolutions"
                );
                console.log(e);
              });
          }
        );
      } catch (error) {
        console.log(
          "An error occurs inside ViewPokemonDetailsContainer in useEffect "
        );
      }
    }
  }, []);
  try {
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
            {pokemonDetails !== null &&
            pokemonDetails.sprites.front_default !== undefined ? (
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
                  <TabPanel value={value} index={1} dir={"rtl"}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={"rtl"}>
                    Item Three
                  </TabPanel>
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
