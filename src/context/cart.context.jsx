import { createContext,useState } from "react";

export let CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}
})

export let CartProvider = ({children}) => {
    var [isCartOpen,setIsCartOpen] = useState(false)
    var value = {isCartOpen,setIsCartOpen}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
