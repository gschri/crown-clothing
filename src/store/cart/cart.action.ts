import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES,CartItem } from "./cart.types";
import { createAction,withMatcher,ActionWithPayload} from "../../utils/reducer/reducer.utils";

export let addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    var existingCartItem = cartItems.find(
        cartItem => cartItem.id === productToAdd.id
    )

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export let removeCartItem = (cartItems: CartItem[], cartItemToRemove: CategoryItem): CartItem[] => {
    var existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem =>
            cartItem.id !== cartItemToRemove.id
        )
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )

}

export let clearCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] =>
    cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export let setIsCartOpen = withMatcher((boolean: boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean)
)

export let setCartItems = withMatcher(
    (cartItems: CartItem[]) => 
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS,cartItems)
)

export let addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    var newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItems(newCartItems)
}

export let clearCart = () => {
    return setCartItems([] as CartItem[])
}

export let clearItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    var newCartItems = clearCartItem(cartItems, cartItemToRemove)
    return setCartItems(newCartItems)
}

export let removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
    var newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return setCartItems(newCartItems)
}
