/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import $ from "jquery";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadPokemons,
  clearPokemons,
  clearPokemonDetails,
  setPokemon,
} from "../actions/pokemonActions";
import { PokemonDetailsResponse } from "../interfaces/PokemonDetails.interface";
import { IStore } from "../store/store";
import PokemonOverview from "../components/Pokemon/PokemonOverview";
import { ShowPokemonsContainerProps } from "../types/ShowPoemonsContainer.types";

export const ShowPokemonsContainer: React.FC<ShowPokemonsContainerProps> = ({
  match,
  history,
}) => {
  const [pokemonsDetails, setPokemonsDetails] = useState<
    PokemonDetailsResponse[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPagination, setTotalPagination] = useState<Array<number>>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);
  const dispatch = useDispatch();
  const pokemonsDetailsProps = useSelector(
    (state: IStore) => state.pokemonsDetails.pokemonsDetails
  );
  useEffect(() => {
    try {
      let page2 = 0;
      if (match.params.page) {
        page2 = parseInt(match.params.page);
        if (isNaN(page2) === false && page2 > 1) {
          setPokemonsCallback(page2);
          if (totalPagination.includes(page2)) {
            setTimeout(() => {
              $("#page-item-" + page2).addClass("active");
            }, 1400);
          } else {
            if (localStorage.getItem("pagination") !== null) {
              const newPagination = [];
              const tempPagination = JSON.parse(
                localStorage.getItem("pagination")!
              );
              if (tempPagination && tempPagination.length > 0) {
                for (let index = 0; index < tempPagination.length; index++) {
                  newPagination.push(Number(tempPagination[index]));
                }
                setTotalPagination(newPagination as Array<number>);
                setTimeout(() => {
                  $("#page-item-" + page2).addClass("active");
                }, 1400);
              }
            }
          }
          if (page2 > 0) {
            history.push("/pokemons/" + page2);
          }
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
    } catch (error) {
      console.error(
        "An error occurs in ShowPokemonsContainer.useEffect()",
        error
      );
    }
  }, []);
  const setPokemonsCallback = useCallback((page: number) => {
    dispatch(clearPokemons());
    dispatch(clearPokemonDetails());
    dispatch(loadPokemons(page * 10));
    if (pokemonsDetailsProps && pokemonsDetailsProps.length > 9) {
      setPokemonsDetails(pokemonsDetailsProps);
    }
  }, []);
  const setPagination = (index: number) => {
    const newPagination = [];
    if (index === totalPagination[10]) {
      newPagination.push(index);
      let ind = index + 1;
      do {
        newPagination.push(ind);
        ind++;
      } while (ind <= totalPagination[10] + 10);
      setTotalPagination(newPagination);
      localStorage.setItem("pagination", JSON.stringify(newPagination));
    }
    if (
      (index === totalPagination[0] && index >= 11) ||
      (index < totalPagination[0] && !totalPagination.includes(index))
    ) {
      for (
        let newIndex = totalPagination[0] - 10;
        newIndex <= totalPagination[0];
        newIndex++
      ) {
        if (newIndex > 0) {
          newPagination.push(newIndex);
        }
      }
      setTotalPagination(newPagination);
      localStorage.setItem("pagination", JSON.stringify(newPagination));
    }
  };
  const getPage = (index: number) => {
    try {
      setPagination(index);
      if (index <= 0) {
        return;
      }
      if ($(".page-nav").hasClass("active")) {
        $(".page-nav").removeClass("active");
      }
      setTimeout(() => {
        $("#page-item-" + index).addClass("active");
      }, 300);
      setCurrentPage(index);
      setPokemonsCallback(index);
    } catch (error) {
      console.error(
        "An error occurs in ShowDesserts.getPage() , but dont worry about it",
        error
      );
    }
  };
  useEffect(() => {
    setPokemonsDetails(pokemonsDetailsProps as PokemonDetailsResponse[]);
  }, [JSON.stringify(pokemonsDetails), JSON.stringify(pokemonsDetailsProps)]);
  const viewPokemon = (pokemon: PokemonDetailsResponse) => {
    dispatch(setPokemon(pokemon as PokemonDetailsResponse));
    if (pokemon.name) {
      history.push("/pokemon/" + pokemon.name);
    }
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
            style={{ maxWidth: "580px", margin: "10px auto" }}
          >
            <ul className="pagination">
              <li className="page-item">
                <Link
                  to={`/pokemons/${currentPage - 1 > 0 ? currentPage - 1 : 1}`}
                  className="page-link"
                  onClick={() => getPage(currentPage - 1)}
                >
                  Previous
                </Link>
              </li>
              {totalPagination.length > 0
                ? totalPagination.map((index: number, key: number) => (
                    <li
                      className="page-item page-nav"
                      id={`page-item-${index}`}
                      key={key}
                    >
                      <Link
                        to={`/pokemons/${index}`}
                        className="page-link"
                        onClick={() => getPage(index)}
                      >
                        {index}
                      </Link>
                    </li>
                  ))
                : ""}
              <li className="page-item">
                <Link
                  to={`/pokemons/${currentPage + 1}`}
                  className="page-link"
                  onClick={() => getPage(currentPage + 1)}
                >
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  };

  return useMemo(
    () => (
      <div className="pokemons_container">
        {pokemonsDetails.length > 0 ? (
          <>
            {pokemonsDetails
              .filter(
                (pokemon: PokemonDetailsResponse, index: number) =>
                  index ===
                  pokemonsDetails.findIndex(
                    (other) => pokemon.name === other.name
                  )
              )
              .map((pokemon: PokemonDetailsResponse, index: number) => (
                <PokemonOverview
                  key={pokemon.name}
                  pokemon={pokemonsDetails[index]}
                  viewPokemon={() =>
                    viewPokemon(
                      pokemonsDetails[index] as PokemonDetailsResponse
                    )
                  }
                />
              ))}
            {getPagination()}
          </>
        ) : (
          <>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading , please wait...</span>
            </div>
            <div className="spinner-grow text-success" role="status"></div>
            <div className="spinner-grow text-primary" role="status"></div>
          </>
        )}
      </div>
    ),
    [JSON.stringify(pokemonsDetails)]
  );
};

export default withRouter(ShowPokemonsContainer);
