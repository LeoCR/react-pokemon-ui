import {SET_CURRENT_USER} from "../constants/userTypes";

const initialState={
    user:{},
    validToken:false
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