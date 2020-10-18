import {setJWTToken} from "../utils/setJWTToken";
import {SET_CURRENT_USER,CLEAR_USER_ERRORS,GET_USER_ERRORS} from "../constants/userTypes";
import jwt_decode from "jwt-decode";
import { Dispatch } from "redux";
import api from "../api/api";

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
export const loginByEmail=(LoginRequest:any)=>async (dispatch:Dispatch)=>{
    try {
        //post => Login Request
        await api.post("/api/login/byEmail",LoginRequest)
        .then((res:any)=>{
            //extract token from res.data
            const {token}=res.data;
             //store the token in the localStorage
            localStorage.setItem("jwtToken",token)
            //set our token in the header
            setJWTToken(token);
            //decode token on React
            const decoded= jwt_decode(token);
            //dispatch to our securityReducer
            dispatch({
                type:SET_CURRENT_USER,
                payload:decoded
            })
        })
        .catch((err:any)=>{
            console.log('An error occurs loginByEmail await.post.catch');
            console.log(err);
            dispatch({
                type:GET_USER_ERRORS,
                payload:err.response.data
            })
        })
    } catch (error) {
        console.log('An error occurs loginByEmail try.catch');
        console.log(error);
        dispatch({
            type:GET_USER_ERRORS,
            payload:error
        })
    }
}
export const loginByUsername=(LoginRequest:any)=>async (dispatch:Dispatch)=>{
    try {
        //post => Login Request
        await api.post("/api/login/byUsername",LoginRequest)
        .then((res:any)=>{
            //extract token from res.data
            const {token}=res.data;
             //store the token in the localStorage
            localStorage.setItem("jwtToken",token)
            //set our token in the header
            setJWTToken(token);
            //decode token on React
            const decoded= jwt_decode(token);
            //dispatch to our securityReducer
            dispatch({
                type:SET_CURRENT_USER,
                payload:decoded
            })
        })
        .catch((err:any)=>{
            console.log('An error occurs loginByUsername api.post.catch');
            console.log(err);
            dispatch({
                type:GET_USER_ERRORS,
                payload:err.response.data
            })
        })
    } catch (error) {
        console.log('An error occurs loginByUsername try.catch');
        console.log(error);
        dispatch({
            type:GET_USER_ERRORS,
            payload:error
        })
    }
}

export const logout=()=>(dispatch:Dispatch)=>{
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}