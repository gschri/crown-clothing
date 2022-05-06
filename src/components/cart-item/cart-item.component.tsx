import {FC,memo} from 'react'
import { CartItem as CartItemType} from '../../store/cart/cart.types'
import {ItemDetails,CartItemContainer,Name,Price} from './cart-item.styles'

type CartItemProps = {
    cartItem: CartItemType
}

let CartItem: FC<CartItemProps> = memo(({cartItem}) => {
    var {imageUrl, price, name, quantity} = cartItem

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <Price>
                   {quantity} x ${price}
                </Price>
            </ItemDetails>
        </CartItemContainer>
    )
})

export default CartItem