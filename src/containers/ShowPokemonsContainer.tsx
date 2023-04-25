/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Preloader } from "../components/Layout/Preloader";
import { motion } from "framer-motion";

export const ShowPokemonsContainer: React.FC = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(
    page !== undefined ? Number(page) : 1
  );
  const [totalPagination, setTotalPagination] = useState<Array<number>>(
    localStorage.getItem("pagination") !== null
      ? (JSON.parse(localStorage.getItem("pagination")!) as Array<number>)
      : [1, 2, 3, 4, 5]
  );
  const dispatch = useDispatch();
  const { pokemonsDetails: pokemonsDetailsProps, isLoading } = useSelector(
    (state: IStore) => state.pokemonsDetails
  );
  useEffect(() => {
    try {
      let page2 = 0;
      if (page) {
        page2 = parseInt(page);
        if (isNaN(page2) === false && page2 > 1) {
          setPokemonsCallback(page2);
          if (totalPagination.includes(page2)) {
            setTimeout(() => {
              document
                .querySelector("#page-item-" + page2)
                ?.classList.add("active");
            }, 1800);
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
                  document
                    .querySelector("#page-item-" + page2)
                    ?.classList.add("active");
                }, 1900);
              }
            }
          }
          if (page2 > 0) {
            navigate("/react-pokemon-ui/pokemons/" + page2);
          }
        } else {
          setPokemonsCallback(0);
          setTimeout(() => {
            document.querySelector("#page-item-1")?.classList.add("active");
          }, 1900);
        }
      } else {
        document.querySelector("#page-item-1")?.classList.add("active");
        setPokemonsCallback(page2);
        setTotalPagination([1, 2, 3, 4, 5]);
        localStorage.setItem("pagination", JSON.stringify([1, 2, 3, 4, 5]));
      }
    } catch (error) {
      console.error(
        "An error occurs in ShowPokemonsContainer.useEffect()",
        error
      );
    }
    return () => {
      dispatch(clearPokemons());
      dispatch(clearPokemonDetails());
    };
  }, []);
  const setPokemonsCallback = (page: number) => {
    dispatch(clearPokemons());
    dispatch(clearPokemonDetails());
    dispatch(loadPokemons(page * 10));
  };
  const setPagination = (index: number) => {
    const newPagination = [];
    if (index === totalPagination[4]) {
      newPagination.push(index);
      let ind = index + 1;
      do {
        newPagination.push(ind);
        ind++;
      } while (ind <= totalPagination[4] + 4);
      setTotalPagination(newPagination);
      localStorage.setItem("pagination", JSON.stringify(newPagination));
    }
    if (
      (index === totalPagination[0] && index >= 5) ||
      (index < totalPagination[0] && !totalPagination.includes(index))
    ) {
      for (
        let newIndex = totalPagination[0] - 4;
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
      if (
        document.querySelector("#page-item-1")?.classList.contains("active")
      ) {
        document.querySelector("#page-item-1")?.classList.remove("active");
      }
      setTimeout(() => {
        document.querySelector("#page-item-" + index)?.classList.add("active");
      }, 1800);
      setCurrentPage(index);
      setPokemonsCallback(index);
    } catch (error) {
      console.error(
        "An error occurs in ShowDesserts.getPage() , but dont worry about it",
        error
      );
    }
  };

  const viewPokemon = (pokemon: PokemonDetailsResponse) => {
    dispatch(setPokemon(pokemon as PokemonDetailsResponse));
    if (pokemon.name) {
      navigate("/react-pokemon-ui/pokemon/" + pokemon.name);
    }
  };

  return useMemo(
    () => (
      <motion.div
        className="pokemons_container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          transition: {
            duration: 0.4,
          },
        }}
      >
        {pokemonsDetailsProps &&
        pokemonsDetailsProps?.length > 0 &&
        isLoading === false ? (
          <div id="pokemons_list">
            {pokemonsDetailsProps
              .filter(
                (pokemon: PokemonDetailsResponse, index: number) =>
                  index ===
                  pokemonsDetailsProps.findIndex(
                    (other) => pokemon.name === other.name
                  )
              )
              .map((pokemon: PokemonDetailsResponse, index: number) => (
                <PokemonOverview
                  key={pokemon.name}
                  pokemon={pokemonsDetailsProps[index]}
                  viewPokemon={() =>
                    viewPokemon(
                      pokemonsDetailsProps[index] as PokemonDetailsResponse
                    )
                  }
                />
              ))}
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
                        to={`/react-pokemon-ui/pokemons/${
                          currentPage - 1 > 0 ? currentPage - 1 : 1
                        }`}
                        className="page-link"
                        onClick={() => getPage(currentPage - 1)}
                      >
                        Prev
                      </Link>
                    </li>
                    {totalPagination?.length > 0
                      ? totalPagination.map((index: number, key: number) => (
                          <li
                            className="page-item page-nav"
                            id={`page-item-${index}`}
                            key={key}
                          >
                            <Link
                              to={`/react-pokemon-ui/pokemons/${index}`}
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
                        to={`/react-pokemon-ui/pokemons/${currentPage + 1}`}
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
          </div>
        ) : (
          <div>
            <Preloader />
          </div>
        )}
      </motion.div>
    ),
    [
      JSON.stringify(pokemonsDetailsProps),
      pokemonsDetailsProps?.length,
      isLoading,
    ]
  );
};

export default ShowPokemonsContainer;
