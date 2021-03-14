import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SecureRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(SecureRoute);
