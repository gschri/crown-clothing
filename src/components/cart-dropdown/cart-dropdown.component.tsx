import {useCallback,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import { selectCartItems} from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles'

let CartDropdown = () => {
    var cartItems = useSelector(selectCartItems)
    var dispatch = useDispatch();
    var navigate = useNavigate();
    var ref = useRef<HTMLDivElement>(null);
    var goToCheckoutHandler = useCallback(() => {
        navigate('/checkout')
    },[])

    useEffect(() => {
        var handleClickOutside = ({target}: MouseEvent): void => {
            if(ref.current && !ref.current.contains(target as Node)) { 
                    dispatch(setIsCartOpen(false))
            }
        }
        document.addEventListener('click',handleClickOutside,true)

        return () => {
            document.removeEventListener('click',handleClickOutside,true)
        }
    })

    return (
        <CartDropdownContainer ref={ref}>
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