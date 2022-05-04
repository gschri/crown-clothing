import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export let setIsCartOpen = () =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN)

export let clearCart = () => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, [])
}

export let clearItemFromCart = (cartItems, cartItemToRemove) => {
    var newCartItems = clearCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export let removeItemFromCart = (cartItems, cartItemToRemove) => {
    var newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export let addItemToCart = (cartItems, productToAdd) => {
    var newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}


export let clearCartItem = (cartItems, cartItemToRemove) =>
    cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)

export let removeCartItem = (cartItems, cartItemToRemove) => {
    var existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if (existingCartItem.quantity === 1) {
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

export let addCartItem = (cartItems, productToAdd) => {
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


