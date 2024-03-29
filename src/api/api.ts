import axios from "axios";
import jwt_decode from "jwt-decode";
import { setJWTToken } from "../utils/setJWTToken";
import {
  LoginRequestByEmail,
  LoginRequestByUsername,
} from "../interfaces/Security.interface";

export const api = axios.create({
  baseURL: "http://localhost:49840",
  responseType: "json",
});

export const loginByEmailRequest =
  (LoginRequest: LoginRequestByEmail) => async () => {
    let response;
    //post => Login Request
    await api
      .post("/api/login/byEmail", LoginRequest)
      .then((res) => {
        //extract token from res.data
        const { token } = res.data;
        //store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        //set our token in the header
        setJWTToken(token);
        //decode token on React
        response = jwt_decode(token);
        //dispatch to our securityReducer
        return response;
      })
      .catch((err: Error) => {
        return err;
      });
    return response;
  };
export const loginByUsernameRequest =
  (LoginRequest: LoginRequestByUsername) => async () => {
    let response;
    //post => Login Request
    await api
      .post("/api/login/byUsername", LoginRequest)
      .then((res) => {
        //extract token from res.data
        const { token } = res.data;
        //store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        //set our token in the header
        setJWTToken(token);
        //decode token on React
        response = jwt_decode(token);
        return response;
      })
      .catch((err: Error) => {
        return err;
      });
    return response;
  };
