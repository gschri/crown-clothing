import {useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles'

let CartDropdown = () => {
    var cartItems = useSelector(selectCartItems)
    var navigate = useNavigate();

    var goToCheckoutHandler = useCallback(() => {
        navigate('/checkout')
    },[])

    return (
        <CartDropdownContainer>
            <CartItems>
            {cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))
            ): (
                <EmptyMessage>Your cart is empty</EmptyMessage>
            )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown