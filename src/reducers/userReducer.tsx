import {LOGIN_BY_EMAIL, LOGIN_BY_USERNAME, LOGOUT, SET_CURRENT_USER} from "../constants/userTypes";
import {setJWTToken} from "../utils/setJWTToken";
const initialState={
    user:{},
    validToken:false,
    error:null
};

const booleanActionPayload=(payload:any)=>{
    if(payload){
        return true;
    }
    else{
        return false;
    }
}

export default function(state=initialState,action:any){
    switch (action.type) {
        case LOGIN_BY_USERNAME.SUCCESS:
            console.log('LOGIN_BY_USERNAME.SUCCESS action=');
            console.log(action);
            
            return { 
                ...state,  
                user:action.response,
                validToken:true
            };
        case LOGIN_BY_USERNAME.FAIL:
            console.log('LOGIN_BY_USERNAME.FAIL action=');
            console.log(action);
            return { 
                ...state, 
                validToken:false,
                error:action.error.message 
            };
        case LOGIN_BY_EMAIL.SUCCESS:
            console.log('LOGIN_BY_EMAIL.SUCCESS action=');
            console.log(action);
            return { 
                ...state,  
                user:action.response,
                validToken:true
            };
        case LOGIN_BY_EMAIL.FAIL: 
            console.log('LOGIN_BY_EMAIL.FAIL action=');
            console.log(action);
            return { 
                ...state, 
                validToken:false,
                error:action.error.message 
            };
        case SET_CURRENT_USER:
            return{
                ...state,
                user:action.payload,
                validToken:booleanActionPayload(action.payload)
            }
        case LOGOUT:
            localStorage.removeItem("jwtToken");
            setJWTToken(false);
            return{
                ...state,
                user:{},
                validToken:false
            }
        default:
            return {...state};
    }
}