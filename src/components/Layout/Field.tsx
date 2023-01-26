import React from "react";
import { TextField, TextFieldProps } from "@mui/material";



export const Field = (props: TextFieldProps) => {

  return (
    <TextField
      {...props}
      style={{
        width: "100%",
        float: "left",
        background: "#fff",
        /* "&::-ms-clear": {
          display: "none",
        }, */
      }}
      variant="outlined"
    />
  );
};
export default Field;
