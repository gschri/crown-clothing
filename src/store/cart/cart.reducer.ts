import { AnyAction } from "redux";
import { setIsCartOpen,setCartItems } from "./cart.action";
import { CartItem} from "./cart.types";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[]
}

export let CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [] as CartItem[],
}

export let cartReducer = (
    state = CART_INITIAL_STATE, 
    action: AnyAction
): CartState => {
    if(setIsCartOpen.match(action)) {
        return { ...state, isCartOpen: action.payload }
    }

    if(setCartItems.match(action)) {
        return { ...state, cartItems: action.payload }
    }

    return state
}