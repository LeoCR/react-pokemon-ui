import React, { useEffect} from 'react'; 
import './App.css'; 
import {BrowserRouter as Router,Route,Switch ,Redirect} from "react-router-dom";
import {setJWTToken} from "./utils/setJWTToken";
import jwt_decode from "jwt-decode";
import Login from './components/UserManagement/Login';
import Header from './components/Layout/Header';
import { logout, setUserData } from './actions/securityActions'; 
import { connect, useDispatch } from 'react-redux'; 
import { ShowPokemonsContainer } from './containers/ShowPokemonsContainer';

interface Props {   
  
}
const jwtToken=(localStorage.getItem('jwtToken')!==undefined)?localStorage.getItem('jwtToken'):null;


export const App: React.FC<Props> = (props:any) => {  
  const dispatch = useDispatch();
  useEffect(()=>{
     if(jwtToken!==null){
      setJWTToken(jwtToken); 
      const decoded_jwtToken:any=jwt_decode(jwtToken);
      dispatch(setUserData(decoded_jwtToken));
      const currentTime = Date.now()/1000;
      if(decoded_jwtToken.exp<currentTime){ 
          dispatch(
              logout()
          );
          window.location.href="/login";
      }
      setInterval(()=>{ 
        if(decoded_jwtToken.exp<currentTime){ 
            dispatch(
                logout()
            );
            window.location.href="/login";
        }
      },28800000)
    } 
  },[])
  return (
    <div className="app">
      <Router> 
        <Header/>
        <Switch>
            <Route exact path="/" render={() => <React.Fragment></React.Fragment>}/>
            <Route exact path="/login" component={Login}/>
            {
              (props.user.validToken===true)?
                  (<Route exact path="/dashboard"  render={(props)=><ShowPokemonsContainer {...props}/>}/>):
                  (<Redirect to="/login"/>)
            }
                        {
              (props.user.validToken===true)?
                  (<Route exact path="/pokemons/"  render={(props)=><ShowPokemonsContainer {...props}/>}/>) :
                  (<Redirect to="/login"/>)
            }
            {
              (props.user.validToken===true)?
                  (<Route exact path="/pokemons/:page" component={ShowPokemonsContainer}  render={(props)=><ShowPokemonsContainer {...props}/>}/>) :
                  (<Redirect to="/login"/>)
            }
            
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps=(state:any)=>({
  user:state.user,
  pokemons:state.pokemons.pokemons,
  pokemonsDetails:state.pokemonsDetails.pokemonsDetails,
})
export default connect(mapStateToProps,{logout})(App);