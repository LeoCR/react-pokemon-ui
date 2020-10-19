import axios from 'axios';  
import {setJWTToken} from "../utils/setJWTToken";
import jwt_decode from "jwt-decode";

export const api= axios.create({
    baseURL:'http://localhost:49840',
    responseType: 'json' 
}) 

export const loginByEmailRequest=(LoginRequest:any)=>async ()=>{
    let response;
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
        response= jwt_decode(token);
        //dispatch to our securityReducer
        return response;
    })
    .catch((err:any)=>{
        console.log('An error occurs loginByEmail await.post.catch');
        console.log(err);
        throw new Error(err);
    })
    return response;
}
export const loginByUsernameRequest=(LoginRequest:any)=>async()=>{
        let response;
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
            response=jwt_decode(token);
            return response;
        })
        .catch((err:any)=>{
            console.log('An error occurs loginByUsername api.post.catch');
            console.log(err);
            throw new Error(err);
        })
        return response;
}