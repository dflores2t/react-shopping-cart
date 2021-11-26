import { FETCH_PRODUCTS } from "../types"



export const productReducers = (states = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                items:action.payload,
            }
        default:
            return states;
    }
}