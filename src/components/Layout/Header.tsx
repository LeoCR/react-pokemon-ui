import React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { User } from "../../interfaces/Security.interface";
import { IStore } from "../../store/store";
import SearchForm from "./SearchForm";
import "./Header.css";

interface HeaderProps extends RouteComponentProps {
  user?: User;
  validToken: boolean;
}
const Header = (props: HeaderProps) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/pokemons">
                  Pokemons
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link " to="/pokemons/favorites">
                  <i className="fas.fa-user-circle.mr-1" />
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
