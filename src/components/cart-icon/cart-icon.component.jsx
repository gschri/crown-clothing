import { useContext } from 'react'

import {CartContext} from '../../context/cart.context'

import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.styles'

let CartIcon = () => {
    var {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext)

    var toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;