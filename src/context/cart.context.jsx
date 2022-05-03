import { createContext,useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export let clearCartItem = (cartItems,cartItemToRemove) => 
    cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)

export let removeCartItem = (cartItems,cartItemToRemove) => {
    var existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => 
            cartItem.id !== cartItemToRemove.id  
        )
    }

    return cartItems.map(cartItem => 
                cartItem.id === cartItemToRemove.id  
                ? {...cartItem,quantity: cartItem.quantity - 1}
                : cartItem 
            )

}

export let addCartItem = (cartItems,productToAdd) => {
    var existingCartItem = cartItems.find(
        cartItem => cartItem.id === productToAdd.id
    )

    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === productToAdd.id  
                ? {...cartItem,quantity: cartItem.quantity + 1}
                : cartItem 
        )
    }

    return [...cartItems, {...productToAdd,quantity: 1}]
}

export let CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export let CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

export let cartReducer = (state,action) => {
    var {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen 
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default: 
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

export let INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export let CartProvider = ({children}) => {
    var [{isCartOpen,cartItems,cartCount,cartTotal}, dispatch] = useReducer(cartReducer,INITIAL_STATE)

    var setIsCartOpen = () => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN))
    }

    var updateCartItemsReducer = (newCartItems) => {
        var newCartTotal = newCartItems.reduce((total,cartItem) => 
            total + cartItem.quantity * cartItem.price,
            0
        )

        var newCartCount = newCartItems.reduce((total,cartItem) => 
            total + cartItem.quantity,
            0
        )

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                    cartItems: newCartItems,
                    cartTotal: newCartTotal,
                    cartCount: newCartCount
            })
        )
    }

    var clearItemFromCart = (cartItemToRemove) => {
        var newCartItems = clearCartItem(cartItems,cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    var removeItemFromCart = (cartItemToRemove) => {
        var newCartItems = removeCartItem(cartItems,cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    var addItemToCart = (productToAdd) => {
        var newCartItems = addCartItem(cartItems,productToAdd)
        updateCartItemsReducer(newCartItems)
    }
    

    var value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
