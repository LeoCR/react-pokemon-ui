import React from "react";
import {
  Dialog as MUIDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DialogProps } from "../../types/Dialog.types";
import { useDispatch } from "react-redux";
import { addPokemonToFavorites } from "../../actions/favoriteActions";

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  setOpen,
  pokemonName,
  message,
  callback,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const addPokemon = (pokemon: string) => {
    console.log("addPokemon", pokemon);
    dispatch(addPokemonToFavorites(pokemon));
  };

  return (
    <>
      <MUIDialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Are you Sure? `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message !== undefined
              ? message
              : ` If you agree ${pokemonName} will be inserted in your list of
            favorites`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={() => {
              if (typeof callback === "function") {
                return callback();
              } else {
                addPokemon(pokemonName);
                handleClose();
              }
            }}
            variant="contained"
          >
            Agree
          </Button>
        </DialogActions>
      </MUIDialog>
    </>
  );
};
