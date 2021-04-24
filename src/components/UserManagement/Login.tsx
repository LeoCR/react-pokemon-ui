import React from "react";
import { connect } from "react-redux";
import { Container, FormControl, Button } from "@material-ui/core";
import { loginByEmail, loginByUsername } from "../../actions/securityActions";
import isEmail from "../../utils/isEmail";
import Field from "../Layout/Field";
import {
  LoginRequestByEmail,
  LoginRequestByUsername,
  User,
} from "../../interfaces/Security.interface";
import { IStore } from "../../store/store";

interface LoginProps {
  user?: User;
  onLogin?: () => void;
  loginByEmail: (LoginRequest: LoginRequestByEmail) => void;
  loginByUsername: (LoginRequest: LoginRequestByUsername) => void;
  history: {
    push: (url: string) => void;
  };
}

interface LoginState {
  usernameOrEmail: string;
  password: string;
  errorsUsernameOrEmail: string;
  errorsPassword: string;
  formSent: boolean;
}

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      usernameOrEmail: "",
      password: "",
      errorsUsernameOrEmail: "",
      errorsPassword: "",
      formSent: false,
    };
  }
  onTexFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var inputName = e.target.name;
    if (inputName === "usernameOrEmail") {
      this.setState({
        usernameOrEmail: e.target.value,
      });
      if (e.target.value.length < 5) {
        this.setState({
          errorsUsernameOrEmail:
            "The username should have more than 5 characters",
        });
      }
    } else if (inputName === "password") {
      this.setState({
        password: e.target.value,
      });
      if (e.target.value.length < 5) {
        this.setState({
          errorsPassword: "The Password should have more than 5 characters",
        });
      }
    }
  };
  onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const LoginRequestByUsername = {
      username: this.state.usernameOrEmail,
      password: this.state.password,
    };
    const LoginRequestByEmail = {
      email: this.state.usernameOrEmail,
      password: this.state.password,
    };
    if (this.state.usernameOrEmail.length > 5) {
      this.setState({
        errorsUsernameOrEmail: "",
      });
    } else if (this.state.usernameOrEmail.length < 5) {
      this.setState({
        errorsUsernameOrEmail:
          "The username should have more than 5 characters",
      });
    }
    if (this.state.password.length < 5) {
      this.setState({
        errorsPassword: "The Password should have more than 5 characters",
      });
    } else if (this.state.password.length > 5) {
      this.setState({
        errorsPassword: "",
      });
    }
    if (
      this.state.errorsPassword === "" &&
      this.state.errorsUsernameOrEmail === ""
    ) {
      if (isEmail(this.state.usernameOrEmail)) {
        this.props.loginByEmail(LoginRequestByEmail);
      } else {
        this.props.loginByUsername(LoginRequestByUsername);
      }
      setTimeout(() => {
        if (this.props.user && this.props.user.validToken) {
          this.props.history.push("/pokemons");
        }
      }, 300);
    }
  };
  componentDidMount() {
    if (this.props.user && this.props.user.validToken) {
      this.props.history.push("/pokemons");
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.user && !this.props.user.validToken ? (
          <Container maxWidth="sm" id="container_login">
            <FormControl>
              <Field
                label="Username or Email"
                margin="normal"
                name="usernameOrEmail"
                onChange={this.onTexFieldChange}
              />
              {this.state.errorsUsernameOrEmail !== "" ? (
                <span className="error_msg">
                  {this.state.errorsUsernameOrEmail}
                </span>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl>
              <Field
                label="Password"
                type="password"
                margin="normal"
                name="password"
                onChange={this.onTexFieldChange}
              />
              {this.state.errorsPassword !== "" ? (
                <span className="error_msg">{this.state.errorsPassword}</span>
              ) : (
                ""
              )}
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              className="login_button"
              onClick={this.onLogin}
            >
              Login
            </Button>
          </Container>
        ) : (
          <p style={{textAlign:'center',width:'100%',margin:'0 auto',paddingTop:'60px'}}>Loading</p>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state: IStore) => ({
  user: state.user,
});
export default connect(mapStateToProps, { loginByEmail, loginByUsername })(
  Login
);
