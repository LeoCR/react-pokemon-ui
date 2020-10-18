import { POKEMONS} from "../constants/pokemonsTypes";
const initialState={
    isLoading:false,
    pokemons:[],
    page:0
};
export default function(state=initialState,action:any){
    switch (action.type) {
        case POKEMONS.LOAD:
            return{
                ...state,
                isLoading:true,
                page:action.page
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