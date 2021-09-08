import { TYPES } from "../../types/Types";

const initialState = {
    loading : false,
    msgError: null
}
export const uiReducer = (state = initialState, action) =>{
    switch (action.type) {
        case TYPES.UISETERROR:
            return {
                ...state,
                msgError: action.payload
            }
        case TYPES.UIREMOVEERROR:
            return {
                ...state,
                msgError: null
            }
        case TYPES.UISTARTLOADING:
            return {
                ...state,
                loading: true
            }
        case TYPES.UIFINISHLOADING:
            return {
                ...state,
                loading: false
            }        
        default:
            return state;
    }
}