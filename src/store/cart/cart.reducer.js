import { CART_ACTION_TYPES } from "./cart.types";

export let CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

export let cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    var { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        default:
            return state
    }
}