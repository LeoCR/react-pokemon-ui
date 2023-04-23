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

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  setOpen,
  pokemonName,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
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
            If you agree {pokemonName} will be inserted in your list of
            favorites
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button onClick={handleClose} variant="contained">
            Agree
          </Button>
        </DialogActions>
      </MUIDialog>
    </>
  );
};
