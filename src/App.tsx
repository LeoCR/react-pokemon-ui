import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setJWTToken } from "./utils/setJWTToken";
import jwt_decode from "jwt-decode";
import Login from "./components/UserManagement/Login";
import Header from "./components/Layout/Header";
import { logout, setUserData } from "./actions/securityActions";
import { connect, useSelector, useDispatch } from "react-redux";
import { ShowPokemonsContainer } from "./containers/ShowPokemonsContainer";
import SecureRoute from "./components/Security/SecureRoute";
import ViewPokemonDetailsContainer from "./containers/ViewPokemonDetailsContainer";
import { IStore } from "./store/store";
import { Snackbar } from "@material-ui/core";
import { Alert } from "./components/Layout/Alert";
import SearchContainer from "./containers/SearchContainer";
interface AppProps {}
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
  const { error } = useSelector((state: IStore) => state.search);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  useEffect(() => {
    if (jwtToken) {
      setJWTToken(jwtToken);
      const decoded_jwtToken: AuthToken = jwt_decode<AuthToken>(jwtToken);
      dispatch(setUserData(decoded_jwtToken.toString()));
      const currentTime = Date.now() / 1000;
      if (decoded_jwtToken && decoded_jwtToken.exp < currentTime) {
        dispatch(logout());
        window.location.href = "/login";
      }
      setInterval(() => {
        if (decoded_jwtToken.exp < currentTime) {
          dispatch(logout());
          window.location.href = "/login";
        }
      }, 28800000);
    }
  }, []);
  return (
    <div className="app">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <React.Fragment></React.Fragment>}
          />
          <Route exact path="/login" component={Login} />
          <SecureRoute
            path="/pokemons/"
            exact
            component={ShowPokemonsContainer}
          />
          <SecureRoute
            path="/pokemons/:page"
            exact
            component={ShowPokemonsContainer}
          />
          <SecureRoute
            path="/pokemon/:pokemon"
            exact
            component={ViewPokemonDetailsContainer}
          />
          <SecureRoute path="/search" exact component={SearchContainer} />
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
export default connect(mapStateToProps, { logout })(App);
