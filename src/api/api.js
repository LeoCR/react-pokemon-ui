import axios from 'axios'; 
export default axios.create({
    baseURL:'http://localhost:49840/',
    responseType: 'json' 
}) 