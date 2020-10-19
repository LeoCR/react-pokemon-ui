import React from 'react';  
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Container from '@material-ui/core/Container';
import { loginByEmail,loginByUsername } from "../../actions/securityActions";  
import isEmail from "../../utils/isEmail"; 

interface LoginProps {
    user:any,
    classes:any,
    button:any,
    onLogin:()=>void,
    loginByEmail:(LoginRequest:any)=>void,
    loginByUsername:(LoginRequest:any)=>void
 }
 
 interface LoginState {
    usernameOrEmail: string,
    password:string,
    errorsUsernameOrEmail:string,
    errorsPassword:string,
    formSent:boolean
 }
 

 
class Login extends React.Component<LoginProps, LoginState>  {
    constructor(props:any) {
        super(props); 
        this.state = {
            usernameOrEmail: "",
            password: "",
            errorsUsernameOrEmail:"",
            errorsPassword:"",
            formSent:false
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
    onTexFieldChange=(e: any)=>{
        var inputName=e.target.name;
        if(inputName==='usernameOrEmail'){
            this.setState({
                    usernameOrEmail:e.target.value
            })
            if(e.target.value.length<5){
                this.setState({
                    errorsUsernameOrEmail:'The username should have more than 5 characters'
                    
                })
            }
        }
        else if(inputName==='password'){
            this.setState({
                password:e.target.value
            })
            if(e.target.value.length<5){
                this.setState({
                    errorsPassword:'The Password should have more than 5 characters'
                    
                })
            }
        }
    }
    onLogin=(e:any)=>{ 
        e.preventDefault();
        const LoginRequestByUsername={
            username:this.state.usernameOrEmail,
            password:this.state.password
        }  
        const LoginRequestByEmail={
            email:this.state.usernameOrEmail,
            password:this.state.password
        }  
        console.log('Submit Form');
        if(this.state.usernameOrEmail.length>5){
            this.setState({
                errorsUsernameOrEmail:"" 
            })
        }
        else if(this.state.usernameOrEmail.length<5){
            this.setState({
                errorsUsernameOrEmail:'The username should have more than 5 characters'
            })
        }
         if(this.state.password.length<5){
            this.setState({
                errorsPassword:'The Password should have more than 5 characters'
            })
        }
        else if(this.state.password.length>5){
            this.setState({
                errorsPassword:""
            })
        } 
        if(this.state.errorsPassword===""&& this.state.errorsUsernameOrEmail===""){
            if(isEmail(this.state.usernameOrEmail)){
                console.log('LoginByEmail');
                this.props.loginByEmail(LoginRequestByEmail);
            }
            else{
                console.log('loginByUsername');
               this.props.loginByUsername(LoginRequestByUsername);
            }
        }
    } 
    render() {   
        return ( 
                <Container maxWidth="sm" id="container_login">
                    <TextField 
                        label="Username or Email"
                        margin="normal"
                        name="usernameOrEmail"
                        onChange={this.onTexFieldChange}  
                    />
                    {
                        (this.state.errorsUsernameOrEmail!=="")?<span className="error_msg">{this.state.errorsUsernameOrEmail}</span>:''
                    }
                    <TextField
                        label="Password"
                        type="password"
                        margin="normal"
                        name="password"
                        onChange={this.onTexFieldChange}  
                    />
                    {
                        (this.state.errorsPassword!=="")?<span className="error_msg">{this.state.errorsPassword}</span>:''
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        className="login_button"  
                        onClick={this.onLogin}
                    >
                        Login
                    </Button>
                </Container> 
        );
    }
} 
const mapStateToProps=(state:any)=>({
    user:state.user.user
})
export default connect(mapStateToProps,{loginByEmail,loginByUsername})(Login);