import React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { User } from "../../interfaces/Security.interface";
import { IStore } from "../../store/store";
import SearchForm from "./SearchForm";
import pokebalImage from "../../assets/img/original_pokeball.png";
import pokemonImage from "../../assets/img/free_bouncy_quilava.gif";
import "./Header.css";

interface HeaderProps extends RouteComponentProps {
  user?: User;
  validToken: boolean;
}
const Header = (props: HeaderProps) => {
  const [isNavOpen, setIsNavOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={
              isNavOpen === true
                ? " show collapse navbar-collapse"
                : "collapse navbar-collapse"
            }
            id="mobile-nav"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/pokemons">
                  <img
                    src={pokemonImage}
                    alt="Pokemons"
                    style={{ width: "30px" }}
                  />
                  Pokemons
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link " to="/pokemons/favorites">
                  <img
                    src={pokebalImage}
                    alt="Pokemons"
                    style={{ width: "30px" }}
                  />
                  My Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SearchForm {...props} />
    </React.Fragment>
  );
};
const mapStateToProps = (state: IStore) => ({
  user: state.user,
});
export default connect(mapStateToProps, null)(withRouter(Header));
