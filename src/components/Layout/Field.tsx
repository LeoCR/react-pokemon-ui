import React from "react";
import { TextField, makeStyles, TextFieldProps } from "@material-ui/core";

const useStyle = makeStyles({
  inputTextField: {
    width: "100%",
    float: "left",
    background: "#fff",
    "&::-ms-clear": {
      display: "none",
    },
  },
});

export const Field = (props: TextFieldProps) => {
  const classes = useStyle();
  return (
    <TextField
      {...props}
      className={classes.inputTextField}
      variant="outlined"
    />
  );
};
export default Field;
