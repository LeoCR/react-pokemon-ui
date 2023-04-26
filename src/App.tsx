/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy } from "react";
import { Alert, Snackbar } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import jwt_decode from "jwt-decode";
import { connect, useSelector, useDispatch } from "react-redux";
import ViewPokemonDetailsContainer from "./containers/ViewPokemonDetailsContainer";
import { IStore } from "./store/store";
import "./App.css";
import { setJWTToken } from "./utils/setJWTToken";
import { logout, setUserData } from "./actions/securityActions";
import Header from "./components/Layout/Header";
import SearchContainer from "./containers/SearchContainer";
import { PokemonFavoritesContainer } from "./containers/PokemonFavoritesContainer";
import { Footer } from "./components/Layout/Footer";
import { Preloader } from "./components/Layout/Preloader";

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

const ShowPokemonsContainer = lazy(
  () => import("./containers/ShowPokemonsContainer")
);

export const App: React.FC<AppProps> = (props: AppProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
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
    <>
      <main className="app">
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
        <>
          <Header validToken={props.user.validToken} />
        </>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/pokemons/favorites"
              element={<PokemonFavoritesContainer />}
            />
            <Route
              path="/react-pokemon-ui/pokemons/favorites"
              element={<PokemonFavoritesContainer />}
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<Preloader />}>
                  <ShowPokemonsContainer />
                </Suspense>
              }
            />
            <Route
              path="/react-pokemon-ui/"
              element={
                <Suspense fallback={<Preloader />}>
                  <ShowPokemonsContainer />
                </Suspense>
              }
            />
            <Route
              path="/react-pokemon-ui/pokemons"
              element={
                <Suspense fallback={<Preloader />}>
                  <ShowPokemonsContainer />
                </Suspense>
              }
            />
            <Route
              path="/pokemons"
              element={
                <Suspense fallback={<Preloader />}>
                  <ShowPokemonsContainer />
                </Suspense>
              }
            />
            <Route
              path="/pokemons/:page"
              element={
                <Suspense fallback={<Preloader />}>
                  <ShowPokemonsContainer />
                </Suspense>
              }
            />
            <Route
              path="/react-pokemon-ui/pokemons/:page"
              element={
                <Suspense fallback={<Preloader />}>
                  <ShowPokemonsContainer />
                </Suspense>
              }
            />
            <Route
              path="/pokemon/:pokemon"
              element={<ViewPokemonDetailsContainer />}
            />
            <Route
              path="/react-pokemon-ui/pokemon/:pokemon"
              element={<ViewPokemonDetailsContainer />}
            />
            <Route
              path="/react-pokemon-ui/search"
              element={<SearchContainer />}
            />
            <Route path="/search" element={<SearchContainer />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};
const mapStateToProps = (state: IStore) => ({
  user: state.user,
  pokemons: state.pokemons.pokemons,
  pokemonsDetails: state.pokemonsDetails.pokemonsDetails,
});
export default connect(mapStateToProps, { logout })(App as React.FC);
