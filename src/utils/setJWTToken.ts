import {api} from "../api/api";

export const setJWTToken = (token:string|boolean)=>{
    if(token){
        api.defaults.headers.common["Authorization"]=token;
    }
    else{
        delete api.defaults.headers.common["Authorization"];
    }
}
