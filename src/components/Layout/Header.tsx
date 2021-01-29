import React from 'react';
import { connect,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/securityActions';
import { User } from '../../interfaces/Security.interface';
import { IStore } from '../../store/store';
import './Header.css';
interface HeaderProps{
    user?:User
}
const Header=(props:HeaderProps)=>{
    const {user} = props;
    const dispatch = useDispatch()
    const logOut=()=>{
        dispatch(logout());
        window.location.replace("/");
    }
    const userIsNotAuthenticated=(
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                    <Link className="nav-link " to="/register">
                        Sign Up 
                    </Link>
                </li> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    )
    const userIsAuthenticated =(
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link " to="/dashboard">
                        <i className="fas.fa-user-circle.mr-1"/>{user?.fullName}
                    </Link>
                </li>
                <li className="nav-item">
                    <span onClick={logOut} className="nav-link" style={{cursor:'pointer'}}>
                        Logout
                    </span>
                </li>
            </ul>
        </div>
    )
    let headerLinks;     
    if( user?.validToken){
        headerLinks=userIsAuthenticated
    }
    else{
        headerLinks=userIsNotAuthenticated
    } 
    
    return (
        <React.Fragment>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                                <span className="navbar-toggler-icon" />
                            </button>
                            {headerLinks}
                        </div>
                    </nav>
        </React.Fragment>
    )
}
const mapStateToProps=(state:IStore)=>({
    user:state.user
  })
  export default connect(mapStateToProps,null)(React.memo(Header))
