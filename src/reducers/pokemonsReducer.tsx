import { POKEMONS} from "../constants/pokemonsTypes";
const initialState={
    isLoading:false,
    pokemons:[]
};
export default function(state=initialState,action:any){
    switch (action.type) {
        case POKEMONS.LOAD:
            return{
                ...state,
                isLoading:true
            }
        case POKEMONS.CLEAR_POKEMONS:
            return{
                ...state,
                isLoading:false,
                pokemons:[]
            }
        case POKEMONS.LOAD_SUCCESS:
            return{
                ...state,
                isLoading:false,
                pokemons:action.pokemons
            }
        case POKEMONS.LOAD_FAIL:
            return{
                ...state,
                isLoading:false,
                pokemons:[],
                error:action.error
            }
        default:
            return state;
    }
}