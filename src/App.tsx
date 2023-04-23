/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect, useSelector, useDispatch } from "react-redux";
import { ShowPokemonsContainer } from "./containers/ShowPokemonsContainer";
import ViewPokemonDetailsContainer from "./containers/ViewPokemonDetailsContainer";
import { IStore } from "./store/store";
import "./App.css";
import { setJWTToken } from "./utils/setJWTToken";
import { logout, setUserData } from "./actions/securityActions";
import Login from "./components/UserManagement/Login";
import Header from "./components/Layout/Header";

import SearchContainer from "./containers/SearchContainer";

interface AppProps {
  user: {
    validToken: boolean;
  };
}
interface AuthToken {
  name: string;
  exp: number;
}
const jwtToken =
  localStorage.getItem("jwtToken") !== undefined
    ? localStorage.getItem("jwtToken")
    : null;

export const App: React.FC<AppProps> = (props: AppProps) => {
  const dispatch = useDispatch();
  const { error, severity, message } = useSelector(
    (state: IStore) => state.search
  );
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    if (message) {
      if (severity === "error" || severity === "success") {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [message, error]);
  React.useEffect(() => {
    if (jwtToken) {
      setJWTToken(jwtToken);
      const decoded_jwtToken: AuthToken = jwt_decode<AuthToken>(jwtToken);
      dispatch(setUserData(decoded_jwtToken.toString()));
      const currentTime = Date.now() / 1000;
      if (decoded_jwtToken && decoded_jwtToken.exp < currentTime) {
        dispatch(logout());
      }
    }
  }, []);
  return (
    <div className="app">
      <Snackbar
        open={severity === "warning" ? false : open}
        autoHideDuration={6000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Router>
        <Header validToken={props.user.validToken} />
        <Switch>
          <Route path="/" exact component={ShowPokemonsContainer} />
          <Route path="/pokemons" exact component={ShowPokemonsContainer} />
          <Route
            path="/pokemons/:page"
            exact
            component={ShowPokemonsContainer}
          />
          <Route
            path="/pokemon/:pokemon"
            exact
            component={ViewPokemonDetailsContainer}
          />
          <Route path="/search" exact component={SearchContainer} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};
const mapStateToProps = (state: IStore) => ({
  user: state.user,
  pokemons: state.pokemons.pokemons,
  pokemonsDetails: state.pokemonsDetails.pokemonsDetails,
});
export default connect(mapStateToProps, { logout })(App as React.FC);
