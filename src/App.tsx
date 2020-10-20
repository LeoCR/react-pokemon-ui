import React, { useEffect} from 'react'; 
import './App.css'; 
import {BrowserRouter as Router,Route,Switch ,Redirect} from "react-router-dom";
import {setJWTToken} from "./utils/setJWTToken"
import ShowPokemons from "./containers/ShowPokemons";
import jwt_decode from "jwt-decode";
import Login from './components/UserManagement/Login';
import { logout, setUserData } from './actions/securityActions'; 
import { connect, useDispatch } from 'react-redux';
import { setInterval } from 'timers';

interface Props {   
  
}
const jwtToken=localStorage.getItem('jwtToken');


export const App: React.FC<Props> = (props:any) => {  
  const dispatch = useDispatch();
  useEffect(()=>{
    if(jwtToken){
      setJWTToken(jwtToken); 
      const decoded_jwtToken:any=jwt_decode(jwtToken);
      dispatch(setUserData(decoded_jwtToken));
      const currentTime = Date.now()/1000;
      setInterval(()=>{ 
        if(decoded_jwtToken.exp<currentTime){ 
            dispatch(
                logout()
            );
            window.location.href="/login";
        }
      },28800000)
    }
  })
  return (
    <div className="app">
      <Router>
        <Switch>
            <Route exact path="/" render={() => <React.Fragment></React.Fragment>}/>
            <Route exact path="/login" component={Login}/>
            {
              (props.user.validToken===true)?
                  (<Route path="/dashboard"  component={ShowPokemons}/>):
                  (<Redirect to="/login"/>)
            }
            {
              (props.user.validToken===true)?
                  (<Route path="/pokemons/:page"  component={ShowPokemons}/>) :
                  (<Redirect to="/login"/>)
            }
            
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps=(state:any)=>({
  user:state.user
})
export default connect(mapStateToProps,{logout})(React.memo(App));

