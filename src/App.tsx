import React from 'react'; 
import './App.css'; 
 import {BrowserRouter as Router,Route,Switch } from "react-router-dom";
 /*
import {setJWTToken} from "./utils/setJWTToken"
const jwtToken=localStorage.getItem('jwtToken');
 */
import ShowPokemons from "./containers/ShowPokemons";

 interface Props {
  
}
export const App: React.FC<Props> = (props) => {
  /* useEffect(() => {
    return () => {
      if(jwtToken){
        setJWTToken(jwtToken);
        const decoded_jwtToken=jwt_decode(jwtToken);
        store.dispatch({
          type:SET_CURRENT_USER,
          payload:decoded_jwtToken
        })
        const currentTime = Date.now()/1000;
        if(decoded_jwtToken.exp<currentTime){
            //handle the logout
            store.dispatch(
              logout()
            );
            window.location.href="/";
        }
      }
    };
  }) */
  return (
    <div className="app">
      <Router>
        <Switch>
            <Route exact path="/" render={() =>  <ShowPokemons/>}/>
            <Route path="/pokemons/:page"  component={ShowPokemons}/>
        </Switch>
      </Router>
    </div>
  );
}

export default  React.memo(App);;
