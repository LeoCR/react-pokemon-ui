import React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={0} variant="filled" {...props} />;
};
