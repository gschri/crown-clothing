import {useSelector,useDispatch} from 'react-redux'

import { selectIsCartOpen,selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.styles'

let CartIcon = () => {
    var dispatch = useDispatch();
    var isCartOpen = useSelector(selectIsCartOpen)
    var cartCount = useSelector(selectCartCount)

    var toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;