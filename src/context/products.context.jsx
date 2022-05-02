import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json'

export let ProductsContext = createContext({
    products: []
})

export let ProductsProvider = ({children}) => {
    var [products,setProducts] = useState(PRODUCTS)
    var value = {products}
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}