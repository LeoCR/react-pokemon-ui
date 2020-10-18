import {FETCH_ABILITY,FETCH_ABILITY_SUCCESS,FETCH_ABILITY_FAILURE} from "../constants/abilityTypes";
const initialState={
    isLoading:false,
    ability:[]
};
export default function(state=initialState,action:any){
    switch (action.type) {
        case FETCH_ABILITY:
            return{
                isLoading:true
            }
        case FETCH_ABILITY_SUCCESS:
            return{
                isLoading:false,
                ability:action.payload
            }
        case FETCH_ABILITY_FAILURE:
            return{
                isLoading:false
            }
        default:
            return{
                ...state
            }
    }
}