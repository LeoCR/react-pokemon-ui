export interface User{
    fullName?:string,
    validToken?:boolean,
    firstname?:string,
    lastname?:string,
    username?: string, 
    email?:string,
    password_encrypted?:string,
    password_iv?:string,
    status?:string,
    created_at?:Date, 
    updated_at?:Date
}
export interface LoginRequestByUsername{
    username:string,
    password:string
}
export interface LoginRequestByEmail{
    email:string,
    password:string
}