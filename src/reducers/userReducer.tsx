import {LOGIN_BY_EMAIL, LOGIN_BY_USERNAME, SET_CURRENT_USER} from "../constants/userTypes";

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
                user:action.response
            };
        case LOGIN_BY_USERNAME.FAIL:
            console.log('LOGIN_BY_USERNAME.FAIL action=');
            console.log(action);
            return { 
                ...state, 
                error:action.error.message 
            };
        case LOGIN_BY_EMAIL.SUCCESS:
            console.log('LOGIN_BY_EMAIL.SUCCESS action=');
            console.log(action);
            return { 
                ...state,  
                user:action.response
            };
        case LOGIN_BY_EMAIL.FAIL: 
            console.log('LOGIN_BY_EMAIL.FAIL action=');
            console.log(action);
            return { 
                ...state, 
                error:action.error.message 
            };
        case SET_CURRENT_USER:
            return{
                ...state,
                user:action.payload,
                validToken:booleanActionPayload(action.payload)
            }
        default:
            return state;
    }
}