const ValidateEmail=(mail:string):boolean=>{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
    return true
  }
  else{
    return false;
  }
    
}
export default ValidateEmail;
