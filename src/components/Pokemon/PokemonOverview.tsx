/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { Button } from "@mui/material";
import { PokemonDetailsResponse } from "../../interfaces/PokemonDetails.interface";
import Pokemon from "./Pokemon";
import { useDispatch, useSelector } from "react-redux";
import { deletePokemon } from "../../actions/favoriteActions";
import { Dialog } from "../Layout/Dialog";
import { IStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

export type PokemonFavoritesContainerParams = {};

export interface PokemonOverviewProps {
  pokemon: PokemonDetailsResponse;
  viewPokemon(pokemon: PokemonDetailsResponse): void;
  hasDelete?: boolean;
}
const PokemonOverview: React.FC<PokemonOverviewProps> = (
  props: PokemonOverviewProps
) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const favoritesProps = useSelector((state: IStore) => state.favorites.names);

  const callback = () => {
    dispatch(deletePokemon(props.pokemon.name as string));
    setIsOpen(!isOpen);
    history("/react-pokemon-ui/pokemons");
  };
  return useMemo(
    () => (
      <div className="pokemon_container" key={props.pokemon.name as string}>
        <Pokemon details={props.pokemon} />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.viewPokemon(props.pokemon)}
          className="btn_overview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            className="bi bi-info-circle-fill"
            viewBox="0 0 16 16"
            style={{ margin: "0 10px" }}
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
          Details
        </Button>
        {props.hasDelete === true ? (
          <>
            <Button
              variant="contained"
              className="btn_overview"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-archive"
                viewBox="0 0 16 16"
                style={{ margin: "0 10px" }}
              >
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              </svg>
              Delete
            </Button>
            <Dialog
              isOpen={isOpen}
              setOpen={setIsOpen}
              callback={callback}
              pokemonName={props.pokemon.name as string}
              message={`If you agree, you are going to delete ${
                props.pokemon.name as string
              } from your list of favorites`}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    ),
    [
      JSON.stringify(props.pokemon),
      JSON.stringify(favoritesProps),
      isOpen,
      setIsOpen,
      callback,
      history,
    ]
  );
};
export default PokemonOverview;
