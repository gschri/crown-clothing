import { createContext,useEffect,useState } from "react";

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

export let CartProvider = ({children}) => {
    var [isCartOpen,setIsCartOpen] = useState(false)
    var [cartItems,setCartItems] = useState([])
    var [cartCount,setCartCount] = useState(0)
    var [cartTotal,setCartTotal] = useState(0)

    useEffect(() => {
        var newCartTotal = cartItems.reduce((total,cartItem) => 
            total + cartItem.quantity * cartItem.price,
            0
        )
        setCartTotal(newCartTotal)
    },[cartItems])

    useEffect(() => {
        var newCartCount = cartItems.reduce((total,cartItem) => 
            total + cartItem.quantity,
            0
        )
        setCartCount(newCartCount)
    },[cartItems])

    var clearItemFromCart = (cartItemToRemove) => 
        setCartItems(clearCartItem(cartItems,cartItemToRemove))

    var removeItemFromCart = (cartItemToRemove) => 
        setCartItems(removeCartItem(cartItems,cartItemToRemove))

    var addItemToCart = (productToAdd) => 
        setCartItems(addCartItem(cartItems,productToAdd))
    

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
