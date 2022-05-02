import { createContext,useEffect,useState } from "react";

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
    cartCount: 0
})

export let CartProvider = ({children}) => {
    var [isCartOpen,setIsCartOpen] = useState(false)
    var [cartItems,setCartItems] = useState([])
    var [cartCount,setCartCount] = useState(0)

    useEffect(() => {
        var newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity,0)
        setCartCount(newCartCount)
    },[cartItems])

    var addItemToCart = (product) => 
        setCartItems(addCartItem(cartItems,product))
    

    var value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
