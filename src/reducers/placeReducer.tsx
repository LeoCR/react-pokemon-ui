import {FETCH_PLACE,FETCH_PLACE_SUCCESS,FETCH_PLACE_FAILURE} from "../constants/placeTypes";

const initialState={
    isLoading:false,
    place:{}
};
export default function(state=initialState,action:any){
    switch (action.type) {
        case FETCH_PLACE:
            return{
                ...state,
                isLoading:true
            }
        case FETCH_PLACE_SUCCESS:
            return{
                ...state,
                isLoading:false,
                place:action.payload
            }
        case FETCH_PLACE_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        default:
            return{
                ...state
            }
    }
}