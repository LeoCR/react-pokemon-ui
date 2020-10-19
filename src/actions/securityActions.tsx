import {setJWTToken} from "../utils/setJWTToken";
import {SET_CURRENT_USER,CLEAR_USER_ERRORS,GET_USER_ERRORS,LOGIN_BY_EMAIL,LOGIN_BY_USERNAME} from "../constants/userTypes";
import { Dispatch } from "redux";
import {api} from "../api/api";

export const createNewUser=(newUser:any,history:any)=>async (dispatch:Dispatch)=>{
    try {
        await api.post('/api/create/user',newUser)
        .then((res:any)=>{
            if(res.data!==null){
                history.push("/login")
                dispatch({
                   type:CLEAR_USER_ERRORS
                })
            }
        })
        .catch((err:any)=>{
            console.log('An error occurs createNewUser await.post.catch');
            console.log(err);
            dispatch({
                type:GET_USER_ERRORS,
                payload:err.response.data
            })
        })
    } catch (error) {
        console.log('An error occurs createNewUser try.catch');
        console.log(error);
        dispatch({
            type:GET_USER_ERRORS,
            payload:error
        })
    }
}
export const loginByEmail=(LoginRequest:any)=>{
    return {
        type: LOGIN_BY_EMAIL.LOAD,
        user:LoginRequest
    }
}
export const loginByUsername = (LoginRequest:any) => {
    return {
      type: LOGIN_BY_USERNAME.LOAD,
      user:LoginRequest
    }
};
export const setUserData=(tokenDecoded:any)=>(dispatch:Dispatch)=>{
    dispatch({
        type:SET_CURRENT_USER,
        payload:tokenDecoded
    })
}
export const logout=()=>(dispatch:Dispatch)=>{
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}