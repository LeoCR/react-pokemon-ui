import React,{useEffect} from 'react'; 
import './App.css'; 
import {BrowserRouter as Router,Route,Switch } from "react-router-dom";
import {setJWTToken} from "./utils/setJWTToken"
import ShowPokemons from "./containers/ShowPokemons";
import jwt_decode from "jwt-decode";
import Login from './components/UserManagement/Login';
//import { setUserData } from './actions/securityActions';

interface Props {  
}
const jwtToken=localStorage.getItem('jwtToken');

export const App: React.FC<Props> = (props) => {
   useEffect(() => {
    return () => {
      if(jwtToken){
        setJWTToken(jwtToken);
        const decoded_jwtToken:any=jwt_decode(jwtToken);
        //setUserData(decoded_jwtToken);
        const currentTime = Date.now()/1000;
        if(decoded_jwtToken.exp<currentTime){
            //handle the logout 
            window.location.href="/login";
        }
      }
    };
  })
  return (
    <div className="app">
      <Router>
        <Switch>
            <Route exact path="/" render={() => <React.Fragment></React.Fragment>}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/pokemons/:page"  component={ShowPokemons}/>
        </Switch>
      </Router>
    </div>
  );
}

export default  React.memo(App);
