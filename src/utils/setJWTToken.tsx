import api from "../api/api";

export const setJWTToken = (token:any)=>{
    if(token){
        api.defaults.headers.common["Authorization"]=token;
    }
    else{
        delete api.defaults.headers.common["Authorization"];
    }
}
