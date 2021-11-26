import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types"



export const productReducers = (states = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                items: action.payload,
                filteredItems:action.payload
            }
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...states,
                size:action.payload.size,
                filteredItems:action.payload.items
            }

        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...states,
                sort: action.payload.sort,
                filteredItems:action.payload.items
            }
        default:
            return states;
    }
}