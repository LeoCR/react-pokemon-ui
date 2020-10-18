import React from 'react'; 
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loginByEmail,loginByUsername } from "../../actions/securityActions";
interface AppProps {
    user:any
 }
 
 interface AppState {
    loginInfo: any,
    errors:any
 }
 
  
class Login extends React.Component<AppProps, AppState>  {
    constructor(props:any) {
        super(props); 
        this.state = {
            loginInfo:{
                login: "",
                password: "",
            },
            errors: {}
        };
    } 
    static getDerivedStateFromProps(nextProps:any, prevState:any) {
        if (nextProps.errors) {
          return { errors: nextProps.errors }; // <- this is setState equivalent
        }
        return null;
    } /* 
    componentDidUpdate(prevProps:any) {
        if(this.props.user.validToken&& !prevProps.user.validToken){
            this.props.history.push("/dashboard");
        }
    } */
    onTexFieldChange=(field:any)=>{
        console.log(field);   
    }
    onLogin=()=>{

    }
    render() {
        const loginInfo=this.state.loginInfo;
        return (
            <div>
                <TextField
                    label="Name"
                    margin="normal"
                    value={loginInfo.login}
                    onChange={()=>this.onTexFieldChange("login")}
                />
                <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                    value={loginInfo.password}
                    onChange={()=>this.onTexFieldChange("password")}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.onLogin()}
                >
                    Login
                </Button>
            </div>
        );
    }
} 
const mapStateToProps=(state:any)=>({
    user:state.user
})
export default connect(mapStateToProps,{loginByEmail,loginByUsername})(Login);