import React, { useEffect, useState, useCallback } from "react";
import $ from "jquery";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { logout } from "../actions/securityActions";
import { useSelector, useDispatch } from "react-redux";
import Pokemon from "../components/Pokemon/Pokemon";
import {
  loadPokemons,
  clearPokemons,
  clearPokemonDetails,
  setPokemon,
} from "../actions/pokemonActions";
import { Button } from "@material-ui/core";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { IStore } from "../store/store";

type ShowPokemonsContainerParams = {
  page: string;
};
type ShowPokemonsContainerProps = RouteComponentProps<ShowPokemonsContainerParams>;
export const ShowPokemonsContainer: React.FC<ShowPokemonsContainerProps> = ({
  match,
  history,
}) => {
  const [pokemonsDetails, setPokemonsDetails] = useState<
    PokemonDetailsResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const totalPagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dispatch = useDispatch();
  const pokemonsDetailsProps = useSelector(
    (state: IStore) => state.pokemonsDetails.pokemonsDetails
  );
  const user = useSelector((state: IStore) => state.user);

  useEffect(() => {
    try {
      let page2 = 0;
      if (match.params.page) {
        page2 = parseInt(match.params.page);
        if (isNaN(page2) === false && page2 > 1) {
          setPokemonsCallback(page2);
          history.push("/pokemons/" + page2);
          setTimeout(() => {
            $("#page-item-" + page2).addClass("active");
          }, 1400);
        } else {
          setPokemonsCallback(0);
          setTimeout(() => {
            $("#page-item-1").addClass("active");
          }, 1400);
        }
      } else {
        $("#page-item-1").addClass("active");
        setPokemonsCallback(page2);
      }
      setInterval(() => {
        const currentTime = Date.now() / 1000;
        if (user && user.user && user.user.exp && user.user.exp < currentTime) {
          dispatch(logout());
          window.location.href = "/login";
        }
      }, 28800000);
    } catch (error) {
      console.error(
        "An error occurs in ShowPokemonsContainer.useEffect()",
        error
      );
    }
  }, []);
  const setPokemonsCallback = useCallback((page: number) => {
    setIsLoading(true);
    dispatch(clearPokemons());
    dispatch(clearPokemonDetails());
    dispatch(loadPokemons(page * 10));
    if (pokemonsDetailsProps && pokemonsDetailsProps.length > 9) {
      setPokemonsDetails(pokemonsDetailsProps);
      setIsLoading(false);
    }
  }, []);
  const getPage = (key: number, index: number) => {
    try {
      if ($(".page-nav").hasClass("active")) {
        $(".page-nav").removeClass("active");
      }
      setTimeout(() => {
        $("#page-item-" + index).addClass("active");
      }, 300);
      setPokemonsCallback(key);
    } catch (error) {
      console.error(
        "An error occurs in ShowDesserts.getPage() , but dont worry about it",
        error
      );
    }
  };
  useEffect(() => {
    setIsLoading(true);
    setPokemonsDetails(pokemonsDetailsProps as PokemonDetailsResponse[]);
    setIsLoading(false);
  }, [pokemonsDetails, isLoading, pokemonsDetailsProps]);

  const getPrevPage = () => {};
  const getNextPage = () => {};
  const viewPokemon = (pokemon: PokemonDetailsResponse) => {
    dispatch(setPokemon(pokemon as PokemonDetailsResponse));
    history.push("/pokemon/" + pokemon.name);
  };
  const getPagination = () => {
    return (
      <React.Fragment>
        <div
          style={{ textAlign: "center", margin: "0 auto" }}
          className="container"
        >
          <nav
            id="pagination-bottom"
            style={{ maxWidth: "580px", margin: "0 auto" }}
          >
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => getPrevPage()}
                  href="#previous"
                >
                  Previous
                </a>
              </li>
              {totalPagination.map((index: number, key: number) => (
                <li
                  className="page-item page-nav"
                  id={`page-item-${index}`}
                  key={key}
                >
                  <Link
                    to={`/pokemons/${index}`}
                    className="page-link"
                    onClick={() => getPage(key, index)}
                  >
                    {index}
                  </Link>
                </li>
              ))}
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => getNextPage()}
                  href="#next"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  };
  let currentTime = Date.now();
  const renderedPokemons =
    pokemonsDetails.length > 0 &&
    pokemonsDetails.map((pokemon: PokemonDetailsResponse, index: number) => (
      <div
        className="pokemon_container"
        key={
          (pokemon.name as string) +
          pokemon.id +
          "_" +
          currentTime +
          Math.random()
        }
      >
        <Pokemon details={pokemonsDetails[index]} />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => viewPokemon(pokemonsDetails[index])}
        >
          View Details
        </Button>
      </div>
    ));
  try {
    return (
      <div className="pokemons_container">
        {isLoading === false ? renderedPokemons : "Loading,please wait..."}
        {isLoading === false ? getPagination() : ""}
      </div>
    );
  } catch (error) {
    return (
      <React.Fragment>
        <h1>An error occurs</h1>
        <Link to={`/pokemons`} className="page-link">
          Dashboard
        </Link>
      </React.Fragment>
    );
  }
};

export default withRouter(ShowPokemonsContainer);
